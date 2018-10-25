import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Bubble } from "react-native-gifted-chat";
import CustomMessageImage from "./CustomMessageImage";
import CustomMessageAudio from "./CustomMessageAudio";
import CustomMessageVideo from "./CustomMessageVideo";

export default class AplyftBubble extends Bubble {
  // overriding
  renderMessageImage() {
    // if the msg object contains 'image' key than display this
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <CustomMessageImage {...messageImageProps} />;
    }
    return null;
  }

  // adding the audio display
  renderMessageAudio() {
    if (this.props.currentMessage.audio) {
      const { ...messageAudioProps } = this.props;
      console.log("msg audio props length", messageAudioProps);
      if (this.props.renderMessageAudio) {
        return this.props.renderMessageAudio(messageAudioProps);
      }
      return <CustomMessageAudio {...messageAudioProps} />;
    }
    return null;
  }

  // adding the video display
  renderMessageVideo() {
    if (this.props.currentMessage.video) {
      const { ...messageVideoProps } = this.props;
      console.log("msg video props length", messageVideoProps);
      if (this.props.renderMessageVideo) {
        return this.props.renderMessageVideo(messageVideoProps);
      }
      return <CustomMessageVideo {...messageVideoProps} />;
    }
    return null;
  }

  render() {
    this.props.currentMessage.sent = true;
    let status = (
      <View
        style={[
          styles.bottom,
          this.props.bottomContainerStyle[this.props.position]
        ]}
      >
        {this.renderTime()}
        {/*this.renderTicks()*/}
      </View>
    );

    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position]
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end"
          }}
        >
          {this.props.position == "left" ? null : status}
          <View
            style={[
              styles[this.props.position].wrapper,
              this.props.wrapperStyle[this.props.position],
              this.handleBubbleToNext(),
              this.handleBubbleToPrevious()
            ]}
          >
            <TouchableWithoutFeedback
              onLongPress={this.onLongPress}
              accessibilityTraits="text"
              {...this.props.touchableProps}
            >
              <View>
                {this.renderCustomView()}
                {this.renderMessageImage()}
                {this.renderMessageAudio()}
                {this.renderMessageVideo()}
                {this.renderMessageText()}
              </View>
            </TouchableWithoutFeedback>
          </View>
          {this.props.position == "right" ? null : status}
        </View>
      </View>
    );
  }
}

// styles from Bubble.js with some changes
const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      marginRight: 60, // move from wrapper
      alignItems: "flex-start"
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: "white",
      //marginRight: 60, remove
      minHeight: 20,
      justifyContent: "center"
    },
    containerToNext: {
      borderBottomLeftRadius: 3
    },
    containerToPrevious: {
      borderTopLeftRadius: 3
    }
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
      marginLeft: 60 // move from wrapper
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: "#171F30",
      // marginLeft: 60, remove
      minHeight: 20,
      justifyContent: "center"
    },
    containerToNext: {
      borderBottomRightRadius: 3
    },
    containerToPrevious: {
      borderTopRightRadius: 3
    }
  }),
  bottom: {
    // before:
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: "flex-end"
  },
  tick: {
    fontSize: 10,
    backgroundColor: "transparent",
    color: "white"
  },
  tickView: {
    flexDirection: "row",
    marginRight: 10
  }
};
