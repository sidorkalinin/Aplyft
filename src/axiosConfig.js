import axios from "axios";
import axiosCancel from "./axios-cancel";
import { IOS_SYMLINK, GOOGLE_PLAY_SYMLINK, APP_VERSION } from "./variables";
import realm from "./models";
import { Alert, Platform, Linking } from "react-native";
import store from "./store";
import { logOutAction } from "./components/views/ProfileSettings/actions";

// make a boolean to disable the multiple alert buttons
var isAlertDisplayed = false;

axiosCancel(axios, {
  debug: false // default
});

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    var token = "";
    try {
      var user = realm.objects("UserModel")[0];
      if (user) token = user.token;
    } catch (e) {
      console.log("could not get the user from realm");
    }

    // Do something before request is sent
    config.requestId = Math.random() * (5000 - 1000) + 1000; // random generated request IDs
    config.headers.authorization = "token " + token;
    console.log("axios before sending", config);
    return config;
  },
  function(error) {
    console.log("axios before sending error", error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    console.log("axios after response", response);
    //let parsed_response = JSONAPIParser(response);
    //console.log("parsed.....", parsed_response );

    return { ...response };
  },
  function(error) {
    console.log("axios after response error", error);
    // Do something with response error
    if (error.response)
      if (error.response.status) {
        switch (error.response.status) {
          // forbid the user from requesting or calling the server if the session returned a 401 status
          // thus force him to log out so he can create a new session
          case 401:
            axios.cancelAll();
            Alert.alert(
              "Session expired",
              "Your session is expired, please log in again",
              [
                {
                  text: "LOGIN",
                  onPress: () => {
                    logOutAction(store.dispatch);
                    isAlertDisplayed = false;
                  }
                }
              ],
              { cancelable: false }
            );
            return Promise.all(axios.all);

          // app needs update, we did the following here so we can cancel all requests and not display for the user multiple alerts while fetching requests
          case 501:
            axios.cancelAll();
            try {
              // if there is an updated version available on the stores, we need to force the user to update
              // so to keep track on which version he was using, once this code section is called we need to store the
              // current version so we can track it upon update.
              // once updated, this realm value will persist, thus it will survive the update
              realm.write(() => {
                update_value = realm.create(
                  "UserSettings",
                  {
                    key: "update_available",
                    date: moment().format("YYYY-MM-DD"),
                    value: APP_VERSION
                  },
                  true
                );
              });
            } catch (e) {
              console.log("could not get the user from realm");
            }
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
            return Promise.all(axios.all);

          default:
            break;
        }
      }

    return Promise.reject(error);
  }
);

export default axios;
