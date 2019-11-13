/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import * as Watch from 'react-native-watch-connectivity-hive';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header'
import GeneProperty from './components/GeneProperty'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      text: "Hello"
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    const text = this.state.text

    if (text.trim().length) {
      console.log(Watch)
       Watch.sendMessage({text}, (err, resp) => {
          if (!err) {
             console.log('responce received', resp)
          } else {
             console.error('error sending message to watch', err)
          }
       })
    }
  }
  render(){
    return (
        <SafeAreaView>

        <Text style={ styles.sectionTitle }>Hello</Text>
        <View style={ styles.row }>
          
          <GeneProperty />
          <GeneProperty />
          <GeneProperty />
          <GeneProperty />
          <GeneProperty />
        </View>
            
        
      </ SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row'
  }
});

export default App;
