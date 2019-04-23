## Step 6: Enterprise  Integration: Cloud Code 

This demo uses cloud code function to invoke sentence recognition service as for complex apps sometimes you just need a bit of logic that isn’t running on a mobile device. 
Cloud Code makes this possible.
Cloud Code is easy to use because it’s built on the same Parse JavaScript SDK that powers thousands of apps.
The only difference is that this code runs in your Parse Server rather than running on the user’s mobile device.
When you update your Cloud Code, it becomes available to all mobile environments instantly.
You don’t have to wait for a new release of your application.This lets you change app behavior on the fly and add new features faster.

### Configuration:
To access the huawei cloud sentence recognition service, we need to get the valid authentication token from IAM service.
Here the link to get the valid authentication token from IAM service.
https://support.huaweicloud.com/en-us/api-face/face_02_0004.html

To get the authentication token we should provide valid **username**, **password** and **domain name**.    

1) Open the mbaas console(http://{mbaas-host}:{port}) and click the configuration tab.
 ![Alt text](./imgs/config1.png?raw=true "config")
2) Add the configuration parameters like **username**, **password**, **domain name** and **movie DB Api Key**.
    
   Note: Register at https://www.juhe.cn/ to get the movie db api key. This key is used to query the movies details.
   
 ![Alt text](./imgs/config2.png?raw=true "config")
 ![Alt text](./imgs/config3.png?raw=true "config")
 
3) To read the configuration parameters in the cloud code use the below code.
```
    //this code need to add in cloud code for geting the configuration.
    Parse.Config.get().then(function(config) {
        const username = config.get("userName");
        const password = config.get("password");
        const domainname = config.get("domainName");
        const movieDBAPIKey  = config.get("movieDBApiKey");
    }, function(error) {
        res.error(error);
    });

```
4) Add **Parse.serverURL** path to main.js
 ![Alt text](./imgs/main.png?raw=true "main")
 
Below is the cloud code function used in this demo.
 

### Automatic Voice Recognition:

1) Add function from MbaaS console Enterprise Integration -> Add Function.

![Alt text](./imgs/upload1.png?raw=true "upload")

2) Upload the cloud function code. Get code for Face library from http://rnd-gitlab-ca-g.huawei.com/PaaS/servicestage/services/voicereco/blob/master/cloud-code/movieRecog.js

![Alt text](./imgs/cloudCode1.png?raw=true "upload")

3) After the upload you can view and modify the cloud code in mbaas console.

![Alt text](./imgs/movierecog1.png?raw=true "upload")

4) Cloud function can be verified from postman. REST API: http://{mbaas-host-ip}:{mbaas-port}/mbaas/functions/movieRecog

![Alt text](./imgs/postmancall.png?raw=true "postmancall")


  
