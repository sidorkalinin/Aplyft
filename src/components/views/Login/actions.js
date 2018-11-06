import { Alert, Platform } from "react-native";
import {
  LOGIN_URI,
  SIGNUP_URI,
  SIGNUP_URI_FB,
  MIXPANEL_TOKEN
} from "../../../variables"; // constant variables across all the app
import axios from "axios"; // httpRequest library
import realm from "../../../models";
import PushNotification from "react-native-push-notification";
// import firebase from 'react-native-firebase';
import firebase from "react-native-firebase";
import Mixpanel from "react-native-mixpanel";

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import FastImage from "react-native-fast-image";

export const emailChange = text => {
  return {
    type: "email_change",
    payload: text
  };
};

export function ForceLogOut() {
  return (dispatch, getState) => {
    const someVal = getState().someReducer.someVal;
    dispatch({ type: types.SOME_ACTION, valFromOtherReducer: someVal });
  };
}

export const passwordChange = text => {
  return {
    type: "password_change",
    payload: text
  };
};

var ParseSingleObjectFromArray = (obj, ar) => {
  var fomatted_object = {};

  if (obj == null) return null;

  for (var index in ar) {
    var ar_obj = ar[index];

    if (ar_obj.type == obj.type && ar_obj.id == obj.id) {
      // concatinate into a one level object
      return {
        ...ar_obj.attributes,
        id: ar_obj.id,
        relationships: ar_obj.relationships
      };
    }
  }
};

export const gotoForgotPassword = () => {
  if (Platform.OS != "android")
    firebase.analytics().logEvent("forgotPasswordScreen");
  //Send and event name with no properties
  Mixpanel.track("LoginScreen_ForgotPassword Btn Pressed");
  return {
    type: "goto_forgot_password"
  };
};

// take an object that have a username and a password
export const loginUser = (email, password) => {
  if (Platform.OS != "android")
    firebase.analytics().logEvent("LoginScreenLoginBtnPressed");
  Mixpanel.track("LoginScreen_Login Btn Pressed");
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return (dispatch, getState) => {
    // display the loading activity indicator for the user
    dispatch({ type: "user_login_loading_change", payload: true });

    // performing an api call to the server
    var success = false;
    if (email.trim() == "" || password.trim() == "") {
      dispatch({ type: "user_login_fail" });

      Alert.alert(
        "Authentication failed",
        "Failed to authenticate with the server",
        [{ text: "ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    } else {
      console.log("trying to login", email, password);
      var bodyFormData = new FormData();
      bodyFormData.append("username", email);
      bodyFormData.append("password", password);
      axios
        .post(LOGIN_URI, bodyFormData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          success = parseReturnFromServer(response, getState);
          dispatch({ type: "save_weight" });
        })
        .catch(function(error) {
          Alert.alert(
            "Authentication failed",
            "Failed to authenticate with the server",
            [{ text: "ok", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );

          console.log("LOGIN ERROR: ", error);
          console.log("LOGIN ERROR.RESPONSE: ", error.response.data.detail);
          dispatch({ type: "user_login_fail" });
        })
        .then(() => {
          // after successfull login request piush notification registration
          if (success) {
            // PushNotification.requestPermissions();
            if (Platform.OS != "android")
              firebase
                .analytics()
                .logEvent("LoginScreen_EmailRegistrationSuccess");
            Mixpanel.track("LoginScreen_Email Registration Success");

            dispatch({
              type: "user_login_success"
            });
          }
        });
    }
  };
};

export const onFacebookPress = () => {
  if (Platform.OS != "android")
    firebase.analytics().logEvent("LoginScreenFacebookBtnPressed");
  Mixpanel.track("LoginScreen_Facebook Btn Pressed");
  return (dispatch, getState) => {
    // display the loading activity indicator for the user
    dispatch({ type: "user_login_loading_change", payload: true });

    var success = false;
    LoginManager.logInWithReadPermissions([
      "public_profile",
      "email",
      "user_gender"
    ]).then(
      function(result) {
        if (result.isCancelled) {
          alert("Login was cancelled");
          dispatch({ type: "user_login_loading_change", payload: false });
          // analytics
          if (Platform.OS != "android")
            firebase
              .analytics()
              .logEvent("LoginScreenFacebookBtnCancelPressed");
          Mixpanel.track("LoginScreen_Facebook Btn Cancel Pressed");
        } else {
          //check the declined if they include the email
          var proceed = true;
          for (var _index in result.declinedPermissions) {
            const row = result.declinedPermissions[_index];
            if (String(row) == "email") {
              proceed = false;
              break;
            }
          }

          if (!proceed) {
            dispatch({ type: "user_login_loading_change", payload: false });
            alert(
              "You need to allow your email in order to login via facebook"
            );
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log("facebook results", data);
              const infoRequest = new GraphRequest(
                "/me?fields=first_name,last_name,picture.type(large),email,gender",
                null,
                (error, result) => {
                  if (error) {
                    // alert('Error fetching data: ' + error.toString());
                    console.log("Error fetching data: ", error);
                  } else {
                    // alert('Result Name: ' + result.name + ',' + result.email);
                    console.log("Result ", result);

                    var formData = new FormData();
                    formData.append("first_name", result.first_name);
                    formData.append("last_name", result.last_name);
                    formData.append("email", result.email);
                    formData.append("gender", result.gender || null);
                    formData.append("fb_id", String(result.id) || "");
                    formData.append(
                      "photo_url",
                      result.picture.data.url || null
                    );
                    formData.append("access_token", data.accessToken);

                    // will try to sign up the user, and once done we will log him in
                    axios
                      .post(SIGNUP_URI_FB(data.accessToken), formData)
                      .then(response => {
                        success = parseReturnFromServer(response, getState);
                      })
                      .catch(error => {
                        console.log("error sign up with facebook", error);
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
                          // PushNotification.requestPermissions();
                          if (Platform.OS != "android")
                            firebase
                              .analytics()
                              .logEvent(
                                "LoginScreenFacebookRegistrationSuccess"
                              );
                          Mixpanel.track(
                            "LoginScreen_Facebook Login/Registration Success"
                          );
                          dispatch({
                            type: "user_login_success"
                          });
                        }
                      });
                  }
                }
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        }
      },
      function(error) {
        dispatch({ type: "user_login_loading_change", payload: false });
        alert("Login failed with error: " + error);
        console.log("FACEBOOK ERROR:", error);
      }
    );
  };
};

initiateMixpanel = async (user_id, first_name, last_name, email) => {
  try {
    const mpInstance = await Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);

    Mixpanel.identify("user_" + user_id);
    Mixpanel.set({
      $first_name: first_name,
      $last_name: last_name,
      $email: email
    });
  } catch (err) {
    console.log(`Error initiating Mixpanel:`, err);
  }
};

var parseReturnFromServer = (response, getState) => {
  var success = false;

  let data = response.data;
  let user = data.user;
  let goal = data.user_goal;
  let user_goal_pt = data.user_goal_personal_trainer;
  let personal_trainer_review = data.personal_trainer_review;

  // analytics
  if (Platform.OS != "android")
    firebase.analytics().logEvent("LoginScreenLoginSuccess");

  initiateMixpanel(
    String(user.id),
    user.first_name,
    user.last_name,
    String(user.email)
  );
  Mixpanel.track("LoginScreen_Login Success");

  // writing the response to realm and creating the user object
  realm.write(() => {
    PushNotification.requestPermissions();
    // PushNotification.unregister();
    var userObjectToInsert = {
      id: String(user.id),
      fullname: user.first_name + " " + user.last_name,
      firstName: String(user.first_name),
      lastName: String(user.last_name),
      email: String(user.email),
      gender: String(user.gender) || "",
      height: String(user.height) || "",
      weight: String(user.weight) || "",
      fatsecretAuthToken: String(user.fatsecret_auth_token) || "",
      fatsecretAuthSecret: String(user.fatsecret_auth_secret) || "",
      preferedWorkoutDays: String(user.day_of_workout) || null,
      activityLevel: String(user.activity_level) || null,
      dateOfBirth: new Date(user.dob) || null,
      bodyfat: String(user.body_fat) || null,
      injuryText: String(user.injury) || null,
      injury: user.injury ? true : false,
      injurySVG: String(user.injury_svg_code) || "",
      country: String(user.country_of_residence) || null,
      stripeAccountId: user.stripe_customer_id || null,
      // for security
      token: String(data.token) || "",
      pushWorkouts: data.push_workouts_dates,
      updateWeight: data.daily_weight_update || true,
      healthKit: data.health_kit_update || true
    };

    // check if the photurl isnull
    if (user.photo_url != null) {
      userObjectToInsert.imageURL = user.photo_url;
      // caching user Image
      FastImage.preload([
        {
          uri: userObjectToInsert.imageURL
        }
      ]);
    }

    // check if the goal model is there in order to be assigned to the user
    const user_model = realm.create("UserModel", userObjectToInsert, true); // update if not available

    // we need to check if the user has goal first before adding it to realm
    if (goal !== null) {
      const goal_model = realm.create(
        "GoalModel",
        {
          id: String(goal.id),
          category_id: String(goal.category),
          require_nutrition_plan:
            goal.require_nutrition_plan == "1" ? true : false,
          freedailyWorkout: goal.is_free_daily == "1" ? true : false,
          isOnPaidPlan: goal.is_paid == "1" ? true : false
        },
        true
      );

      // get the trainer if it exists
      if (user_goal_pt !== null) {
        let pt = user_goal_pt;
        let review = personal_trainer_review;
        if (review !== null) {
          review_rating = String(review.rating);
          review_id = String(review.id);
          review_comment = String(review.review);
        } else {
          review_id = null;
          review_rating = null;
          review_comment = null;
        }
        const personal_trainer = realm.create(
          "PersonalTrainerModel",
          {
            id: String(pt.id),
            firstName: pt.first_name,
            lastName: pt.last_name,
            picURL: pt.photo_url,
            ratingId: review_id,
            ratingStars: review_rating,
            ratingText: review_comment
          },
          true
        );

        goal_model.personlTrainer = personal_trainer;
      }

      // check if the user has a free daily workout available
      if (goal.free_daily == "1") goal_model.freedailyWorkout = true;

      user_model.goal = [];
      user_model.goal.push(goal_model);
    }

    // this is a very crucial line of code :P
    // adding the user object to store reducer
    getState().user = { user: user_model };

    success = true;
  });

  return success;
};

export const onGooglePress = () => {
  return dispatch => {};
};

export const gotoRegisterUser = () => {
  if (Platform.OS != "android")
    firebase.analytics().logEvent("LoginScreenRegisterBtnPressed");
  Mixpanel.track("LoginScreen_Register Btn Pressed");
  return {
    type: "goto_registration",
    payload: null
  };
};
