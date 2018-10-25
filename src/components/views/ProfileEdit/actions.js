import realm from "../../../models";
import { UPDATE_USER } from "../../../variables";
import { Alert, Platform } from "react-native";
import axios from "axios";
import moment from "moment";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const save = payload => {
  return (dispatch, getState) => {
    // console.log("payload", payload);
    if(Platform.OS != "android")
        firebase.analytics().logEvent("ProfileEditScreenProfileEditInit");
      Mixpanel.track("ProfileEditScreen_Profile Edit Init");

    dispatch({
      type: "change_profile_edit_request_start"
      // payload: payload
    });

    var injury_svg_string = payload.dataArray.toString();
    var bodyFormData = new FormData();
    //bodyFormData.append("id", getState().user.user.id);
    bodyFormData.append("first_name", payload.first_name);
    bodyFormData.append("last_name", payload.last_name);
    bodyFormData.append("gender", payload.gender);
    bodyFormData.append("height", payload.height);
    bodyFormData.append("height_unit", "cm");
    bodyFormData.append("weight", payload.weight);
    bodyFormData.append("weight_unit", "kg");
    bodyFormData.append("injury", payload.injury ? payload.injuryText : "");

    bodyFormData.append(
      "injury_svg_code",
      payload.injury ? injury_svg_string : ""
    );
    // adding the extra vaues
    if (payload.activityLevel != "null") {
      bodyFormData.append("activity_level", payload.activityLevel);
    }

    if (payload.preferedWorkoutDaysBitwise != null) {
      bodyFormData.append("day_of_workout", payload.preferedWorkoutDaysBitwise);
    }
    if (payload.bodyfat != null) {
      bodyFormData.append("body_fat", payload.bodyfat);
    }
    if (payload.country != "null") {
      bodyFormData.append("country_of_residence", payload.country);
    }
    if (payload.dob != null) {
      bodyFormData.append(
        "date_of_birth",
        moment(payload.dob).format("YYYY-MM-DD")
      );
    }

    var success = false;
    // will update the info on the server and then process the request
    axios
      .put(UPDATE_USER(getState().user.user.id), bodyFormData)
      .then(function(respone) {
        if(Platform.OS != "android")
          firebase.analytics().logEvent("ProfileEditScreenSuccessfullProfileEdit");
        Mixpanel.track("ProfileEditScreen_Successfull Profile Edit");
        // if everything is ok and saved on the server then save it in realm
        // save in realm
        realm.write(() => {
          var user = getState().user.user;
          user.injury = payload.injury;
          user.injuryText = payload.injuryText || null;
          user.dateOfBirth = payload.dob || null;
          // user.phone = payload.phone || null;
          user.activityLevel = String(payload.activityLevel) || null;
          user.preferedWorkoutDays =
            String(payload.preferedWorkoutDaysBitwise) || 0;
          user.height = String(payload.height) || "";
          user.weight = String(payload.weight) || "";
          user.bodyfat = String(payload.bodyfat) || "";
          user.fullname = payload.first_name + " " + payload.last_name;
          user.firstName = payload.first_name;
          user.lastName = payload.last_name;
          user.gender = payload.gender;
          user.country = String(payload.country);
          user.injurySVG = injury_svg_string;
        });

        dispatch({
          type: "change_profile_edit_request_success"
          // payload: payload
        });

        success = true;
      })
      .catch(function(error) {
        console.log("Update Account error", error);
        console.log("Update Account error.response", error.response);

        Alert.alert(
          "Error",
          "Something went wrong. Please check your internet connection and try again",
          [
            {
              text: "ok",
              onPress: () =>
                dispatch({ type: "change_profile_edit_request_fail" })
            }
          ],
          { cancelable: true }
        );
      })
      .then(() => {
        if (success) {
          setTimeout(() => {
            Alert.alert(
              "Success",
              "Account info Successfully Changed",
              [{ text: "ok", onPress: () => dispatch({ type: "go-back" }) }],
              { cancelable: true }
            );
          }, 500);
        }
      });
  };
};

export const dataArrayAddition = payload => {
  return {
    type: "profile_data_Array_Addition",
    payload: payload
  };
};

export const ModalBodyFatToggle = () => {
  return {
    type: "change_profile_toggle_body_fat_hide"
  };
};

export const ReloadStateValue = () => {
  return {
    type: "change_profile_reload"
  };
};

export const changeBodyFat = payload => {
  return {
    type: "change_profile_edit_body_fat_text",
    payload: payload
  };
};

export const ToggleBodyFatModal = payload => {
  return {
    type: "change_profile_toggle_body_fat_modal"
  };
};

export const gotoChangePassword = () => {
  return {
    type: "goto_change_password"
  };
};

export const gotoCountryList = () => {
  return {
    type: "goto_country_list"
  };
};

export const changeActivityLevel = payload => {
  return {
    type: "change_profile_edit_activity_level",
    payload: payload
  };
};

export const onChangeFirstName = text => {
  return {
    type: "change_profile_edit_first_name",
    payload: text
  };
};

export const onChangeLastName = text => {
  return {
    type: "change_profile_edit_last_name",
    payload: text
  };
};

export const changeGender = payload => {
  return {
    type: "change_profile_edit_gender",
    payload: payload
  };
};

export const changeHeight = payload => {
  return {
    type: "change_profile_edit_height",
    payload: payload
  };
};

export const changeWeight = payload => {
  return {
    type: "change_profile_edit_weight",
    payload: payload
  };
};

export const changePreferedDaysWorkout = payload => {
  return {
    type: "change_profile_edit_days_of_workouts",
    payload: payload
  };
};

export const changeInjury = payload => {
  return {
    type: "change_profile_edit_injury",
    payload: payload
  };
};

export const changeInjuryText = payload => {
  return {
    type: "change_profile_edit_injury_text",
    payload: payload
  };
};

export const changeDateOfBirth = payload => {
  return {
    type: "change_profile_edit_dob",
    payload: payload
  };
};
