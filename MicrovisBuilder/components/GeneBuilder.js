import React, { Component } from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import MURV, { Gene } from 'murv-component';
import Config from '../data/config';
import GeneExample from '../data/gene';
import WebView from 'react-native-webview';
import { sendMessage } from 'react-native-watch-connectivity-hive';


class GeneBuilder extends Component {
    constructor(props) {
        super(props)
        this.sendMessage = props.sendMessage.bind(this);
        this.state = {
            properties: ["path_mode", "color", "shape", "object_rotation"]
        }
    }

    getURI(){
        // let uri = 'https://jamesjacko.github.io/murvRenderer/?';
        let uri = "http://localhost:3001/?"
        if(this.state.path_mode){
            uri += "path_mode=" + Object.keys(Gene.path_mode)[this.state.path_mode] + "&";
        }
        if(this.state.color){
            uri += "color=" + Object.keys(Gene.color)[this.state.color] + "&";
        }
        if(this.state.shape){
            uri += "shape=" + Object.keys(Gene.shape)[this.state.shape] + "&";
        }
        if(this.state.object_rotation){
            uri += "object_rotation=" + Object.keys(Gene.object_rotation)[this.state.object_rotation] + "&";
        }
        console.log(uri);
        return uri;
    }

    render() {
        return (

            <View>
                <View style={{height: 400}}>
                    <WebView source={{ uri: this.getURI() }} style={styles.webView}
                        useWebKit="true"
                        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                        onMessage={(event) => this.sendMessage(JSON.parse(event.nativeEvent.data).data)}
                    />
                </View>
                
                {
                    this.state.properties.map((key) => {
                        let property = Gene[key]
                        return (
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state[key] || 1}
                                key={ key }
                                onValueChange={(value) => { this.setState({ [key] : value }) }}>
                                {Object.values(property).map((key) => {
                                    return (<Picker.Item label={Object.keys(property)[key]} value={parseInt(key)} key={parseInt(key)} />) //if you have a bunch of keys value pair
                                })}
                            </Picker>
                        )
                    })
                }
            </View>
        )
    }
}

export default GeneBuilder

const styles = StyleSheet.create({
    webView: {
        marginTop: 20,
        height: 400,
        maxHeight: 400,
        width:400
      }
    });