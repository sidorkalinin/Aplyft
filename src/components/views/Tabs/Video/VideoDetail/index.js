import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import styles from "./styles";
import Video from "react-native-video";

class VideoInfo extends Component {
  static navigationOptions = {
    headerTintColor: "white"
  };

  state = {
    paused: false
  };

  _videoError = event => {
    console.log("erorr on video", event);
  };

  _onPressVideoIcon = () => {
    this.player.presentFullscreenPlayer();
    this.setState({
      paused: !this.state.paused
    });
  };

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerdescStyle}>
          <View style={{ flex: 1, justfiyContent: "center" }}>
            <Text style={styles.HeaderText}>{this.props.data.title}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={this._onPressVideoIcon.bind(this)}>
          <Video
            source={{ uri: this.props.data.video_url }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            rate={1.0} // 0 is paused, 1 is normal.
            volume={1.0} // 0 is muted, 1 is normal.
            muted={true} // Mutes the audio entirely.
            paused={this.state.paused} // Pauses playback entirely.
            resizeMode={"cover"} // Fill the whole screen at aspect ratio.*
            repeat={true} // Repeat forever.
            playInBackground={false} // Audio continues to play when app entering background.
            disableFocus={true}
            // playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
            // ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
            // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
            // onLoadStart={this.loadStart}            // Callback when video starts to load
            // onLoad={this.setDuration}               // Callback when video loads
            // onProgress={this.setTime}               // Callback every ~250ms with currentTime
            // onEnd={this.onEnd}                      // Callback when playback finishes
            onError={this._videoError} // Callback when video cannot be loaded
            // onBuffer={this.onBuffer}                // Callback when remote video is buffering
            // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
            style={styles.HeaderStyle}
          />
          {this.setState.paused ? (
            <Image
              style={styles.videoPlayIconStyle}
              source={require("../../../../../assets/images/video-play-icon.png")}
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>

        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.bodydescStyle}>
            <Text style={styles.BodyText}>
              {" "}
              {this.props.data.description == "null"
                ? "Instructions Coming Soon"
                : this.props.data.description}{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ VideoList }) => {
  // this is were u get the video detial from the action
  return {
    data: VideoList.currentVideo
  };
};

export default connect(mapStateToProps, {})(VideoInfo);
