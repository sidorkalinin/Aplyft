import PropTypes from "prop-types";
import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ViewPropTypes,
  ImageBackground,
  TouchableOpacity,
  Platform
} from "react-native";
import FastImage from "react-native-fast-image";
import Lightbox from "react-native-lightbox";
import Video from "react-native-video";
import VideoPlayer from "react-native-native-video-player";

export default class MessageVideo extends React.Component {
  _videoError = error => {
    console.log("error playing vide", error);
  };
  _onPressPlay = () => {
    if (this.player) this.player.presentFullscreenPlayer();
  };
  render() {
    if (Platform.OS == "android") {
      return (
        // <View style={[styles.container, this.props.containerStyle]}>
        //   <Lightbox
        //   >
        //     <View style={{height:100,width:100,}}>
        //       <Image
        //         style={styles.videoPlayIconStyle}
        //         source={require("assets/images/video-play-icon.png")}
        //         />
        //       <Video
        //         source={{ uri: this.props.currentMessage.video }} // Can be a URL or a local file.
        //         ref={ref => {
        //           this.player = ref;
        //         }} // Store reference
        //         rate={1.0} // 0 is paused, 1 is normal.
        //         volume={1.0} // 0 is muted, 1 is normal.
        //         muted={false} // Mutes the audio entirely.
        //         paused={true} // Pauses playback entirely.
        //         // resizeMode={"cover"} // Fill the whole screen at aspect ratio.*
        //         repeat={true} // Repeat forever.
        //         playInBackground={false} // Audio continues to play when app entering background.
        //         // playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
        //         // ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
        //         // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
        //         // onLoadStart={this.loadStart}            // Callback when video starts to load
        //         // onLoad={this.setDuration}               // Callback when video loads
        //         // onProgress={this.setTime}               // Callback every ~250ms with currentTime
        //         // onEnd={this.onEnd}                      // Callback when playback finishes
        //         onError={this._videoError} // Callback when video cannot be loaded
        //         // onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //         // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
        //         style={{width:200,height:200}}
        //       />
        //     </View>
        //   </Lightbox>
        // </View>

        <TouchableOpacity
          onPress={() => {
            VideoPlayer.showVideoPlayer(this.props.currentMessage.video);
          }}
        >
          <ImageBackground
            resizeMode="cover"
            style={styles.imageStyle}
            source={{
              uri:
                this.props.videoimage ||
                "https://s3-eu-west-1.amazonaws.com/images-aplyft/aplyft/video-thumb-default.jpg"
            }}
          >
            <View style={styles.overlay}>
              <Image
                style={styles.videoPlayIconStyle}
                source={require("assets/images/video-play-icon.png")}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Video
          source={{ uri: this.props.currentMessage.video }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          rate={1.0} // 0 is paused, 1 is normal.
          volume={1.0} // 0 is muted, 1 is normal.
          muted={false} // Mutes the audio entirely.
          paused={true} // Pauses playback entirely.
          // resizeMode={"cover"} // Fill the whole screen at aspect ratio.*
          repeat={true} // Repeat forever.
          playInBackground={false} // Audio continues to play when app entering background.
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
        />
        <TouchableOpacity onPress={this._onPressPlay}>
          <ImageBackground
            resizeMode="cover"
            style={styles.imageStyle}
            source={{
              uri:
                this.props.videoimage ||
                "https://s3-eu-west-1.amazonaws.com/images-aplyft/aplyft/video-thumb-default.jpg"
            }}
          >
            <View style={styles.overlay}>
              <Image
                style={styles.videoPlayIconStyle}
                source={require("assets/images/video-play-icon.png")}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  imageActive: {
    flex: 1,
    resizeMode: "contain"
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 31, 49, 0.4)"
  },
  videoPlayIconStyle: {
    width: 40,
    height: 40
  }
});

MessageVideo.defaultProps = {
  currentMessage: {
    video: null
  },
  containerStyle: {}
};

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  lightboxProps: PropTypes.object
};
