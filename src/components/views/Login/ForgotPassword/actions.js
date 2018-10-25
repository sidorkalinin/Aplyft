import { Alert, Platform } from "react-native";
import { RESET_PASS } from "../../../../variables"; // constant variables across all the app
import axios from "axios"; // httpRequest library
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const changeEmail = payload => {
  return {
    type: "goto_registration",
    payload: payload
  };
};

export const goBack = () => {
  return {
    type: "go-back"
  };
};

export const resetSubmit = email => {
  if(Platform.OS != "android")
    firebase.analytics().logEvent("ForgotPasswordScreenResetBtnPressed");
  Mixpanel.track("ForgotPasswordScreen_Reset Btn Pressed");
  return dispatch => {
    if (email.trim() == "") {
      Alert.alert("", "Please fill the required info", [
        { text: "ok", onPress: () => console.log("ok") }
      ]);
    } else
      axios
        .get(RESET_PASS(email))
        .then(() => {
          Alert.alert(
            "",
            "If you already have registered, an email will be sent to reset your password",
            [{ text: "ok", onPress: () => dispatch({ type: "go-back" }) }]
          );
        })
        .catch(() => {
          console.log("hi");
        });
  };
};
