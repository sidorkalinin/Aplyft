import React, { PureComponent } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { colors } from "../../../../../styles/theme";

class videoGlossaryListItem extends PureComponent {
  render_video_timer() {
    const {
      mainContainer,
      descriptionContainer,
      imageContainer,
      imageStyle,
      titleStyle,
      descriptionStyle,
      videoPlayIconStyle,
      overlay
    } = Styles;

    if (this.props.timer != "null") {
      return <Text style={descriptionStyle}>{this.props.timer}</Text>;
    } else {
      return <Text style={descriptionStyle} />;
    }
  }

  render() {
    const {
      mainContainer,
      descriptionContainer,
      imageContainer,
      imageStyle,
      titleStyle,
      descriptionStyle,
      videoPlayIconStyle,
      overlay
    } = Styles;

    return (
      <View style={mainContainer}>
        <View style={imageContainer}>
          <ImageBackground
            style={imageStyle}
            source={{ uri: this.props.videoPicture }}
          >
            <View style={overlay}>
              <Image
                style={videoPlayIconStyle}
                source={require("../../../../../../assets/images/video-play-icon.png")}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={descriptionContainer}>
          <Text style={titleStyle}>{this.props.title}</Text>
          {this.render_video_timer()}
        </View>
      </View>
    );
  }
}

const Styles = {
  mainContainer: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 10,
    borderTopWidth: 4,
    borderBottomWidth: 2,
    borderColor: "#eeeeee",
    backgroundColor: "white"
  },
  imageContainer: {
    padding: 5
  },
  imageStyle: {
    width: 135,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkBlueColor
  },
  descriptionContainer: {
    flexDirection: "column",
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: "flex-end"
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 31, 49, 0.4)"
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.darkBlueColor
  },
  descriptionStyle: {
    textAlign: "right",
    fontSize: 14,
    color: colors.darkBlueColor
  },
  videoPlayIconStyle: {
    width: 40,
    height: 40
  }
};

export default videoGlossaryListItem;
