/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Color from './Color';

export default function CustomSend({ text, containerStyle, onSend, children, childrenMicro, childrenCamera, onCameraPress, onMicroPress, onMicroRelease, textStyle, label, alwaysShowSend }) {
  if (alwaysShowSend || text.trim().length > 0) {
    return (
      <TouchableOpacity
        testID="send"
        accessible
        accessibilityLabel="send"
        style={[styles.container, containerStyle]}
        onPress={() => {
          onSend({ text: text.trim() }, true);
        }}
        accessibilityTraits="button"
      >
        <View>{children || <Text style={[styles.text, textStyle]}>{label}</Text>}</View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{flexDirection:'row'}}>

    {childrenCamera ?
    <TouchableOpacity
      testID="send"
      accessible
      // accessibilityLabel="send"
      style={[styles.container, containerStyle, {paddingTop:6}]}
      onPress={() => {
        onCameraPress();
      }}
      accessibilityTraits="button"
    >
      <View>{childrenCamera}</View>
    </TouchableOpacity>
    : null }
    
    { childrenMicro ?
    <TouchableOpacity
      testID="send"
      accessible
      // accessibilityLabel="send"
      style={[styles.container, containerStyle, {paddingTop:6}]}
      
      onPress={() => {
        onMicroRelease();
      }}
      onPressIn={()=>{
        onMicroPress();
      }}
      onPressOut={()=>{
        onMicroRelease();
      }}
      accessibilityTraits="button"
    >
      <View>{childrenMicro}</View>
    </TouchableOpacity> : null }
    
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-start',
    padding: 7,

  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

CustomSenddefaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
  alwaysShowSend: false,
};

CustomSendpropTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
  alwaysShowSend: PropTypes.bool,
};
