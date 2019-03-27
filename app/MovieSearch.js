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
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image,
  Button,
} from 'react-native';

import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';
import ParseUtil from './data/ParseUtil';
import Loader from './Loader';


const { width } = Dimensions.get('window');

export default class MovieSearch extends Component {
  static navigationOptions = {
    title : 'Movie Search',
    headerStyle: {
      backgroundColor: '#00a0fe',
    },
    headerTintColor: 'white',
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1,
      fontSize: 18,
      fontFamily:'verdana',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
  };

  componentDidMount() {
    const options = {
      sampleRate: 16000,  // default 44100
      channels: 1,        // 1 or 2, default 1
      bitsPerSample: 16,  // 8 or 16, default 16
      audioSource: 6, 
      wavFile: 'voicerecord.wav'
    };
    AudioRecord.init(options);
  }

  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
    audiodata:'',
    voiceResult:'',
    loading: false,
    speakNow:'Click To Speak',
    record:true
  }

  constructor(props) {
    super(props);
    state = {
      user   : '',
      password: ''
    }
    this.sentenceResult = this.sentenceResult.bind(this);
  }

  onClickListener = (viewId) => {
    if(viewId == true)
    {
      this.setState({ speakNow: 'speak Now', record: false, voiceResult:''})
      this.start();
    }
    else if(viewId == false)
    {
      this.setState({ speakNow: '', record: true})
      this.stop();
    }
    else
    {
    this.props.navigation.navigate('Mbaas');
    }
  }

  sentenceResult(result) {
    if(result == 'success')
    {
    this.setState({ loading: false, speakNow: 'Click To Speak'})
    this.props.navigation.navigate('MovieInfo');
    }
    else
    {
      this.setState({ voiceResult: result , loading: false, speakNow: 'Click To Speak'})
    }
  }

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    this.setState({ audioFile, recording: false, loading: true})
  
    // console.log('audioFile', audioFile);
    
    setTimeout(function () {
      RNFS.readFile(this.state.audioFile, 'base64')
      .then(res =>{
        // console.log('audioFile base64', res);
        ParseUtil.voiceRecog(res,this.sentenceResult);
      });
    }.bind(this), 1000);

   
  };


  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
      <Loader
          loading={this.state.loading} />
          <Text style={styles.speakText}>{this.state.speakNow}</Text>
          <TouchableHighlight onPress={() => this.onClickListener(this.state.record)}>
          <Image
          resizeMode='contain'
          style={styles.logo}
          source={require('./res/logo.png')}
        />
        </TouchableHighlight>
        {/* <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
        </View> */}
        <Text style={styles.resultText}>{this.state.voiceResult}</Text>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('mbaas')}>
          <Text style={styles.loginText}>Update MBaaS Info</Text>
        </TouchableHighlight>
        

        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width - 100,
    maxHeight: 100,
    marginBottom:20
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
  },
  searchButton: {
    backgroundColor: "#841584",
  },
  searchText: {
    color: 'white',
    fontSize: 17,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  },
  mbaasText: {
    fontSize: 15,
    fontFamily:'tahoma',
    fontWeight: 'bold',
    marginTop:250,
  },
  resultText: {
    color: 'black',
    fontSize: 18,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  },
  speakText: {
    fontSize: 35,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  loginButton: {
    marginTop:150,
    backgroundColor: "#841584",
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    fontFamily:'tahoma',
    fontWeight: 'bold'
  }
});