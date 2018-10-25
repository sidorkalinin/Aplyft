import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Linking,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";

import {
  loginUser,
  gotoRegisterUser,
  emailChange,
  passwordChange,
  onFacebookPress,
  gotoForgotPassword
} from "./actions";

//custom Components
import InputField from "../../InputField";
import SocialMediaButton from "../../SocialMediaButton";
// import FBLogin from "./components/FBLogin.js";

class loginScreen extends Component {
  constructor(props) {
    super(props);

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  tryToLogin() {
    this.props.loginUser(this.props.email, this.props.password);
  }

  _onFacebookPress = () => {
    this.props.onFacebookPress();
  };

  focusNextField(id) {
    this.inputs[id].focus();
  }
  render() {
    const {
      mainContainer,
      logoStyle,
      titleStyle,
      inputsContainer,
      iconStyle,
      inputOptionsStyles,
      keepMeLogTextStyles,
      forgotTextStyles,
      whiteText,
      loginButtonStyle,
      registerButtonStyle,
      bottomSectionStyle,
      socialMediaButtonContainer
    } = Styles;

    return (
      <ImageBackground
        resizeMode="cover"
        style={mainContainer}
        source={require("../../../assets/images/background.jpg")}
      >
        <StatusBar barStyle="light-content" />

        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center" }}>
              <Image
                style={logoStyle}
                source={require("../../../assets/images/logo-white.png")}
              />
              <Text style={titleStyle}>LOG IN</Text>
            </View>
            <View style={inputsContainer}>
              <View style={{ padding: 10 }}>
                <InputField
                  inputRef={ input => {
                    this.inputs['email'] = input;
                  }}
                  blurOnSubmit={ false }
                  onChangeText={this.props.emailChange.bind(this)}
                  onSubmitEditing={() => {
                    this.focusNextField('password');
                  }}
                  placeholder="E-mail"
                  underlineColorAndroid="transparent"
                  autoFocus={false}
                  autoCorrect={false}
                  returnKeyType={ "next" }
                  iconComponent={
                    <Image
                      style={iconStyle}
                      source={require("../../../assets/images/email-icon.png")}
                    />
                  }
                />
              </View>
              <View
                style={{
                  borderBottomColor: "#eeeeee",
                  borderBottomWidth: 1
                }}
              />

              <View style={{ padding: 10 }}>
                <InputField
                  inputRef={ input => {
                    this.inputs['password'] = input;
                  }}
                  returnKeyType={ "go" }
                  onChangeText={this.props.passwordChange.bind(this)}
                  secureTextEntry
                  blurOnSubmit={ true }
                  placeholder="Password"
                  underlineColorAndroid="transparent"
                  value={this.props.password}
                  iconComponent={
                    <Image
                      style={iconStyle}
                      source={require("../../../assets/images/lock-icon.png")}
                    />
                  }
                  onSubmitEditing={
                    this.tryToLogin.bind(this)
                  }
                />
              </View>
            </View>

            <View style={inputOptionsStyles}>
              <View style={keepMeLogTextStyles} />
              <TouchableOpacity
                style={forgotTextStyles}
                onPress={this.props.gotoForgotPassword.bind(this)}
              >
                <Text
                  style={{ color: "white", textDecorationLine: "underline" }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={loginButtonStyle}
              onPress={this.tryToLogin.bind(this)}
            >
              {
                this.props.loading ? 
                  <ActivityIndicator color={"#fff"} /> 
                : <Text style={whiteText}>LOGIN</Text>
              }
            </TouchableOpacity>

            <View style={socialMediaButtonContainer}>
              <TouchableOpacity
                style={{ flex: 1, paddingRight: 5 }}
                onPress={this._onFacebookPress.bind(this)}
              >
                <SocialMediaButton facebook />
              </TouchableOpacity>
            </View>

            <View style={inputOptionsStyles}>
              <View style={[keepMeLogTextStyles, { alignItems: "center" }]}>
                <Text style={whiteText}>
                  By Logging in, I agree to APLYFT's{" "}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://app.aplyft.com/terms")
                    }
                  >
                    <Text
                      style={[whiteText, { textDecorationLine: "underline" }]}
                    >
                      term of use
                    </Text>
                  </TouchableOpacity>
                  <Text style={whiteText}> and </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://app.aplyft.com/privacy")
                    }
                  >
                    <Text
                      style={[whiteText, { textDecorationLine: "underline" }]}
                    >
                      privacy policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={bottomSectionStyle}>
              <Text style={titleStyle}>NEW TO APLYFT</Text>

              <TouchableOpacity
                style={registerButtonStyle}
                onPress={() => this.props.gotoRegisterUser()}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  REGISTER NOW
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isLoggedIn: auth.isLoggedIn,
    email: auth.email,
    password: auth.password,
    loading: auth.loading,
    error: auth.error
  };
};

export default connect(mapStateToProps, {
  loginUser,
  gotoRegisterUser,
  emailChange,
  passwordChange,
  onFacebookPress,
  gotoForgotPassword
})(loginScreen);
