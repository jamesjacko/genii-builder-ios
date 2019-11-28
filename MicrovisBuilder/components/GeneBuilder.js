import React, { Component } from 'react';
import { Text, Switch, Button, View, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { Gene } from 'murv-component';
import TableView from 'react-native-tableview';
import WebView from 'react-native-webview';
import { thisExpression } from '@babel/types';

const { Section, Item } = TableView;

class GeneBuilder extends Component {
    constructor(props) {
        super(props)
        this.sendMessage = props.sendMessage.bind(this);
        this.state = {
            properties: ["path_mode", "color", "shape", "object_rotation"],
            path_mode: "5",
            color: "2",
            shape: "11",
            object_rotation: "0",
            modalVisible: false,
            selectedProperty: 0,
            imageData: "",
            autosend: 0
        }
        this.showModal = this.showModal.bind(this);
        this.setProperty = this.setProperty.bind(this);
    }

    getURI() {
        let uri = 'http://jamesjacko.github.io/murvRenderer/?';
        // let uri = "http://localhost:3001/?"
        if (typeof this.state.path_mode !== "undefined") {
            uri += "path_mode=" + Object.keys(Gene.path_mode)[this.state.path_mode] + "&";
        }
        if (typeof this.state.color !== "undefined") {
            uri += "color=" + Object.keys(Gene.color)[this.state.color] + "&";
        }
        if (typeof this.state.shape !== "undefined") {
            uri += "shape=" + Object.keys(Gene.shape)[this.state.shape] + "&";
        }
        if (typeof this.state.object_rotation !== "undefined") {
            uri += "object_rotation=" + Object.keys(Gene.object_rotation)[this.state.object_rotation] + "&";
        }
        return uri;
    }

    showModal(event) {
        this.setState({ modalVisible: true, selectedProperty: event.selectedIndex })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setProperty(event) {
        let prop = this.state.properties[this.state.selectedProperty]
        this.setState({
            [prop]: event.selectedIndex
        })
        this.setModalVisible(!this.state.modalVisible)
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.webViewContainer}>
                    <WebView source={{ uri: this.getURI() }} style={styles.webView}
                        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.6, maximum-scale=0.6, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); true`}
                        onMessage={
                            (event) => { 
                                if(this.state.autosend){
                                    this.setState({ imageData: JSON.parse(event.nativeEvent.data).data }, () => this.sendMessage(this.state.imageData))
                                    
                                } else {
                                    this.setState({ imageData: JSON.parse(event.nativeEvent.data).data })
                                }
                            }}
                    />
                </View>
                <TableView tableViewCellStyle={TableView.Consts.CellStyle.Subtitle} style={styles.tableView} onPress={this.showModal}>
                    <Section label="Properties" style={styles.cell} arrow>
                        {
                            this.state.properties.map((key) => {
                                let property = Gene[key]
                                return (
                                    <Item key={key} style={styles.cell}>{sanitize(key)}</Item>
                                )
                            })
                        }
                    </Section>
                </TableView>
                <View>
                    <Button title="Send to watch" onPress={(e) => this.sendMessage(this.state.imageData)} />
                    <View style={styles.switchContainer}>
                        <Text style={{width:300, fontSize:18}}>Send To Watch Automatically</Text>
                        <Switch onValueChange={(value) => this.setState({ autosend: value })} value={this.state.autosend} />
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    style={styles.modal}
                    presentationStyle="formSheet"
                >
                    <View style={{ marginTop: 22 }}>
                        <TableView tableViewCellStyle={TableView.Consts.CellStyle.Subtitle} style={styles.modalTableView} onPress={this.setProperty}>
                            <Section label={sanitize(this.state.properties[this.state.selectedProperty])} style={styles.cell}>
                                {

                                    Object.keys(Gene[this.state.properties[this.state.selectedProperty]]).map((key, index) => {
                                        let property = Gene[this.state.properties[this.state.selectedProperty]][key]
                                        return (
                                            <Item
                                                key={key}
                                                style={styles.cell}
                                                accessoryType={
                                                    this.state[this.state.properties[this.state.selectedProperty]] == index ?
                                                        TableView.Consts.AccessoryType.Checkmark :
                                                        TableView.Consts.AccessoryType.None
                                                }>{sanitize(key)}</Item>
                                        )
                                    })
                                }
                            </Section>
                        </TableView>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default GeneBuilder



const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    webView: {
        marginTop: 30,
        marginLeft: 20,
        height: 340,
        maxHeight: 350,
        width: 250,
        paddingTop: 20
    },
    webViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#272822'
    },
    tableView: {
        height: 200
    },
    cell: {
        flex: 1,
        backgroundColor: '#272822'
    },
    modal: {
        backgroundColor: '#FFF',
        marginTop: 20
    },
    modalClose: {
        fontSize: 20
    },
    modalTableView: {
        height: 600
    },
    switchContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
        marginTop: 10
    }
});


const sanitize = (str) => {
    return str.toLowerCase().split('_').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

/*
<Picker
                            mode="dropdown"
                            selectedValue={this.state[key] || 1}
                            key={ key }
                            onValueChange={(value) => { this.setState({ [key] : value }) }}>
                            {Object.values(property).map((key) => {
                                return (<Picker.Item label={Object.keys(property)[key]} value={parseInt(key)} key={parseInt(key)} />) //if you have a bunch of keys value pair
                            })}
                        </Picker>
*/