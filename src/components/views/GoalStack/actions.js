import axios from "axios"; // httpRequest library
import { SET_GOAL_URI } from "../../../variables"; // constant variables across all the app
import realm from "../../../models";
import { Alert, Platform } from "react-native";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const gotoSubPage = data => {
  
  if(Platform.OS != "android")
    firebase.analytics().logEvent("GoalScreenChoosingGoalTypeBtnPressed");
  
  Mixpanel.track("GoalScreen_Select Goal Type Btn Pressed");
  switch (data) {
    case "bodybuilding":
      if(Platform.OS != "android")
        firebase.analytics().logEvent("GoalScreenSelectBodybuilding");
      Mixpanel.track("GoalScreen_Select_bodybuilding");
      return {
        type: "goto_goal_bodybuilding",
        payload: { data }
      };

    case "powerlifting":
      if(Platform.OS != "android")
        firebase.analytics().logEvent("GoalScreenSelectPowerlifting");
      Mixpanel.track("GoalScreen_Select_powerlifting");
      return {
        type: "goto_goal_powerlyfting",
        payload: { data }
      };

    case "crossfit":
      if(Platform.OS != "android")
        firebase.analytics().logEvent("GoalScreenSelectcrosslyft");
      Mixpanel.track("GoalScreen_Select_crosslyft");
      return {
        type: "goto_goal_crosslyft",
        payload: { data }
      };

    case "sportsspecific":
      if(Platform.OS != "android")
        firebase.analytics().logEvent("GoalScreenSelectathleticperformance");
      Mixpanel.track("GoalScreen_Select_athletic_performance");
      return {
        type: "goto_goal_sportsspecific",
        payload: { data }
      };
  }
};

// common action for all the goal stack
export const onSetGoal = (categoryId, payload) => {
  // console.log("pressing the on set goal", categoryId, payload);
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return (dispatch, getState) => {
    Alert.alert(
      "Submitting Goal!",
      "Are you sure you want to submit this goal?",
      [
        { text: "Cancel", onPress: () => console.log("OK Pressed") },
        {
          text: "Yes",
          onPress: () =>
            sendAndSave(categoryId, payload, dispatch, getState, false)
        }
      ],
      { cancelable: true }
    );
  };
};

// helper function
const sendAndSave = (
  categoryId,
  payload,
  dispatch,
  getState,
  requireNutritionPlan
) => {
  if(Platform.OS != "android")
    firebase.analytics().logEvent("GoalScreenSumbitGoalBtnPressed");
  Mixpanel.trackWithProperties("GoalScreen_Sumbit Goal Btn Pressed", { category_id: categoryId });
  var user = getState().user.user; // accessing other reducer from this one

  // faster for now only
  dispatch({
    type: "user_set_goal_start",
    payload: payload
  });

  // performing an api call to the server
  axios
    .post(SET_GOAL_URI, {
      data: {
        type: "user_goal",
        attributes: {
          user_id: user.id,
          category_id: categoryId,
          require_nutrition_plan: requireNutritionPlan ? 1 : 0,
          fields: payload.fields
        }
      }
    })
    .then(function(response) {
      console.log("setGoal response", response);
      console.log("passed fields", Array.from(payload.fields));

      // splitting the fields into several json keys for readablity
      var mixpanel_properties = { category_id : categoryId };
      for (var key in payload.fields) {
        let row = payload.fields[key];
        // replacing the apce with underscore
        var _key = row.title.trim();
        _key = _key.split(' ').join('_');
        mixpanel_properties[_key] = row.value;
      }
      // adding user unit
      mixpanel_properties = { ...mixpanel_properties, units: user.units }; 

      // adding analytics
      if(Platform.OS != "android")
        firebase.analytics().logEvent("GoalScreenSumbitGoalSuccess");
      Mixpanel.trackWithProperties("GoalScreen_Sumbit Goal Success", mixpanel_properties);
      Mixpanel.registerSuperProperties({"Account type": "Free"});

      var fields = [];
      for (var index in payload.fields) {
        var row = payload.fields[index];
        fields.push({
          id: String(row.id),
          title: row.title || "",
          value: String(row.value)
        });
      }
      try {
        // add to realm
        realm.write(() => {
          // deleting all the fields before inserting new ones
          realm.delete(realm.objects("FieldModel"));

          getState().user.user.goal.push({
            id: String(response.data[0].id),
            category_id: String(categoryId),
            require_nutrition_plan: requireNutritionPlan ? true : false,
            fields: fields
          });
          dispatch({ type: "user_set_goal_model_off" }); // inorder to remove the model once savingon realm succes
        });
      } catch (error) {
        console.log("Cannot Create FieldModel !!!!!!!!", error);
      }
      var user_injury_data = realm.objects("UserModel");
      console.log(
        "USER_INJURY_DATA afterSetGoal >> > >  > ",
        ...user_injury_data
      );
      if (
        user_injury_data[0].injury == true &&
        (user_injury_data[0].injuryText == null ||
          user_injury_data[0].injuryText == "")
      ) {
        console.log(
          'I am in where the injury is true and the text is either null or ""'
        );
        setTimeout(() => {
          dispatch({ type: "user_set_goal_success" });
        }, 50);
        setTimeout(() => {
          dispatch({ type: "goto_complete_profile" });
        }, 60);
      } else {
        dispatch({ type: "user_set_goal_success" });
      }
    })
    .catch(function(error) {
      console.log("setGoal error", error);
      dispatch({ type: "user_set_goal_fail" });
    });
};
