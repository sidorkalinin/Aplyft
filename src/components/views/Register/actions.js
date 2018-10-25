import { SIGNUP_URI } from "../../../variables"; // constant variables across all the app
import axios from "axios"; // httpRequest library
import { Alert } from "react-native";
import Mixpanel from "react-native-mixpanel";

export const changeGender = gender => {
  return {
    type: "register_gender_change",
    payload: gender
  };
};

export const FirstNameChange = text => {
  return {
    type: "register_first_change",
    payload: text
  };
};

export const LastNameChange = text => {
  return {
    type: "register_last_change",
    payload: text
  };
};

export const emailChange = text => {
  return {
    type: "register_email_change",
    payload: text
  };
};

export const passwordChange = text => {
  return {
    type: "register_password_change",
    payload: text
  };
};

export const retypePasswordChange = text => {
  return {
    type: "register_retype_password_change",
    payload: text
  };
};

export const registerUser = (fname, lname, pass, repass, email, gender) => {
  Mixpanel.track("RegisterScreen_Register Btn Pressed");
  return dispatch => {
    if (
      fname.trim() == "" ||
      lname.trim() == "" ||
      pass.trim() == "" ||
      email.trim() == ""
    ) {
      Alert.alert("", "Please fill your info",[{text:'Ok'}], { cancelable: true });
    } else if (pass != repass) {
      Alert.alert("", "Passwords do not match",[{text:'Ok'}], { cancelable: true });
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        Alert.alert(
          "The email entered is not a format of an email",
          null,
          [
            {
              text: "OK",
              onPress: () => {}
            }
          ],
          {
            cancelable: false
          }
        );
      } else {
        var bodyFormData = new FormData();
        bodyFormData.append("first_name", fname);
        bodyFormData.append("password", pass);
        bodyFormData.append("last_name", lname);
        bodyFormData.append("email", email);
        bodyFormData.append("gender", gender);

        axios
          .post(SIGNUP_URI, bodyFormData)
          .then(function(response) {
            Mixpanel.track("Successfully registered through APLYFT");
            dispatch({
              type: "user_register_success",
              payload: { email }
            });
          })
          .catch(function(error) {
            console.log("error user registration", error);
            console.log("error user registration", error.response);
            dispatch({ type: "user_register_fail" });
            const response = error.response;
            return Alert.alert(
              "Could not Register",
              response.data.detail,
              [{text:'Ok'}],
              {
                cancelable: true
              }
            );
          });
      }
    }

    //dispatch({type : 'user_register_success'});
  };
};
