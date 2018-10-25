import realm from "../../../models";

// let user = realm.objects("UserModel");
// console.log(
//   ...user,
//   "User in the profileSettingsred : <><><><><><><><  > <<  >> < >"
// );
// console.log(
//   user[0].updateWeight,
//   "user.updateWeight in the profileSettingsred : <><><><><><><><  > <<  >> < >"
// );
// if (user[0].pushWorkouts != undefined) {
//   var push_workout = user[0].pushWorkouts;
// } else {
//   var push_workout = true;
// }
// if (user[0].updateWeight != undefined) {
//   var update_weight = user[0].updateWeight;
// } else {
//   var update_weight = true;
// }

const INITIAL_STATE = {
  pushWorkouts: false,
  updateWeight: false,
  healthKit: false,
  calender_status: "",
  calendarList: [],
  fetchingEvents: false
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "goto_profileSetting":
      let user = realm.objects("UserModel");
      if (user[0].pushWorkouts != undefined) {
        var push_workout = user[0].pushWorkouts;
      } else {
        var push_workout = true;
      }
      if (user[0].updateWeight != undefined) {
        var update_weight = user[0].updateWeight;
      } else {
        var update_weight = true;
      }
      if (user[0].healthKit != undefined) {
        var health_kit = user[0].healthKit;
      } else {
        var health_kit = true;
      }
      return {
        ...state,
        pushWorkouts: push_workout,
        updateWeight: update_weight,
        healthKit: health_kit,
      };

    case "cal_auth":
      return { ...state, calender_status: action.payload };
    case "calendar_fetched_list":
      return { ...state, calendarList: action.payload };

    case "fetching_events_started":
      return { ...state, fetchingEvents: true };
    case "fetching_events_finshed":
      return { ...state, fetchingEvents: false };

    case "change_push_workouts_dates_value":
      return { ...state, pushWorkouts: action.payload };
    case "change_update_weight_value":
      return { ...state, updateWeight: action.payload };
    case "change_healthkit_value":
      return { ...state, healthKit: action.payload };
    default:
      return state;
  }
};
