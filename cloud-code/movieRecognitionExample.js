//cloud function implemention for voice recognition.
Parse.Cloud.define('movieRecog', function(req, res) {

//get config 
Parse.Config.get().then(function(config) {
    const username = config.get("iam_userName");
    const password = config.get("iam_password");
    const domainname = config.get("iam_domainName");
    const movieDBAPIKey  = config.get("movieDBApiKey");
    //Get the valid token from the huawei public cloud
    var reqToken = require('request');
    var token;
    var tokenBody = {
        "auth": {
            "identity": {
               
                "password": {
                    "user": {
                        "name": username, 
                        "password": password, 
                        "domain": {
                            "name": domainname
                        }
                    }
                },
                 "methods": [
                    "password"
                ]
            }, 
            "scope": {
                "project": {
                    "name": "cn-north-1"
                }
            }
        }
    };

    var reqASR = require('request');
    var bodyASR = {
         "data": req.params.path,
          "encode_type": "wav",
          "sample_rate": "8k"
        };

        reqToken({
            url: 'https://iam.cn-north-1.myhuaweicloud.com/v3/auth/tokens',
            method: "POST",
            "rejectUnauthorized": false,
            headers: {'Content-Type' : 'application/json'},
            json: true,
            body: tokenBody
        }, function (error, response, body){
            if (error) {
                res.error(error);
            }
            else {
                token =  response.headers['x-subject-token'];
                //call the ASR API
                reqASR({
                    url: 'https://sis.cn-north-1.myhuaweicloud.com/v1.0/voice/asr/sentence',
                    method: "POST",
                    "rejectUnauthorized": false,
                    headers: {'Content-Type' : 'application/json', 'X-Auth-Token': token },
                    json: true,
                    body: bodyASR
                }, function (error, response, body){
                    if(error) {
                        res.error(error);
                    }
                    else {
                        
                        if(body.result !== undefined && body.result.words !== undefined && body.result.words !== '') {
                           var resultData = body.result.words.replace('。','');
                            //Call the movie API
                            var reqMovie = require('request');
                            reqMovie({
                                url: 'http://v.juhe.cn/movie/index?key=' + movieDBAPIKey + '&title='+encodeURIComponent(resultData),
                                method: "GET",
                                "rejectUnauthorized": false,
                                json: true
                            }, function (error, response, body){
                                if (error) {
                                    res.error(error);
                                }
                                else {
                                     if(body !== undefined && body.resultcode === "200" )
                                    {
                                        if(body.result[0] !== undefined)
                                        {
                                        res.success(body.result[0]);
                                        }
                                        else 
                                        {
                                           res.success("No movie details found for "+resultData);
                                        }
                                    }
                                    else
                                    {
                                         res.success("No movie details found."+body.reason);
                                    }
                                }
                            });
                        } else {
                            res.success("Sorry,Try again !!");
                        }
                    }
                });
            }
        });
        
   }, function(error) {
        res.error(error);
   });

});