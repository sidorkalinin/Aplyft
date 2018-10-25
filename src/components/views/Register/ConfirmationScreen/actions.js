import { SIGNUP_URI } from "../../../../variables"; // constant variables across all the app
import axios from "axios"; // httpRequest library
import Mixpanel from "react-native-mixpanel";
export const resendEmail = email => {
  Mixpanel.track("RegisterScreen_Resend Email Btn Pressed");
  return {
    type: "register_confirmation_resend",
    payload: { email }
  };
};

export const gotoLogin = email => {
  return {
    type: "goto_loginview",
    payload: { email }
  };
};
