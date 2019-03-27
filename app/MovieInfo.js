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
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking
} from 'react-native';

import ParseUtil from './data/ParseUtil'

class MovieInfo extends Component {
  static navigationOptions = {
    title : 'Movie Details',
    headerStyle: {
      backgroundColor: '#00a0fe',
    },
    headerTintColor: 'white',
    headerTitleStyle: { 
      flex:1,
      fontSize: 18,
      fontFamily:'verdana',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
  };
  

  state = {
    movieDetails: ParseUtil.movieDetails
  }

  render() {

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: 'blue', fontSize: 30, fontWeight: 'bold' }}>{this.state.movieDetails.title}</Text>
        </View>
        <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
        <Image
          source={{ uri: this.state.movieDetails.poster }}
          style={styles.image}
           />
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Genres:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.genres}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Year:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.year}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Country:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.country}
          </Text>
        </Text>         
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Release Date:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.release_date}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Runtime:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.runtime}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Language:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.language}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Writers:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.writers}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Directors:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.directors}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Rating:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.rating}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>
          Rating Count:
          </Text>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5}}>
          {this.state.movieDetails.rating_count}
          </Text>
        </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Text style={{ color: 'black', marginLeft: 5, marginRight: 5,fontWeight: 'bold' }}>Actors: </Text>
          <Text style={{ color: 'black', marginLeft: 10, marginRight: 10}}>{this.state.movieDetails.actors}</Text>
        </View>
      </ScrollView>
    );
  
  }
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 120,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#979797',
  },
  textStyle:{
    color: 'black',
    fontWeight: 'normal'
  }
})

export default MovieInfo;