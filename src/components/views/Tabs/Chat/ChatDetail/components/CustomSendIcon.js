import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Color from './Color';

export default function CustomSendIcon() {
  return (
    <Image
      resizeMode="contain"
      style={styles.container}
      source={require('../../../../../../assets/images/chat/chat_send_icon.png')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // width: Color.defaultBlue,
    width: 40,
    height: '100%',
  },
});
