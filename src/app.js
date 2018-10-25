import React, { Component } from "react";
import {
  AppState,
  StatusBar,
  Platform,
  PushNotificationIOS
} from "react-native";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from 'redux';

// importing the list of used screens
// import AppReducer from './reducers';
import AppWithNavigationState from "./appNavigator";
// import thunk from 'redux-thunk';
// import realm from './models';
import PushNotification from "react-native-push-notification";
import axios from "./axiosConfig";
import store from "./store";
import { REGISTER_PN, MIXPANEL_TOKEN } from "./variables";
import SendBird from "sendbird";
import Mixpanel from "react-native-mixpanel";

class App extends Component {
  // store cration for the memoery database
  // the second argument is for initial state
  // the third argument is a store enhancer because its adding new function to the store
  // store = createStore(AppReducer, {}, applyMiddleware(thunk));
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    // register for app background state
    AppState.addEventListener("change", this._handleAppStateChange);
    //Init Mixpanel SDK with your project token
    Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);
    // reset badge number
    PushNotification.setApplicationIconBadgeNumber(0);
    // ios only
    // PushNotification.getApplicationIconBadgeNumber((number)=>console.log("its", number))
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN:", token);

        // update send bird token
        // the logic here in the chat system we will request push notification permission
        // once we get it we will update sendbird if there is an object
        const sb = SendBird.getInstance();
        if (sb) {
          console.log("updating sendbird token");
          if (Platform.OS === "ios") {
            sb.registerAPNSPushTokenForCurrentUser(
              token.token,
              (result, error) => {
                if (error) {
                  console.log("error registering push notification ios", error);
                }
              }
            );
          } else {
            sb.registerGCMPushTokenForCurrentUser(
              token.token,
              (result, error) => {
                if (error) {
                  console.log("error registering push notification");
                }
              }
            );
          }
        }

        if (Platform.OS === "ios") {
          Mixpanel.addPushDeviceToken(token.token);
        } else {
          Mixpanel.setPushRegistrationId(token.token);
        }

        // store.dispatch({ type: "chat_notification_update", payload: store.getState().user.notifications +1 });

        axios
          .post(REGISTER_PN(store.getState().user.user.id), {
            app_key:
              Platform.OS === "ios" ? "live_app_ios" : "live_app_android",
            token: token.token,
            platform: Platform.OS
          })
					.then (function(response){
						console.log("Push notificatin registration successfull");
            
					})
					.catch (function(error) {
						console.log("Push notification registration error", error);
					});


		    },

		    // (required) Called when a remote or local notification is opened or received
		    onNotification: function(notification) {
		        console.log( 'RN NOTIFICATION:', notification );
                /*PushNotification.localNotification({
                    title: "My Notification Title",
                    message: "My Notification Message"
                });*/
            // store.dispatch({ type: "chat_notification_update", payload: store.getState().user.notifications +1 });
		      
            if(Platform.OS == "ios")
              notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

		    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
		    senderID: "359816223136",

		    // IOS ONLY (optional): default: all - Permissions to register.
		    permissions: {
		        alert: true,
		        badge: true,
		        sound: true
		    },

		    // Should the initial notification be popped automatically
		    // default: true
		    popInitialNotification: true,

		    /**
		      * (optional) default: true
		      * - Specified if permissions (ios) and token (android and ios) will requested or not,
		      * - if not, you must call PushNotificationsHandler.requestPermissions() later
		      */
        requestPermissions: false,
    });
  }

  componentWillUnmount() {
    console.log(">>>>app is closed<<<<");
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      // PushNotification.cancelAllLocalNotifications();

      //set Sendbird state
      const sb = SendBird.getInstance();
      sb.setForegroundState();
    }
    if (this.state.appState.match(/active/) && nextAppState === "inactive") {
      console.log("app is going to close maybe!!! help!!!!!");

      const sb = SendBird.getInstance();
      sb.setBackgroundState();
      // register for a local push
      //   	PushNotification.localNotificationSchedule({
      //     date: new Date(Date.now() + (5 * 1000)), // in 60 secs
      //     /* iOS and Android properties */
      //     title: "CHAMP!", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      //     message: "APLYFT MISSES YOU", // (required)
      //     // playSound: false, // (optional) default: true
      //     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //     number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      //     // repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      //     actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
      // });
    }

    this.setState({ appState: nextAppState });
  };

  // rendering the main page view
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
