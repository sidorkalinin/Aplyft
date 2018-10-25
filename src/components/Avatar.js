import React, { Component } from "react";
import { View, Image } from "react-native";
import FastImage from "react-native-fast-image";

class Avatar extends Component {

  _renderImage = () => {
    var uri = require("assets/images/logo-gray-bg.png");
    switch (this.props.source) {
      case "":
      case null:
      case "null":
        break;

      default:
        uri = {
          uri: this.props.source,
          priority: FastImage.priority.normal
        };
        break;
    }

    return (
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={styles.img}
        source={uri}
      />
    );
  };

  render() {
    const { mainContainer } = styles;

    return (
      <View style={mainContainer}>
        {this._renderImage()}
      </View>
    );
  }
}

const styles = {
  img: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#eeeeee",
  },
  mainContainer: {
    borderRadius: 42,
    overflow: "hidden",
    // backgroundColor: "red",
    justifyContent:'center',
    alignItems: 'center',
    // borderWidth: 1,
  }
};

export default Avatar;