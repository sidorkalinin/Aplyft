import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  Vibration
} from 'react-native';
import moment from 'moment';


export default class CustomMicroAnimation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      top: new Animated.Value(25),
      right: new Animated.Value(-125),
      sRecording : false,
      startDate : moment(),
      timer: "00:00",
      opacity: new Animated.Value(0),
      border : new Animated.Value(2),
    };

    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: -75,
        duration: 300,
        easing: Easing.elastic(1)
      }),
      Animated.timing(this.state.right, {
        toValue: -25,
        duration: 300,
        easing: Easing.elastic(1)
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1),
        delay: 500,
      })
    ]).start(() => {
        // callback
    });

    Vibration.vibrate();

    setInterval(()=>{
      this.setState({timer: moment(moment().diff(this.state.startDate)).format('mm:ss')})
    }, 1000);
    
  }

  render() {
    
    return (
        <Animated.View style={[this.props.styleContainer, {
          top: this.state.top,
          right: this.state.right
        }]}>
        <Animated.View style={[styles.counterContainer, {opacity : this.state.opacity}]}>
          <Text style={{color: '#171e4e'}}>{this.state.timer}</Text>
        </Animated.View>
        </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  counterContainer : {
    height: 20,
    width: 200,
    backgroundColor: 'white',
    right: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});