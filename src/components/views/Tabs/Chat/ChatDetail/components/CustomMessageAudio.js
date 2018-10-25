import PropTypes from "prop-types";
import React from "react";
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewPropTypes,
  TouchableOpacity,
  Text
} from "react-native";
import Slider from "react-native-slider";
import Sound from "react-native-sound";
import moment from "moment";

const chat_player_icons = {
  pauseIcon: require("assets/images/chat/pause-btn.png"),
  playIcon: require("assets/images/chat/play-btn.png"),
  pauseIconBlue: require("assets/images/chat/pause-btn_blue.png"),
  playIconBlue: require("assets/images/chat/play-btn_blue.png")
};
export default class CustomMessageAudio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sound: null,
      isLoading: true,
      duration: 0,
      currentTime: 0,
      isPlaying: false
    };
  }

  componentWillMount() {
    if (this.props.currentMessage.audio) {
      var sound = new Sound(this.props.currentMessage.audio, null, error => {
        if (error) console.log("erorr loading sound", error);

        // Enable playback in silence mode
        sound.setCategory("Playback");
        sound.setVolume(1);
        console.log("the duration is: ", sound.getDuration());
        this.setState({
          sound: sound,
          isLoading: false,
          duration: Math.ceil(sound.getDuration())
        });
      });
    } else {
      console.log("error in audio format", this.props.currentMessage);
    }
  }

  _onTimeUpdate = (seconds, isPlaying) => {
    console.log("is playing: ", isPlaying, "seconds", seconds);
  };

  tick(soundObject) {
    console.log("calling timer");
    soundObject.getCurrentTime(seconds => {
      if (this.tickInterval) {
        this.setState({
          currentTime: seconds,
          isPlaying: true
        });
      }
    });
  }

  _onPlaySound(soundObject) {
    if (this.state.isPlaying) {
      if (this.tickInterval) {
        clearInterval(this.tickInterval);
        this.tickInterval = null;
      }
      soundObject.stop(() => {
        this.setState({
          isPlaying: false
        });
      });
    } else {
      this.tickInterval = setInterval(() => {
        this.tick(soundObject);
      }, 100);
      soundObject.play(success => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again

          soundObject.reset();
        }

        this.setState({
          currentTime: 0,
          isPlaying: false
        });

        if (this.tickInterval) {
          clearInterval(this.tickInterval);
          this.tickInterval = null;
        }
      });
    }
  }

  secondsToTime(secs) {
    var sec_num = parseInt(secs, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  sliderTintColor() {
    if (this.props.position == "right") {
      return {
        minimumTrackTintColor: "#d3d3d3",
        maximumTrackTintColor: "#ffffff",
        thumbTintColor: "#ffffff"
      };
    } else {
      return {
        minimumTrackTintColor: "#181f31",
        maximumTrackTintColor: "#ffffff",
        thumbTintColor: "yellow"
      };
    }
  }
  render() {
    if (this.state.isLoading)
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <ActivityIndicator
            color={this.props.position != "left" ? "white" : "#181f31"}
          />
        </View>
      );

    // else the audio is loaded and ready to be played
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity
          style={styles.playContainer}
          onPress={() => this._onPlaySound(this.state.sound)}
        >
          <Image
            resizeMode="contain"
            style={styles.playImage}
            source={
              this.state.isPlaying
                ? this.props.position != "left"
                  ? chat_player_icons.pauseIcon
                  : chat_player_icons.pauseIconBlue
                : this.props.position != "left"
                  ? chat_player_icons.playIcon
                  : chat_player_icons.playIconBlue
            }
          />
        </TouchableOpacity>
        <View>
          <Slider
            value={(this.state.currentTime * 100) / this.state.duration}
            style={{ width: 200, height: 15 }}
            minimumValue={0}
            maximumValue={100}
            {...this.sliderTintColor()}
            thumbStyle={styles[this.props.position].thumb}
            trackStyle={styles[this.props.position].track}
            thumbTouchSize={{ width: 50, height: 40 }}
          />
          <Text style={styles[this.props.position].durationTextStyle}>
            {this.secondsToTime(
              this.state.isPlaying
                ? this.state.currentTime
                : this.state.duration
            )}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 10,
    paddingRight: 25,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  playContainer: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  playImage: {
    width: 15,
    height: 15
  },
  right: StyleSheet.create({
    thumb: {
      width: 10,
      height: 10,
      backgroundColor: "white",
      borderRadius: 10 / 2
    },
    track: {
      height: 1,
      backgroundColor: "white"
    },
    durationTextStyle: {
      color: "white",
      fontSize: 12
    }
  }),
  left: StyleSheet.create({
    thumb: {
      width: 10,
      height: 10,
      backgroundColor: "#181f31",
      borderRadius: 10 / 2
    },
    track: {
      height: 1,
      backgroundColor: "#181f31"
    },
    durationTextStyle: {
      color: "#181f31",
      fontSize: 12
    }
  })
};

CustomMessageAudio.defaultProps = {
  containerStyle: {},
  imageStyle: {}
};

CustomMessageAudio.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object
};
