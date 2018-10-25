import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { colors } from "../../../../../../styles/theme";
import { connect } from "react-redux";
import { videoSelect } from "../actions";

class DailyTrainingListItem extends PureComponent {
  render() {
    const {
      mainContainer,
      descriptionContainer,
      imageContainer,
      imageStyle,
      titleStyle,
      descriptionStyle,
      videoPlayIconStyle,
      chevronStyle,
      chevronIconStyle,
      overlay
    } = Styles;
    if (this.props.set_length > 1) {
      var status = this.props.status + "s";
    } else {
      var status = this.props.status;
    }
    return (
      <TouchableOpacity onPress={this.props.onItemPress}>
        <View style={mainContainer}>
          <TouchableOpacity
            style={imageContainer}
            onPress={this.props.onVideoPress}
          >
            <ImageBackground
              style={imageStyle}
              source={{
                uri:
                  this.props.videoimage ||
                  "https://s3-eu-west-1.amazonaws.com/images-aplyft/aplyft/video-thumb-default.jpg"
              }}
            >
              <View style={overlay}>
                <Image
                  style={videoPlayIconStyle}
                  source={require("../../../../../../../assets/images/video-play-icon.png")}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={descriptionContainer}>
            <Text style={titleStyle}>{this.props.title}</Text>
            <Text style={descriptionStyle}>
              {this.props.set_length} {status}
            </Text>
          </View>
          <View style={chevronStyle}>
            <Image
              style={chevronIconStyle}
              source={require("../../../../../../../assets/images/chevron.jpg")}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const Styles = {
  mainContainer: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 10,
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
    justifyContent: "center"
  },
  descriptionContainer: {
    flexDirection: "column",
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent: "flex-start"
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.darkBlueColor
  },
  descriptionStyle: {
    fontSize: 14,
    paddingTop: 10,
    color: colors.darkBlueColor
  },
  videoPlayIconStyle: {
    width: 40,
    height: 40
  },
  chevronStyle: {
    justifyContent: "center",
    paddingRight: 5
  },
  chevronIconStyle: {
    width: 20,
    height: 20
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 31, 49, 0.4)"
  }
};

const mapStatetoProps = (state, ownProps) => {};

export default connect(null, {
  videoSelect
})(DailyTrainingListItem);
