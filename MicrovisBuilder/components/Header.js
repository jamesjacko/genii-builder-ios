import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';

class Header extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <View>
                <Text style={styles.headerTitle}>Microvis Builder</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        backgroundColor: '#000000'
      }
})

export default Header