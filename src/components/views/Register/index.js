import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Linking
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import {
  registerUser,
  FirstNameChange,
  LastNameChange,
  emailChange,
  passwordChange,
  retypePasswordChange,
  changeGender
} from "./actions";

// facebook login button
import { onFacebookPress } from "../Login/actions";

//custom Components
import InputField from "../../InputField";
import SocialMediaButton from "../../SocialMediaButton";
import RadioButton from "../../radioButton";

class loginScreen extends Component {
  constructor(props) {
    super(props);

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }

  tryToRegister() {
    this.props.registerUser(
      this.props.first_name,
      this.props.last_name,
      this.props.password,
      this.props.retype_password,
      this.props.email,
      this.props.isMale ? "male" : "female"
    );
  }

  render() {
    const {
      mainContainer,
      logoStyle,
      scrollViewStyle,
      titleStyle,
      subtitleStyle,
      inputsContainer,
      iconStyle,
      radioButtonContainer,
      radioButtonRightContainer,
      radioButtonLeftContainer,
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

        <ScrollView
          contentContainerStyle={scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            style={{ flexGrow: 1, alignItems: "center" }}
            behavior="position"
          >
            <View style={{ alignItems: "center" }}>
              <Image
                style={logoStyle}
                source={require("../../../assets/images/logo-white.png")}
              />

              <Text style={titleStyle}>UNLEASH YOUR POTENTIAL</Text>
              <Text style={subtitleStyle}>Register with</Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <View style={socialMediaButtonContainer}>
                <TouchableOpacity
                  style={{ flex: 2, paddingRight: 5 }}
                  onPress={this.props.onFacebookPress.bind(this)}
                >
                  <SocialMediaButton facebook />
                </TouchableOpacity>
              </View>
            </View>

            <View style={radioButtonContainer}>
              <TouchableOpacity
                onPress={this.props.changeGender.bind(this, "male")}
                style={radioButtonLeftContainer}
              >
                <RadioButton
                  isSelected={this.props.isMale}
                  label="Male"
                  index={0}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.props.changeGender.bind(this, "female")}
                style={radioButtonRightContainer}
              >
                <RadioButton
                  isSelected={this.props.isFemale}
                  label="Female"
                  index={1}
                />
              </TouchableOpacity>
            </View>

            <View style={inputsContainer} behavior="padding">
              <View style={{ padding: 10 }}>
                <InputField
                  inputRef={input => {
                    this.inputs["fname"] = input;
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.focusNextField("lname");
                  }}
                  returnKeyType={"next"}
                  onChangeText={this.props.FirstNameChange.bind(this)}
                  placeholder="First Name"
                  autoCorrect={false}
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
                  inputRef={input => {
                    this.inputs["lname"] = input;
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.focusNextField("email");
                  }}
                  returnKeyType={"next"}
                  onChangeText={this.props.LastNameChange.bind(this)}
                  placeholder="Last Name"
                  autoCorrect={false}
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
                  inputRef={input => {
                    this.inputs["email"] = input;
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.focusNextField("pass");
                  }}
                  returnKeyType={"next"}
                  onChangeText={this.props.emailChange.bind(this)}
                  placeholder="E-mail"
                  autoCorrect={false}
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
                  inputRef={input => {
                    this.inputs["pass"] = input;
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.focusNextField("repass");
                  }}
                  returnKeyType={"next"}
                  onChangeText={this.props.passwordChange.bind(this)}
                  secureTextEntry
                  placeholder="Password"
                  autoCorrect={false}
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
                  inputRef={input => {
                    this.inputs["repass"] = input;
                  }}
                  blurOnSubmit={true}
                  onSubmitEditing={this.tryToRegister.bind(this)}
                  returnKeyType={"go"}
                  onChangeText={this.props.retypePasswordChange.bind(this)}
                  secureTextEntry
                  placeholder="Re-enter Password"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={inputOptionsStyles}>
              <View style={keepMeLogTextStyles}>
                <Text style={whiteText}>
                  By creating an account, I agree to APLYFT's{" "}
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

            <TouchableOpacity
              style={loginButtonStyle}
              onPress={this.tryToRegister.bind(this)}
            >
              <Text style={whiteText}>REGISTER NOW!</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapToProps = ({ register }) => {
  return {
    first_name: register.first_name,
    last_name: register.last_name,
    email: register.email,
    password: register.password,
    retype_password: register.retype_password,
    error: register.error,
    loading: register.loading,
    isMale: register.male,
    isFemale: !register.male
  };
};

export default connect(
  mapToProps,
  {
    registerUser,
    FirstNameChange,
    LastNameChange,
    emailChange,
    passwordChange,
    retypePasswordChange,
    changeGender,
    onFacebookPress
  }
)(loginScreen);
