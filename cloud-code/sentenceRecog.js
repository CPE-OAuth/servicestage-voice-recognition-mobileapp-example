//cloud function implemention for voice recognition.
Parse.Cloud.define('voiceRecog', function(req, res) {


//get config 
Parse.Config.get().then(function(config) {
    const username = config.get("iam_userName");
    const password = config.get("iam_password");
    const domainname = config.get("iam_domainName");

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
        }

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
                            res.success(body.result.words);
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
