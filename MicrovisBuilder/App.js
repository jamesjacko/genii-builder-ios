/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import * as Watch from 'react-native-watch-connectivity-hive';
import data from './data.json';
import GeneBuilder from './components/GeneBuilder'
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

import Header from './components/Header';
import GeneProperty from './components/GeneProperty';
import { WebView } from 'react-native-webview';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Hello"
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {


    Watch.sendMessage({ text }, (err, resp) => {
      if (!err) {
        console.log('responce received', resp)
      } else {
        console.error('error sending message to watch', err)
      }
    })

  }
  render() {
    return (
      <SafeAreaView>
        <Button onPress={() => this.sendMessage(data.imageData)} title="Send Image Data"></Button>
        <Button onPress={() => this.sendMessage(data.imageData2)} title="Send Image Data2"></Button>
        
        <ScrollView>
          <GeneBuilder sendMessage={this.sendMessage} />
        </ScrollView>



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
  },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  webView: {
    marginTop: 20,
    height: 200,
    maxHeight: 200,
    flex: 1
  }
});

export default App;


/*

<View style={styles.dropZone}>
        </View>
        <View style={styles.row}>
          <GeneProperty />
          <GeneProperty />

        </View>
 */