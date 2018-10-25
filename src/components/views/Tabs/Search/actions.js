import axios from "axios";
import Realm from "../../../../models";
import PersonalTrainerModel from "../../../../models/PersonalTrainerModel";
import {
  AVAILABLE_TRAINERS_URI,
  CHOOSE_TRAINER_URI,
  CANCEL_TRAINER_URI,
  GET_DAILY_WORKOUT,
  ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED
} from "../../../../variables";
import { Alert, Platform } from "react-native";
import { loadWorkoutFromServer } from "../Training/actions";
import { ChatList_Server_to_Realm } from "./../Chat/ChatList/actions";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const loadSearchListItems = () => {
  return (dispatch, getState) => {
    try {
      Realm.write(() => {
        Realm.delete(Realm.objects("PricingPlanModel"));
        Realm.delete(Realm.objects("TrainersReviewModel"));
        console.log("Deleted All The Pricing Plans");
        console.log("Deleted All The TrainersReviewModel");
      });
    } catch (e) {
      console.log("error Deleting realmDB for pricing plans", e);
    }
    var success = false;
    // fetching the available trainers from the server
    axios
      .get(AVAILABLE_TRAINERS_URI(getState().user.user.id))
      .then(function(response) {
        console.log("getting the search list requests", response);
        // console.log("hydrating realm object", (new PersonalTrainerModel()).hydrate() )

        // format the response and when finished send it back through the reducer
        //var fomatted_object = [];
        var response_data = response.data;

        var data = response_data;

        success = false;
        var suggested_trainers = [];
        var area_of_expertise_Array = [];
        for (var data_index in data) {
          var row = data[data_index];

          var results = row.result;
          var user_object = {};

          if (
            results.max_clients_reached != 1 ||
            (results.max_clients_reached == 1 && row.status == "active")
          ) {
            for (var i in results.area_of_expertise) {
              var tmp = results.area_of_expertise[i];

              // if (area_of_expertise_Array.indexOf(tmp) > -1) continue;
              area_of_expertise_Array.push(tmp);
            }

            let trainer_model_obj = {
              id: String(results.personal_trainer),
              firstName: results.first_name,
              lastName: results.last_name,
              picURL: results.photo_url || "",
              category: results.category_name || "",
              languages: results.languages || "",
              chosen: String(row.chosen) == "null" ? "0" : String(row.chosen),
              location: results.country || "",
              country_code: results.country_code || "",
              stars: parseInt(results.rating, 10) || 0,
              price: String(results.price) || "",
              free_trail: String(results.pricing_plan_trial) || "",
              price_range:
                String(results.price_range) == "null"
                  ? ""
                  : String(results.price_range),
              duration: String(results.duration_range) || "",
              activeUsers: String(results.active_users) || "0",
              bio: String(results.bio_speciality) || "",
              certifications: String(results.certification_accreditation) || "",
              description: String(results.description) || "",
              video_url: results.video_url || null,
              areaOfExpertise: area_of_expertise_Array || [],
              pricingplans: []
            };
            if (results.pricing_plans != null) {
              for (var pricing_index in results.pricing_plans) {
                var price_row = results.pricing_plans[pricing_index];

                let price_planning_obj = {
                  id: String(price_row.id),
                  name: String(price_row.name) || "",
                  stripe_pricing_plan_id:
                    String(price_row.stripe_pricing_plan_id) || "",
                  price: String(price_row.price) || "",
                  description: String(price_row.description) || "",
                  currency: String(price_row.currency) || "",
                  interval: String(price_row.interval) || "",
                  interval_count: String(price_row.interval_count) || "",
                  chosen: String(price_row.chosen) || "",
                  trial_period: String(price_row.trial_period) || "",
                  personal_trainer_category_id:
                    String(price_row.personal_trainer_category_id) || ""
                };

                trainer_model_obj.pricingplans.push(price_planning_obj);
              }
            }
            var trainer_reviews_array = [];
            if (results.trainer_reviews.length > 0) {
              for (var review_index in results.trainer_reviews) {
                let review_row = results.trainer_reviews[review_index];

                let review_obj = {
                  id: String(review_row.id),
                  client_review: String(review_row.review),
                  client_rating: String(review_row.rating),
                  client_name: String(review_row.user_full_name)
                };
                trainer_reviews_array.push(review_obj);
              }
            }

            let suggested_trainer_obj = {
              id: String(results.personal_trainer),
              status: row.status,
              chosen: String(row.chosen) == "null" ? "0" : String(row.chosen),
              program_duration: String(results.duration_range) || "",
              program_price: String(results.price) || "",
              program_currency: String(results.currency) || "",
              show_price: String(results.show_price) == "0" ? false : true,
              show_stars: String(results.show_rating) == "0" ? false : true,
              personal_trainer: trainer_model_obj,
              reviews: trainer_reviews_array
            };

            // adding it to the list so we can batch them after the foor loop
            suggested_trainers.push(suggested_trainer_obj);
            area_of_expertise_Array = [];
          } else {
            console.log("Skipped A trainer that should be hidden");
            continue;
          }
        }

        // for performance we need to limit the write  realm for opening in one batch only and after success
        try {
          Realm.write(() => {
            // remove the already predefined rows
            Realm.delete(Realm.objects("SuggestTrainerModel"));

            for (var index in suggested_trainers) {
              // Create a UserModel object synchronous
              Realm.create(
                "SuggestTrainerModel",
                suggested_trainers[index],
                true // check if it its laready inserted otherwise update
              );
            }
          });
          success = true;
        } catch (e) {
          console.log("error updating realmDB for personal trainers", e);
        }
      })
      .catch(function(error) {
        console.log("setGsearch list error", error);
        console.log("setGsearch list error", error.response);
        dispatch({ type: "load_search_list_items_fail" });
      })
      .then(() => {
        if (success)
          dispatch({
            type: "load_search_list_items_success"
          });
      })
      .then(() => {
        dispatch({
          type: "reload_user_from_realm"
        });
      });
  };
};

export const chooseTrainer = payload => {
  return (dispatch, getState) => {
    var plan_id = payload.id;
    var trainerID = payload.trainer_id;
    var fullname = payload.fullname;
    var plan_name = payload.plan_name;

    // adding analytics
    if (Platform.OS != "android")
      firebase.analytics().logEvent("UserChoseTrainersPlan");

    Mixpanel.trackWithProperties("User chose trainer's plan", {
      planID: plan_id,
      plan_name: plan_name,
      trainerID: trainerID,
      trainer_full_name: fullname
    });

    var user_injury_data = Realm.objects("UserModel");
    if (
      user_injury_data[0].injury == true &&
      user_injury_data[0].injuryText == null
    ) {
      dispatch({
        type: "goto_complete_profile"
      });
    } else {
      if (
        getState().SearchList.selected_trainers <
        ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED
      ) {
        Alert.alert(
          "Choosing a trainer",
          "Are you sure you want to choose " + fullname + "?",
          [
            {
              text: "No",
              onPress: () => {
                if (Platform.OS != "android")
                  firebase.analytics().logEvent("trainer_chosen_popup_cancel");
                Mixpanel.track(
                  "SuggestedTrainersScreen_Pressing no for choosing a trainer on Choosing Trainer Popup"
                );
              },
              style: "destructive"
            },
            {
              text: "Yes",
              onPress: () => sendTrainerReuqest(dispatch, getState, payload)
            }
          ],
          { cancelable: true }
        );
      } else {
        alert("You have reach your maximum number of trainer selection");
      }
    }
  };
};
export const cancelTrainer = (payload, selected_number) => {
  console.log(
    "I am here in the cancelTrainer  and the trainerID, plan_id : ",
    payload,
    selected_number
  );
  return (dispatch, getState) => {
    var plan_id = payload.id;
    var trainerID = payload.trainer_id;
    var fullname = payload.fullname;

    var user_injury_data = Realm.objects("UserModel");
    console.log("USER_INJURY_DATA >> > >  > ", ...user_injury_data);
    if (
      user_injury_data[0].injury == true &&
      user_injury_data[0].injuryText == null
    ) {
      dispatch({
        type: "goto_complete_profile"
      });
    } else {
      Alert.alert(
        "Canceling a Requested Plan",
        "Are you sure you want to Cancel this Plan ?",
        [
          {
            text: "No",
            onPress: () => {
              if (Platform.OS != "android")
                firebase.analytics().logEvent("trainer_chosen_cancel_request");
              Mixpanel.track(
                "SuggestedTrainersScreen_Pressing no for canceling plan on Plan cancelation Popup"
              );
            },
            style: "destructive"
          },
          {
            text: "Yes",
            onPress: () => cancelTrainerReuqest(dispatch, getState, payload)
          }
        ],
        { cancelable: true }
      );
    }
  };
};

const sendTrainerReuqest = (dispatch, getState, payload) => {
  // need to check first if the user filled his info first
  var user = getState().user.user;

  var plan_id = payload.id;
  var trainerID = payload.trainer_id;
  var fullname = payload.fullname;

  console.log(trainerID, "trainerID");
  console.log(plan_id, "planID");

  if (user.injury == undefined) {
    dispatch({
      type: "goto_complete_profile"
    });
    return;
  }

  dispatch({
    type: "choose_trainer_start"
  });
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", getState().user.user.id);
  bodyFormData.append("personal_trainer_id", trainerID);
  bodyFormData.append("pricing_plan_id", plan_id);
  // if the user already filled his info then he will be able to directly connect with a trainer
  axios
    .post(CHOOSE_TRAINER_URI, bodyFormData)
    .then(function(response) {
      if (Platform.OS != "android")
        firebase.analytics().logEvent("trainer_chosen_request_sent");
      Mixpanel.track("SuggestedTrainersScreen_Trainer Request Sent");
      var suggested = Realm.objects("SuggestTrainerModel");
      var remaining_trainers = 0;
      console.log("The response in CHOOSE_TRAINER_URI is : ", response);
      // update realm
      try {
        Realm.write(() => {
          for (var index in suggested) {
            var row = suggested[index];
            if (row.personal_trainer.id == trainerID) {
              row.status = "pending_trainer_approval";
            }

            if (row.status != "default") remaining_trainers += 1;
          }
          var plan_object = {
            id: plan_id,
            chosen: "1"
          };
          let plan_object_update = Realm.create(
            "PricingPlanModel",
            plan_object,
            true
          );
        });
      } catch (error) {
        console.log("Cannot Create a New SuggestTrainerModel !!!!!!!!", error);
      }

      // customize the user message
      var msg =
        "Your request has been sent, you can still select " +
        (ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED - remaining_trainers) +
        " more trainer(s)";
      if (ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED == remaining_trainers) {
        msg =
          "You have reach your maximum allowed Trainer selection. You can still surf the suggested trainers.";
        Alert.alert("Congratulations", msg, [
          {
            text: "Ok",
            onPress: () =>
              dispatch({ type: "choose_trainer_change", payload: false })
          }
        ]);
      } else {
        Alert.alert("Congratulations", msg, [
          {
            text: "Ok",
            onPress: () =>
              dispatch({
                type: "choose_trainer_success",
                payload: remaining_trainers
              })
          }
        ]);
      }

      dispatch(ChatList_Server_to_Realm());
      dispatch(loadSearchListItems());
      dispatch({
        type: "go-back"
      });
    })
    .catch(function(error) {
      console.log("choose trainer uri error", error);
      dispatch({ type: "choose_trainer_fail" });
    });
};
const cancelTrainerReuqest = (dispatch, getState, payload) => {
  // need to check first if the user filled his info first
  var user = getState().user.user;

  var plan_id = payload.id;
  var trainerID = payload.trainer_id;
  var fullname = payload.fullname;

  console.log(trainerID, "trainerID");
  console.log(plan_id, "planID");

  if (user.injury == undefined) {
    dispatch({
      type: "goto_complete_profile"
    });
    return;
  }

  dispatch({
    type: "choose_trainer_start"
  });
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", getState().user.user.id);
  bodyFormData.append("personal_trainer_id", trainerID);
  //bodyFormData.append("pricing_plan_id", plan_id); //Not Sending the price plan id when canceling the plan
  // if the user already filled his info then he will be able to directly connect with a trainer
  axios
    .post(CANCEL_TRAINER_URI, bodyFormData)
    .then(function(response) {
      if (Platform.OS != "android")
        firebase.analytics().logEvent("trainer_chosen_cancel_request_success");
      Mixpanel.track(
        "SuggestedTrainersScreen_Succesfully canceled chosen plan "
      );
      var suggested = Realm.objects("SuggestTrainerModel");
      var remaining_trainers = 0;
      console.log("The response in CANCEL_TRAINER_URI is : ", response);
      // update realm
      try {
        Realm.write(() => {
          var plan_object = {
            id: plan_id,
            chosen: "0"
          };
          let plan_object_update = Realm.create(
            "PricingPlanModel",
            plan_object,
            true
          );
        });
      } catch (error) {
        console.log(
          "Cannot Cancel a and put chosen 0 PricingPlanModel !!!!!!!!",
          error
        );
      }

      dispatch({ type: "choose_trainer_change", payload: false });

      dispatch({
        type: "choose_trainer_success",
        payload: remaining_trainers
      });

      dispatch(ChatList_Server_to_Realm());
      dispatch(loadSearchListItems());
      dispatch({
        type: "go-back"
      });
    })
    .catch(function(error) {
      console.log("choose trainer uri error", error);
      dispatch({ type: "choose_trainer_fail" });
    });
};

export const gotoPersonalTrainer = payload => {
  const { trainerID, trainer } = payload;
  // adding analytics
  if (Platform.OS != "android")
    firebase.analytics().logEvent("PersonalTrainerViewed");
  Mixpanel.trackWithProperties("PersonalTrainerViewed", {
    personalTrainerID: trainerID,
    first_name: trainer.firstName,
    last_name: trainer.lastName,
    trainer_full_name: trainer.firstName + " " + trainer.lastName
  });

  return {
    type: "goto_personal_trainer",
    payload: { payload }
  };
};

export const gotoPayment = payload => {
  console.log("PAYLOAD IN PAYMENT: ", payload);
  return {
    type: "goto_payment",
    payload: { payload }
  };
};

export const requestFreeDailyWorkout = () => {
  return (dispatch, getState) => {
    // formatting the data
    let currentDate = new Date();
    let formatedDate =
      currentDate.getFullYear() +
      "-" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + currentDate.getDate()).slice(-2);

    // get the latest goal model for the user
    var success = false;
    axios
      .post(GET_DAILY_WORKOUT(getState().user.user.id), {
        data: {
          type: "free_program",
          attributes: {
            category_id: getState().user.user.goal[
              getState().user.user.goal.length - 1
            ].category_id,
            user_goal_id: getState().user.user.goal[
              getState().user.user.goal.length - 1
            ].id,
            start_date: formatedDate
          }
        }
      })
      .then(results => {
        if (Platform.OS != "android")
          firebase.analytics().logEvent("request_free_workout_success");
        Mixpanel.track("SuggestedTrainersScreen_Requesting free daily workout");
        Realm.write(() => {
          getState().user.user.freedailyWorkout = true;
        });
        success = true;
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
      .then(() => {
        if (success) {
          // console.log("calling the workouts from server");
          dispatch(loadWorkoutFromServer());
          dispatch(loadSearchListItems());
          dispatch(switchToWorkout());
        }
      });
  };
};

export const switchToWorkout = () => {
  return {
    type: "switch_to_workout_tab"
  };
};

export const switchToProfileTab = () => {
  return {
    type: "switch_to_profile_tab"
  };
};
