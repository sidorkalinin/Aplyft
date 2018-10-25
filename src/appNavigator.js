import React, { Component } from "react";
import { View, Text, BackHandler } from "react-native";
import { connect } from "react-redux";
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import { 
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import {
  tabBackgroundColor,
  tabBarIconActiveColor,
  tabBarIconInactiveColor
} from "./components/styles/theme";
import realm from "./models";

//3rd party integration
import { AccessToken } from "react-native-fbsdk";

// getting the list of screens
import WelcomeScreen from "./components/views/Welcome";
import LoginScreen from "./components/views/Login";
import ForgotPassword from "./components/views/Login/ForgotPassword";
import RegisterScreen from "./components/views/Register";
import RegisterConfirmationScreen from "./components/views/Register/ConfirmationScreen";
import ProfileScreen from "./components/views/Tabs/Profile";
import SettingsScreen from "./components/views/ProfileSettings";
import CalendarList from "./components/views/ProfileSettings/components/CalendarList";
import ProfileEdit from "./components/views/ProfileEdit";
import CardDetails from "./components/views/CardDetails";
import ChangePassword from "./components/views/ChangePassword";
import CalendarScreen from "./components/views/calendarScreen";
import CalendarDetail from "./components/views/calendarDetail";
import SupportScreen from "./components/views/Support";
import PersonalTrainerAgreement from "./components/views/PersonalTrainerAgreement";

//utilities
import OpenCamera from "./components/views/OpenCameraView";
import Tutorial from "./components/views/Tutorial";
import Units from "./components/views/Units";
import PaymentHistroy from "./components/views/PaymentHistory";
import Payment from "./components/views/Payment";

//goal
import SetGoalInitialScreen from "./components/views/GoalStack/setGoalInitialScreen";
import SportsSpecificScreen from "./components/views/GoalStack/SportsSpecific";
import BodybuildingScreen from "./components/views/GoalStack/Bodybuilding";
import CrossLyftScreen from "./components/views/GoalStack/CrossLyft";
import PowerLyftingScreen from "./components/views/GoalStack/PowerLyfting";

// profile completetion
import ContinueUserProfileScreenStack from "./components/views/Register/ContinueUserProfileScreenStack";
import UserProfileCongratulationsScreen from "./components/views/Register/UserProfileCongratulations";

//workout
import ExerciseScreen from "./components/views/WorkoutStack/ExerciseScreen";
import WarmupScreen from "./components/views/WorkoutStack/WarmUpScreen";
import TimeBasedCircuitScreen from "./components/views/WorkoutStack/TimeBasedCircuitScreen";
import SetBasedCircuitScreen from "./components/views/WorkoutStack/SetBasedCircuitScreen";

// tabs
import SearchScreen from "./components/views/Tabs/Search";
import VideoGlossaryScreen from "./components/views/Tabs/Video/VideoList";
import VideoDetailScreen from "./components/views/Tabs/Video/VideoDetail";
import PerformancePage from "./components/views/Tabs/Performance/PerformancePage";
import SelectOptionPage from "./components/views/Tabs/Performance/components/SelectOptionPage";
import MyTrainingScreen from "./components/views/Tabs/Training";
import MyTrainingDailyViewScreen from "./components/views/Tabs/Training/DailyView";
import ChatIMTabScreen from "./components/views/Tabs/Chat/ChatList";
import ChatIMScreen from "./components/views/Tabs/Chat/ChatDetail";
import PersonalTrainerProfileScreen from "./components/views/PersonalTrainerProfile";
import NewCardPage from "./components/views/NewCardPage";
import CountryList from "./components/views/ProfileEdit/CountryList";
// import PerformancePage from "./components/views/PerformancePage/PerformancePage";
// import GraphPage from "./components/views/PerformancePage/components/GraphPage";
import ProgressGalleryPage from "./components/views/ProgressGalleryView";
import MealNutritionPage from "./components/views/Tabs/Training/DailyView/DailyNutritionScreen/components/MealNutritionPage";

import ImageHeader from "./components/ImageHeader";

export const profileStackNav = StackNavigator(
  {
    Profile: { screen: ProfileScreen }
  },
  {
    headerMode: "none"
  }
);

export const workoutStackNav = StackNavigator(
  {
    WorkoutList: { screen: MyTrainingDailyViewScreen },
    Exercise: { screen: ExerciseScreen },
    WarmUp: { screen: WarmupScreen },
    TimeCircuit: { screen: TimeBasedCircuitScreen },
    SetsCircuit: { screen: SetBasedCircuitScreen }
  },
  {
    headerMode: "none"
  }
  );
  export const PerformanceStack = StackNavigator(
    {
      Performance: { screen: PerformancePage },
      // SelectOptionScene: { screen: SelectOptionPage }
    },
    {
      headerMode: "none"
    }
  );

export const AppTabNavigator = TabNavigator(
  {
    SearchStack: { screen: SearchScreen },
    // VideoGlossaryStack: { screen: VideoGlossaryScreen },
    PerformanceStack: { screen: PerformanceStack },
    MyTrainingStack: { screen: MyTrainingScreen },
    ChatIMStack: { screen: ChatIMTabScreen },
    ProfileStack: { screen: profileStackNav }
  },
  {
    initialRouteName: "MyTrainingStack",
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      activeTintColor: tabBarIconActiveColor,
      inactiveTintColor: tabBarIconInactiveColor,
      showLabel: false,
      style: {
        backgroundColor: tabBackgroundColor,
        borderTopWidth: 1,
        borderTopColor: "#eeeeee"
      },
      iconStyle: {
        width: 47,
        height: 47
      },
      indicatorStyle: {
        backgroundColor: "#181f31"
      }
      // header : ImageHeader
    }
  }
);

export const GoalStack = StackNavigator(
  {
    InitialGoal: { screen: SetGoalInitialScreen },
    SportsSpecificGoal: { screen: SportsSpecificScreen },
    BodybuildingGoal: { screen: BodybuildingScreen },
    CrossLyft: { screen: CrossLyftScreen },
    PowerLyfting: { screen: PowerLyftingScreen }
  },
  {
    headerMode: "none"
  }
);

export const SettingsStack = StackNavigator(
  {
    ProfileSettingsInit: { screen: SettingsScreen },
    ProfileEdit: { screen: ProfileEdit },
    UnitsView: { screen: Units },
    PaymentHistroyView: { screen: PaymentHistroy },
    ChangePassword: { screen: ChangePassword },
    Support: { screen: SupportScreen },
    CountryList: { screen: CountryList },
    CalendarList: { screen: CalendarList },
    CardDetails: { screen: CardDetails }
  },
  {
    headerMode: "none"
  }
);


export const mainNavigator = StackNavigator(
  {
    MainTab: { screen: AppTabNavigator },
    Calendar: { screen: CalendarScreen }, // stack the main tab view
    ChatIM: { screen: ChatIMScreen },
    PersonalTrainer: { screen: PersonalTrainerProfileScreen },
    WorkoutStack: { screen: workoutStackNav },
    ProfileSettings: { screen: SettingsStack },
    // PerformanceScene: { screen: PerformancePage },
    ProgressGallery: { screen: ProgressGalleryPage },
    SelectOptionScene: { screen: SelectOptionPage },
    PersonalTrainerAgreement: { screen: PersonalTrainerAgreement },
    VideoDetail: { screen: VideoDetailScreen }
  },
  // common styling for all the header inside the stack
  {
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#181f30",
        color: "#ffffff",
        headerTintColor: "white"
      }
    }
  }
);

export const LoginStack = StackNavigator(
  {
    LoginScene: { screen: LoginScreen, key: "main0" },
    RegisterScene: { screen: RegisterScreen },
    ForgotPassword: { screen: ForgotPassword },
    RegisterConfirmationScene: { screen: RegisterConfirmationScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "white",
        color: "black"
      }
    }
  }
);

// application login Logic
const ifUserSignedIn = () => {
  console.log("checking if the user is logged?");
  if (realm.objects("UserModel").length > 0) {
    console.log("yes he is logged in");
    return true;
  } else {
    console.log("no he isnt logged in");
    return false;
  }

  // console.log(AccessToken)
  // AccessToken.getCurrentAccessToken().then(
  //     (data) => {
  //         if(data) {
  //             console.log("the user is signed in to FB");
  //             return true;
  //         }
  //     }
  // );

  return false;
};

export const ContinueUserProfileStack = StackNavigator(
  {
    CompleteProfile: { screen: ContinueUserProfileScreenStack },
    UserProfileCongratulations: { screen: UserProfileCongratulationsScreen }
  },
  {
    headerMode: "none"
  }
);
export const MealNutritionStack = StackNavigator(
  {
    MealPageScene: { screen: MealNutritionPage }
  },
  {
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#181f30",
        color: "#ffffff",
        headerTintColor: "white"
      }
    }
  }
);

// all the modal thing workaround
export const AppNavigator = StackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Login: { screen: LoginStack },
    Main: { screen: mainNavigator },
    StripePayment: { screen: NewCardPage },
    UserGoal: { screen: GoalStack },
    CompleteProfileStack: { screen: ContinueUserProfileStack },
    OpenCameraView: { screen: OpenCamera },
    OpenTutorialView: { screen: Tutorial },
    PaymentView: { screen: Payment },
    MealPage: { screen: MealNutritionStack }
  },
  // common styling for all the header inside the stack
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: "white",
        color: "black"
      }
    },
    initialRouteName: ifUserSignedIn() ? "Main" : "Welcome"
  }
);

class AppWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index > 0) {
      return false;
    }
    dispatch({ type: "go-back" });
    return true;
  };
  render() {
    const { dispatch, nav } = this.props;
    const NavMiddleware = createReactNavigationReduxMiddleware(
      "root",
      state => state.nav,
    )
    const addListener = createReduxBoundAddListener("root");
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
