import {
  SETTING_PRESSED,
  VIEWMORE_PRESSED,
  OPTOUT_PRESSED,
  VIEWPROFILE_PRESSED,
  SET_GOAL_SCREEN
} from "./types";
import axios from "axios";
import realm from "../../../../models";
import {
  PAYMENT_USER,
  OPT_OUT_GOAL_URI,
  CHANGE_PHOTO_USER,
  VERSION_CHECK,
  IOS_SYMLINK,
  GOOGLE_PLAY_SYMLINK,
  APP_VERSION,
  SUBMIT_REVIEW,
  SUBMIT_USER_REVIEW,
  SUBMIT_USER_REVIEW_PUT,
  GET_USER_REVIEW
} from "../../../../variables";
import moment from "moment";
import { Alert, Platform, Linking } from "react-native";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const settingpress = () => {
  return {
    type: SETTING_PRESSED
  };
};

export const viewmorepress = () => {
  return dispatch => {
    dispatch({ type: VIEWMORE_PRESSED });
  };
};
export const gotoEditReview = () => {
  return dispatch => {
    console.log("I am here in ADD Review");
    dispatch({ type: "gotoReview" });
  };
};
export const gotoAddReview = () => {
  return dispatch => {
    console.log("I am here in EDIT Review");
    dispatch({ type: "gotoReview" });
  };
};

export const closeRatingModal = () => {
  return {
    type: "close_reviewModel",
    payload: false
  };
};

export const submitRating = payload => {
  return async dispatch => {
    let pt_id = payload.pt_id;
    let user_id = payload.user_id;
    let user_rating = payload.user_rating;
    let user_rating_comment = payload.user_rating_comment;

    var bodyFormData = new FormData();
    bodyFormData.append("review", user_rating_comment);
    bodyFormData.append("rating", user_rating);
    bodyFormData.append("personal_trainer", pt_id);
    bodyFormData.append("user", user_id);
    let personal_trainer = realm
      .objects("PersonalTrainerModel")
      .filtered("id == $0", pt_id);
    let personal_trainer_rating_id = personal_trainer[0].ratingId;
    let personal_trainer_rating = personal_trainer[0].ratingStars;
    let personal_trainer_review = personal_trainer[0].ratingText;

    try {
      console.log("personal_trainer_rating:  ", personal_trainer_rating);
      if (
        personal_trainer_rating == null ||
        personal_trainer_rating == "null"
      ) {
        console.log("I am here  in POST ");
        response = await axios.post(SUBMIT_USER_REVIEW(), bodyFormData);
      } else {
        console.log("I am here  in PUT ");
        response = await axios.put(
          SUBMIT_USER_REVIEW_PUT(personal_trainer_rating_id),
          bodyFormData
        );
      }
      console.log("response is", response);
      dispatch(get_user_review(payload));
    } catch (err) {
      console.log("error is", err);
    }
  };
};

export const get_user_review = payload => {
  return async dispatch => {
    let pt_id = payload.pt_id;
    let user_id = payload.user_id;
    let user_rating = payload.user_rating;
    let user_rating_comment = payload.user_rating_comment;
    try {
      response = await axios.get(GET_USER_REVIEW(pt_id));

      console.log("response is", response);
      let results = response.data.results[0];

      let ratingId = results.id;
      let user_rating = results.rating;
      let user_rating_comment = results.review;

      try {
        realm.write(() => {
          // Update th UserModel object
          realm.create(
            "PersonalTrainerModel",
            {
              id: String(pt_id),
              ratingId: String(ratingId),
              ratingStars: String(user_rating),
              ratingText: String(user_rating_comment)
            },
            true // check if it its laready inserted otherwise update
          );
        });
      } catch (error) {
        console.log(
          "Cannot Update  The New user_rating and the user_rating_comment  in PersonalTrainerModel Model !!!!!!!!",
          error
        );
      }
    } catch (err) {
      console.log("error is", err);
    }
  };
};

export const check_Last_Weight_Inptut = () => {
  return dispatch => {
    let user = realm.objects("UserModel");
    // console.log(
    //   user[0].updateWeight,
    //   "I AM HERE WHERE AND USER[0].UPDATEWEIGHT IS >?>>>>>>?>>>?>>> "
    // );
    if (user[0].updateWeight == true) {
      // console.log(
      //   "I AM HERE WHERE THE USER[0]/UPDATEWEIGHT IS TR U U U U U U U U U U E"
      // );
      let weight_value_date = realm
        .objects("UserSettings")
        .filtered("key CONTAINS 'weight_value_date'");

      //double check if the object exists in the settings
      if (weight_value_date.length < 1) {
        // the object does not exists, create one
        realm.write(() => {
          weight_value_date = realm.create(
            "UserSettings",
            {
              key: "weight_value_date",
              date: moment().format("YYYY-MM-DD"),
              value: moment().format("YYYY-MM-DD")
            },
            true
          );
        });
      }

      // re-fetch the data
      weight_value_date = realm
        .objects("UserSettings")
        .filtered("key CONTAINS 'weight_value_date'");

      var weight_date1 = weight_value_date[0].date;

      var today_date = moment().format("YYYY-MM-DD");
      var weight_date = moment(weight_date1).format("YYYY-MM-DD");

      if (new Date(weight_date) < new Date(today_date)) {
        Alert.alert(
          "You haven't logged your weight for today.",
          "Would you like to do it now ?",
          [
            {
              text: "Yes",
              onPress: () => update_weight_confirmation(dispatch)
            },
            {
              text: "No",
              onPress: () => update_weight_cancelation(dispatch),
              style: "destructive"
            }
          ],
          { cancelable: true }
        );
      }
    }

    //dispatch({ type: "performance_type_pressed" })
  };
};

export const update_weight_confirmation = dispatch => {
  var payload = {
    item: "weight",
    pop_up: true
  };
  var today_weight_date = moment().format("YYYY-MM-DD");
  try {
    realm.write(() => {
      // Update th UserModel object
      realm.create(
        "UserSettings",
        {
          key: "weight_value_date",
          date: today_weight_date,
          value: today_weight_date
        },
        true // check if it its laready inserted otherwise update
      );
    });
  } catch (error) {
    console.log(
      "Cannot Update  The New Weight Date in UserSettings Model !!!!!!!!",
      error
    );
  }

  dispatch({ type: "performance_type_pressed", payload: payload });
};
export const update_weight_cancelation = dispatch => {
  var payload = {
    item: "weight"
  };
  var today_weight_date = moment().format("YYYY-MM-DD");
  try {
    realm.write(() => {
      // Update th UserModel object
      realm.create(
        "UserSettings",
        {
          key: "weight_value_date",
          date: today_weight_date,
          value: today_weight_date
        },
        true // check if it its laready inserted otherwise update
      );
    });
  } catch (error) {
    console.log(
      "Cannot Update  The New Weight Date in UserSettings Model !!!!!!!!",
      error
    );
  }
};

export const optoutpress = () => {
  // [3] Defining an Action Creator.
  return (dispatch, getState) => {
    dispatch({
      type: "profile_show_loading",
      payload: "Opting Out"
    });
    // analytics
    if (Platform.OS != "android")
      firebase.analytics().logEvent("ProfileTabScreen_GoalOptOutPresses");
    Mixpanel.track("ProfileTabScreen_Goal Opt out Pressed");

    // remove the goal from realm after success from server
    var success = false;
    // console.log(getState().user.user.id, getState().user.user.goal[0].id);

    axios
      .post(
        OPT_OUT_GOAL_URI(
          getState().user.user.id,
          getState().user.user.goal[0].id
        )
      )
      .then(results => {
        if (Platform.OS != "android")
          firebase
            .analytics()
            .logEvent("ProfileTabScreen_SuccessfullGoalOptOut");
        Mixpanel.track("ProfileTabScreen_Successfull Goal Opt out");
        // console.log("opt out results", results);
        realm.write(() => {
          // Delete multiple objects by passing in a `Results`, `List`,
          // or JavaScript `Array`
          let allGoals = realm.objects("GoalModel");
          let allWorkouts = realm.objects("WorkoutModel");
          let allExercise = realm.objects("ExerciseModel");
          let allMove = realm.objects("MoveModel");
          let allSets = realm.objects("SetModel");
          let allNutrition = realm.objects("NutritionModel");

          let allPerformanceSearchListModel = realm.objects(
            "PerformanceSearchListModel"
          );
          let allPerformanceModel = realm.objects("PerformanceModel");
          let allPerformanceDataModel = realm.objects("PerformanceDataModel");
          let allWarmUpSetModel = realm.objects("WarmUpSetModel");
          let allWarmUpModel = realm.objects("WarmUpModel");
          let allWarmUpExerciseModel = realm.objects("WarmUpExerciseModel");
          realm.delete(allGoals);
          realm.delete(allWorkouts);
          realm.delete(allExercise);
          realm.delete(allMove);
          realm.delete(allSets);
          realm.delete(allNutrition);

          realm.delete(allPerformanceSearchListModel);
          realm.delete(allPerformanceModel);
          realm.delete(allPerformanceDataModel);
          realm.delete(allWarmUpSetModel);
          realm.delete(allWarmUpModel);
          realm.delete(allWarmUpExerciseModel);

          // getState().user.user.freedailyWorkout = false;
        });
        success = true;
      })
      .catch(error => {
        success = true;

        console.log("opt out error", error);
      })
      .then(() => {
        dispatch({ type: "profile_hide_loading" });
        if (success) {
          dispatch({
            type: "reload_user_from_realm"
          });
          dispatch({
            type: OPTOUT_PRESSED
          });
          dispatch(gotoSetGoal());
        }
      });
  };
};

export const onAgreementPress = () => {
  return {
    type: "goto_personal_trainer_agreement"
  };
};

export const gotoPersonalTrainer = payload => {
  var trainerID = payload.trainerID;
  console.log("trainerID is :", trainerID);
  console.log("payload.trainerID :", payload.trainerID);
  console.log("payload :", payload);
  return {
    type: "goto_personal_trainer",
    payload: { payload }
  };
};

export const gotoSetGoal = () => {
  // [3] Defining an Action Creator.
  return dispatch => {
    dispatch({ type: SET_GOAL_SCREEN });
  };
};

export const gotoProgressGallery = () => {
  return {
    type: "goto_progress_gallery"
  };
};

export const uploadImage = data => {
  return (dispatch, getState) => {
    // uploading the files as form data
    // adding in a loop all the uploaded files as
    var to_be_sent = new FormData();
    to_be_sent.append("image", {
      uri: data.path,
      type: data.mime,
      name: "tmp.JPG"
    });

    const axios_config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        // calculating and showing the uploaded percentage to the user
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // dispatch({
        //   type: 'progress_gallery_uploading_percentage',
        //   payload: percentCompleted
        // })
      }
    };

    dispatch({
      type: "profile_show_loading",
      payload: "Uploading photo..."
    });

    axios
      .post(
        CHANGE_PHOTO_USER(getState().user.user.id),
        to_be_sent,
        axios_config
      )
      .then(result => {
        if (Platform.OS != "android")
          firebase.analytics().logEvent("ProfileTabScreenUploadingImage");
        Mixpanel.track("ProfileTab Screen_Uploading Image");
        success = true;
        var data = result.data;
        // the server will return for us the new updated link that we will reflect it in realm
        realm.write(() => {
          getState().user.user.imageURL = data.photo_url;
        });

        dispatch({ type: "profile_hide_loading" });
      })
      .catch(error => {
        console.log("error photo upload", error);
      })
      .then(() => {
        if (success) dispatch({ type: "reload_user_from_realm" });
      });
  };
};

export const check_mobile_version = () => {
  return dispatch => {
    // first we need to check if the user settings exists, if not create it and check online.
    // if the user settings exists, then check if its true, just display the alert and dont check online.
    // if its false, check online

    let user = realm.objects("UserModel");
    var update_value = realm
      .objects("UserSettings")
      .filtered("key CONTAINS 'update_available'");

    //double check if the object exists in the settings
    realm.write(() => {
      if (update_value.length < 1) {
        // the object does not exists, create one with a default value of false
        update_value = realm.create(
          "UserSettings",
          {
            key: "update_available",
            date: moment().format("YYYY-MM-DD"),
            value: "false"
          },
          true
        );
      } else {
        // in this section of the code we will check if the user presses the update button and actually updated the app
        // therefore the app version in realm must be an old version then the current one 'APP_VERSION', if its the first
        // launching tha app after the update
        if (
          update_value[0].value != "false" &&
          update_value[0].value != APP_VERSION
        ) {
          // so the user updated the app gracefully
          // we need to set the value to false
          update_value[0].value = "false";
        }
      }
    });

    // re-fetch the data
    update_value = realm
      .objects("UserSettings")
      .filtered("key CONTAINS 'update_available'");

    var isUpdateNeeded = update_value[0].value;
    if (isUpdateNeeded != "false") {
      Alert.alert(
        "Update",
        "There is a new version available, please update",
        [
          {
            text: "UPDATE",
            onPress: () => {
              if (Platform.OS == "ios") Linking.openURL(IOS_SYMLINK);
              else Linking.openURL(GOOGLE_PLAY_SYMLINK);
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      axios.get(VERSION_CHECK()).then(() => {
        console.log("version is checked");
      });
    }
  };
};
