import realm from "../../../models";
import { Alert } from "react-native";
import axios from "axios";
import { CHANGE_PASS_USER } from "../../../variables";

export const save = ({ old, pass, retype }) => {
  return (dispatch, getState) => {
    dispatch({
      type: "user_update_password_start"
    });

    if (old.trim() == "") {
      Alert.alert("", "Please enter your old password", [{text:'Ok'}], {
        cancelable: true
      });
    } else if (pass.trim() != retype.trim()) {
      Alert.alert("", "Passwords do not match", [{text:'Ok'}], { cancelable: true });

      return {
        type: "password_wrong"
      };
    } else {
      var success = false;
      var user_id = getState().user.user.id;
      var bodyFormData = new FormData();
      bodyFormData.append("old_password", old);
      bodyFormData.append("new_password", pass);
      axios
        .post(CHANGE_PASS_USER(user_id), bodyFormData)
        .then(function(response) {
          console.log("change password results", response);
          success = true;

          dispatch({
            type: "user_update_password_success"
          });

          setTimeout(() => {
            Alert.alert(
              "Success",
              "Password Changed Successfully, you can now use your new password for future login",
              [{ text: "ok", onPress: () => OKPress(dispatch) }],
              { cancelable: true }
            );
          }, 500);
        })
        .catch(error => {
          console.log("change password ERROR", error);
          Alert.alert("", "could not change password", [{text:'Ok'}], {
            cancelable: true
          });
        });
    }
  };
};

const OKPress = dispatch => {
  dispatch({
    type: "go-back"
  });
};
