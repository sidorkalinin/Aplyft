import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Video from "react-native-video";
import styles from "./styles";
// custom components
import { Card, CardSection } from "../../../common";
import { colors } from "../../../styles/theme";

class AboutTrainerScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderVideo = () => {
    if (!this.props.aboutVideoURL) {
      console.log("no video");
      return null;
    }
    if (this.props.aboutVideoURL == "") return null;

    return (
      <View>
        <Video
          source={{
            uri: this.props.aboutVideoURL
          }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          rate={1.0} // 0 is paused, 1 is normal.
          volume={1.0} // 0 is muted, 1 is normal.
          muted={false} // Mutes the audio entirely.
          paused={true} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.*
          // repeat={true}                           // Repeat forever.
          // playInBackground={false}                // Audio continues to play when app entering background.
          // playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          // ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          // onLoadStart={this.loadStart}            // Callback when video starts to load
          // onLoad={this.setDuration}               // Callback when video loads
          // onProgress={this.setTime}               // Callback every ~250ms with currentTime
          // onEnd={this.onEnd}                      // Callback when playback finishes
          // onError={this.videoError}               // Callback when video cannot be loaded
          // onBuffer={this.onBuffer}                // Callback when remote video is buffering
          // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
          // style={styles.backgroundVideo}
        />

        <TouchableOpacity
          onPress={() => {
           
            this.player.presentFullscreenPlayer()
          }
          }
        >
          <View style={styles.HeaderStyle}>
            <ImageBackground
              style={styles.HeaderpicStyle}
              source={{ uri: "https://s3-eu-west-1.amazonaws.com/images-aplyft/aplyft/video-thumb-default.jpg" }}
            >
              <View style={{ flex: 1, width: "100%" }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    style={styles.videoPlayIconStyle}
                    source={require("./../../../../assets/images/video-play-icon.png")}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    var languages = this.props.aboutlang.split(",");
    var languages_length = languages.length;
    return (
      <ScrollView style={{ backgroundColor: "#e2e2e2" }}>
        <View style={styles.profileBodySection}>
          
          {this._renderVideo()}

          <CardSection>
            <View style={styles.sectionBodyTextStructure}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.sectionBodyTextStructure}>
                  <Text style={styles.sectionHeaderText}>Bio & Speciality</Text>
                </View>
              </View>

              <Text style={styles.sectionBodyText}>{this.props.aboutbio}</Text>
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.sectionBodyTextStructure}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.sectionBodyText}>
                  <Text style={styles.sectionHeaderText}>
                    Certification & Achievements
                  </Text>
                </View>

                <View>
                  <Text style={styles.verificationText}>
                    Verified By Aplyft
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.sectionBodyText}>
                  {this.props.aboutcert}
                </Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.sectionBodyTextStructure}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.sectionBodyText}>
                  <Text style={styles.sectionHeaderText}>
                    {this.props.aboutinfo.activeUsers} Active Users
                  </Text>
                </View>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <View>
                  <Text style={styles.sectionHeaderText}>
                    {languages_length} Language{languages_length>1?"s":""}
                  </Text>
                </View>

                <Text style={styles.LangText}>{this.props.aboutlang}</Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.sectionBodyTextStructure}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.sectionBodyText}>
                  <Text style={styles.sectionHeaderText}>
                    Area of Expertise{" "}
                  </Text>
                </View>
              </View>

              <View>
                {
                  this.props.aboutareaofexp ?
                  this.props.aboutareaofexp.map((txt)=>{
                    return (<Text style={styles.sectionBodyText}>- {txt}</Text>)
                  }) :  null
                }
              </View>
            </View>
          </CardSection>
        </View>
      </ScrollView>
    );
  }
}

export default connect(null, {})(AboutTrainerScreen);
