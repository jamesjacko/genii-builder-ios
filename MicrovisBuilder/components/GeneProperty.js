import React from 'react';

import { View, PanResponder, Animated, StyleSheet } from 'react-native';

class GeneProperty extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pan: new Animated.ValueXY()
        }
        this._val = { x: 0, y: 0 };
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(this.state.pan, {
                  toValue: { x: 0, y: 0 },
                  friction: 5
                }).start();
              }
        });
    }

    render() {
        const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }
        return (
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[panStyle, styles.circle]}
              
            />
        );
    }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});

export default GeneProperty;