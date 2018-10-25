import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import { colors } from "../../../../styles/theme";
import { viewportWidth } from "../../../../../variables";

class Header extends Component {
  renderRight() {
    if (this.props.LeftButtonComponent) {
      return (
        <TouchableOpacity
          style={styles.leftButtonContainer}
          onPress={this.props.LeftPress}
        >
          {this.props.LeftButtonComponent}
        </TouchableOpacity>
      );
    }
  }

  renderLeft() {
    if (this.props.RightButtonComponent) {
      return (
        <TouchableOpacity
          style={styles.rightButtonContainer}
          onPress={this.props.RightPress}
        >
          {this.props.RightButtonComponent}
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {
      mainContainer,
      titleStyle,
      headerStyle,
      profileImageContainer,
      profileImageStyle,
      plusIconStyle,
      plusTextStyle,
      rightButtonContainer,
      leftButtonContainer,
      descriptionContainer,
      boldTextStyle,
      infoTextStyle
    } = styles;

    return (
      <View style={mainContainer}>
        <ImageBackground
          resizeMode="cover"
          style={headerStyle}
          source={require("../../../../../assets/images/header-light-background.jpg")}
        >
          <View
            style={{ backgroundColor: "transparent", flexDirection: "row" }}
          >
            {this.renderRight()}
            {this.renderLeft()}
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={titleStyle}>WELCOME {this.props.FullName}</Text>
            <Text style={infoTextStyle}>Tell us more about you</Text>
          </View>
        </ImageBackground>
        <View style={profileImageContainer}>
          <Image
            style={profileImageStyle}
            source={{ uri: this.props.ImageURL }}
          />

          <View style={plusIconStyle}>
            <Text style={plusTextStyle}>+</Text>
          </View>
        </View>
        <View style={descriptionContainer}>
          <Text style={boldTextStyle}>YOUR APLYFT PROFILE IS</Text>
          <Text style={boldTextStyle}>ALMOST COMPLETE!</Text>
          <Text style={infoTextStyle}>Fill in your info to continue</Text>
          <Text style={infoTextStyle}>personalizing your account.</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    // height:300,
    // borderWidth:1,
    paddingBottom: 10
  },
  headerStyle: {
    height: 160,
    alignItems: "center",
    paddingTop: 25
  },
  titleStyle: {
    color: colors.redColor,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  rightButtonContainer: {
    flex: 1,
    padding: 10,
    alignItems: "flex-end"
  },
  leftButtonContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    alignItems: "flex-start"
  },
  profileImageContainer: {
    // borderWidth:1,
    position: "relative",
    height: 60
  },
  profileImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 3,
    position: "absolute",
    top: -70,
    left: viewportWidth / 2 - 65,
    backgroundColor: "white"
  },
  plusIconStyle: {
    position: "absolute",
    top: 15,
    left: viewportWidth / 2 + 15,
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "red"
  },
  plusTextStyle: {
    paddingLeft: 5,
    marginTop: -6,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  descriptionContainer: {
    alignItems: "center",
    textAlign: "center"
  },
  boldTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  infoTextStyle: {
    fontSize: 15,
    color: colors.lightGray,
    backgroundColor: "transparent"
  }
};

export default Header;
