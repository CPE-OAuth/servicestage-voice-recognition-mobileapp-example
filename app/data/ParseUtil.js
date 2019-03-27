/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import 'react-native';
import { AsyncStorage, Alert } from 'react-native'; 
import { Parse } from 'parse/react-native';

export default class ParseUtil {

    //TODO update the below host details(hostIP,port) with valid values before running the app
    static hostIP = '';
    //Configure port only when required.If hostIP contains the complete mbaas instance details, no need to configure port
    static port =  '';
    static timerHandle=null;
    static movieDetails={};
   
   static voiceRecog(filebase64,callback) {
    init(); 
    const params =  { path: filebase64 };
    console.log("upload inside"+ParseUtil.timerHandle);
      ParseUtil.timerHandle = setTimeout(() => { 
        ParseUtil.timerHandle = null;
        callback("Request timed out.");
      }, 60000);  
      console.log("upload inside1 "+ParseUtil.timerHandle);

    Parse.Cloud.run("movieRecog", params)
    .then((data) => {
      console.log("upload Complete1 "+data);
        if(ParseUtil.timerHandle==null)
        {
          return;
        }
        clearTimeout(ParseUtil.timerHandle);
      if(data!= undefined && data.movieid != undefined)
      {
        ParseUtil.movieDetails=data;
        callback("success");
      } 
      else{
            callback(data);
      }
    });
 }

}

const init = () =>
{
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize("myAppId");
  
  if(ParseUtil.port == undefined || ParseUtil.port == "" )
  {
    console.log('http://'+ParseUtil.hostIP+'/mbaas');
    Parse.serverURL = 'http://'+ParseUtil.hostIP+'/mbaas';
  }
  else{
    console.log('http://'+ParseUtil.hostIP+':'+ParseUtil.port+'/mbaas');
    Parse.serverURL = 'http://'+ParseUtil.hostIP+':'+ParseUtil.port+'/mbaas';
  }
  
}