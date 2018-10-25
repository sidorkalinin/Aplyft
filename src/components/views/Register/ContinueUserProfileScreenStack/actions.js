import { UPDATE_USER } from "../../../../variables"; // constant variables across all the app
import axios from "axios"; // httpRequest library
import realm from "../../../../models";
import moment from "moment";
import { Alert } from "react-native";
import Mixpanel from "react-native-mixpanel";

export const saveInfo = (payload, nav) => {
  Mixpanel.track("ContinueUserProfileScreen_Save Btn Pressed");
  return (dispatch, getState) => {
    // will update the info on the server and then process the request
    console.log("i am in the saveInfo", payload);
    var injury_svg_string = payload.dataArray.toString();
    var bodyFormData = new FormData();
    //bodyFormData.append("id", getState().user.user.id);
    bodyFormData.append("first_name", payload.first_name);
    bodyFormData.append("last_name", payload.last_name);
    bodyFormData.append("gender", payload.gender);
    bodyFormData.append("height", payload.height);
    bodyFormData.append("height_unit", "cm");
    bodyFormData.append("weight", payload.body_weight);
    bodyFormData.append("weight_unit", "kg");
    bodyFormData.append("injury", payload.injury ? payload.injury_text : "");
    bodyFormData.append(
      "injury_svg_code",
      payload.injury ? injury_svg_string : ""
    );

    console.log("injury_svg_string is : >>> > > >: ", injury_svg_string);
    // adding the extra vaues
    if (
      payload.activity_level == "null" ||
      payload.activity_level == null ||
      payload.activity_level == ""
    ) {
      bodyFormData.append("activity_level", 0);
    } else {
      bodyFormData.append("activity_level", payload.activity_level);
    }

    if (payload.preferedWorkoutDaysBitwise != null) {
      bodyFormData.append("day_of_workout", payload.preferedWorkoutDaysBitwise);
    }
    if (payload.body_fat != null) {
      bodyFormData.append("body_fat", payload.body_fat);
    }

    if (payload.dob != null) {
      bodyFormData.append("dob", moment(payload.dob).format("YYYY-MM-DD"));
    }

    //console.log("trying to upload", bodyFormData);

    var success = false;
    // will update the info on the server and then process the request
    console.log(
      "i am in the saveInfo and the bodyFormData is >> : ",
      bodyFormData
    );
    if (
      payload.injury == true &&
      (payload.injury_text == null ||
        injury_svg_string == "" ||
        injury_svg_string == null)
    ) {
      console.log("i am in where empty fields are ");

      Alert.alert(
        "Empty Fields",
        "Please fill in the blanks",
        [
          {
            text: "OK",
            onPress: () =>
              console.log("OK Pressed For Please fill in the blanks")
          }
        ],
        { cancelable: true }
      );
    } else {
      axios
        .put(UPDATE_USER(getState().user.user.id), bodyFormData)
        .then(function(respone) {
          // if everything is ok and saved on the server then save it in realm
          // save in realm
          realm.write(() => {
            var user = getState().user.user;
            user.injury = payload.injury;
            user.injuryText = payload.injury_text || null;
            user.dateOfBirth = payload.dob || null;
            // user.phone = payload.phone || null;
            user.activityLevel = String(payload.activity_level) || null;
            user.preferedWorkoutDays =
              String(payload.preferedWorkoutDaysBitwise) || 0;
            user.height = String(payload.height) || "";
            user.weight = String(payload.body_weight) || "";
            user.bodyfat = String(payload.body_fat) || "";
            user.fullname = payload.first_name + " " + payload.last_name;
            user.firstName = payload.first_name;
            user.lastName = payload.last_name;
            user.gender = payload.gender;
            user.country = String(payload.country);
            user.injurySVG = injury_svg_string;
          });

          dispatch({
            type: "goto_complete_profile_congrats"
            // payload: payload
          });

          // console.log("get state",getState()) ;
          // nav.goBack(null);
        })
        .catch(function(error) {
          console.log("choose trainer uri error", error);
          console.log("choose trainer uri error.response", error.response);
          dispatch({ type: "user_complete_info_fail" });
        });
    }
  };
};

export const changeInjury = payload => {
  return {
    type: "change_injury",
    payload: payload
  };
};
export const dataArrayAddition = payload => {
  return {
    type: "data_Array_Addition",
    payload: payload
  };
};

export const skipProfileCompletion = payload => {
  return {
    type: "go_to_the_previous_page",
    payload: payload
  };
};

export const changeDOB = payload => {
  return {
    type: "change_dob",
    payload: payload
  };
};

export const changePhone = payload => {
  return {
    type: "change_phone",
    payload: payload
  };
};

export const onBodyWeight = payload => {
  return {
    type: "change_body_weight",
    payload: payload
  };
};
export const Continue_Profile_Loaded = payload => {
  return {
    type: "continueProfileLoaded",
    payload: payload
  };
};

export const onBodyHeight = payload => {
  return {
    type: "change_body_height",
    payload: payload
  };
};

export const onInuryTextChange = payload => {
  return {
    type: "change_injury_text",
    payload: payload
  };
};
