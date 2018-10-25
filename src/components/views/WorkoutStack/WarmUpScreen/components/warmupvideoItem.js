import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { colors } from "../../../../styles/theme";

class WarmupvideoItem extends Component {
  render() {
    const {
      mainContainer,
      descriptionContainer,
      imageContainer,
      imageStyle,
      titleStyle,
      descriptionStyle,
      videoPlayIconStyle
    } = Styles;

    return (
      <TouchableOpacity {...this.props} style={mainContainer}>
        <TouchableOpacity
          onPress={this.props.onThumbnailPress}
          style={imageContainer}
        >
          <ImageBackground
            style={imageStyle}
            source={{ uri: this.props.videoPicture }}
          >
            <Image
              style={videoPlayIconStyle}
              source={require("../../../../../assets/images/video-play-icon.png")}
            />
          </ImageBackground>
        </TouchableOpacity>
        <View style={descriptionContainer}>
          <Text style={titleStyle}>{this.props.title}</Text>
          <View style={descriptionStyle}>
            <Text>{this.props.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const Styles = {
  mainContainer: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 10,
    borderTopWidth: 4,
    borderBottomWidth: 4,
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
    paddingTop: 10,
    justifyContent: "flex-start"
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.darkBlueColor
  },
  descriptionStyle: {
    fontSize: 14,
    color: colors.darkBlueColor,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  videoPlayIconStyle: {
    width: 40,
    height: 40
  }
};

export default WarmupvideoItem;
