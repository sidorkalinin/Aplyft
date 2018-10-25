import { StatusBar } from "react-native";
import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../appNavigator";

const INITIAL_STATE = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

export default (state = INITIAL_STATE, action) => {
  // console.log("navigation", state, action);
  let nextAction;
  StatusBar.setHidden(false);
  StatusBar.setNetworkActivityIndicatorVisible(false);
  StatusBar.setBarStyle("light-content");

  switch (action.type) {
    case "goto_loginview":
      console.log("login view");

      nextAction = NavigationActions.navigate({
        routeName: "Login",
        params: { ...action.payload }
      });
      break;

    case "goto_forgot_password":
      nextAction = NavigationActions.navigate({
        routeName: "ForgotPassword",
        params: { ...action.payload }
      });
      break;

    case "goto_registration":
      console.log("go to registration");
      nextAction = NavigationActions.navigate({
        routeName: "RegisterScene",
        params: { ...action.payload }
      });
      break;

    case "performance_type_pressed":
      console.log(
        "ACTION>PAYLOAD IN THE NavigationReducer is ##### ***** ±±±±± ###### : ",
        action.payload
      );
      nextAction = NavigationActions.navigate({
        routeName: "GraphScene",
        params: { ...action.payload }
      });
      break;

    case "GOT_TO_PERFORMANCE_UPDATE_WEIGHT":
      nextAction = NavigationActions.navigate({
        routeName: "GraphScene",
        params: { ...action.payload }
      });
      break;

    case "user_register_success":
      nextAction = NavigationActions.navigate({
        routeName: "RegisterConfirmationScene",
        params: { ...action.payload }
      });
      break;

    case "user_login_success":
      console.log("user login success");
      nextAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: "Main",
            params: { ...action.payload }
          })
        ]
      });
      break;

    case "user_logout":
      console.log("user login success");
      nextAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: "Login",
            params: { ...action.payload }
          })
        ]
      });

      break;

    case "switch_to_profile_tab":
      nextAction = NavigationActions.navigate({
        routeName: "ProfileStack",
        params: { ...action.payload }
      });
      break;

    case "switch_to_workout_tab":
      nextAction = NavigationActions.navigate({
        routeName: "MyTrainingStack",
        params: { ...action.payload }
      });
      break;

    case "goto_profileSetting":
      nextAction = NavigationActions.navigate({
        routeName: "ProfileSettings",
        params: { ...action.payload }
      });
      break;
    case "goto_AddMeal":
      nextAction = NavigationActions.navigate({
        routeName: "MealPage",
        params: { ...action.payload }
      });
      break;

    case "goto_chooseCalendar":
      console.log("I am where the CalenderList navigation");
      nextAction = NavigationActions.navigate({
        routeName: "CalendarList",
        params: { ...action.payload }
      });
      break;

    case "goto_profile_edit":
      nextAction = NavigationActions.navigate({
        routeName: "ProfileEdit",
        params: { ...action.payload }
      });
      break;

    case "goto_country_list":
      nextAction = NavigationActions.navigate({
        routeName: "CountryList",
        params: { ...action.payload }
      });
      break;

    case "goto_change_password":
      nextAction = NavigationActions.navigate({
        routeName: "ChangePassword",
        params: { ...action.payload }
      });
      break;

    case "goto_set_goal":
      nextAction = NavigationActions.navigate({
        routeName: "UserGoal",
        params: { ...action.payload }
      });
      break;
    case "back_from_setGoal":
      nextAction = NavigationActions.back();
      break;

    case "go_back_from_CalenderSync":
      nextAction = NavigationActions.back();
      break;

    case "goto_goal_sportsspecific":
      console.log("sports");
      nextAction = NavigationActions.navigate({
        routeName: "SportsSpecificGoal",
        params: { ...action.payload }
      });
      break;

    case "goto_goal_bodybuilding":
      nextAction = NavigationActions.navigate({
        routeName: "BodybuildingGoal",
        params: { ...action.payload }
      });
      break;

    case "goto_goal_crosslyft":
      nextAction = NavigationActions.navigate({
        routeName: "CrossLyft",
        params: { ...action.payload }
      });
      break;

    case "goto_goal_powerlyfting":
      nextAction = NavigationActions.navigate({
        routeName: "PowerLyfting",
        params: { ...action.payload }
      });
      break;

    case "user_set_goal_success":
      console.log("success set goal");
      nextAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: "Main",
            params: { ...action.payload }
          })
        ]
      });
      break;

    case "user_calendar_press":
      nextAction = NavigationActions.navigate({
        routeName: "Calendar",
        params: { ...action.payload }
      });
      break;

    case "user_calendar_add":
      nextAction = NavigationActions.navigate({
        routeName: "Login",
        params: { ...action.payload }
      });
      break;

    case "goto_chatview":
      nextAction = NavigationActions.navigate({
        routeName: "ChatIM",
        params: { ...action.payload }
      });
      break;

    case "goto_personal_trainer":
      nextAction = NavigationActions.navigate({
        routeName: "PersonalTrainer",
        params: { ...action.payload }
      });
      break;

    case "goto_stripeview":
      console.log("stripe payment view");

      nextAction = NavigationActions.navigate({
        routeName: "StripePayment",
        params: { ...action.payload }
      });
      break;

    case "goto_payment":
      nextAction = NavigationActions.navigate({
        routeName: "PaymentView",
        params: { ...action.payload }
      });
      break;

    case "goto_workout_listview":
      nextAction = NavigationActions.navigate({
        routeName: "WorkoutStack",
        params: { ...action.payload }
      });
      break;

    case "goto_exercise_view":
      nextAction = NavigationActions.navigate({
        routeName: "WorkoutStack",
        params: { ...action.payload },
        action: NavigationActions.navigate({
          routeName: "Exercise",
          params: { ...action.payload }
        })
      });
      break;
    case "goto_warmup_view":
      nextAction = NavigationActions.navigate({
        routeName: "WorkoutStack",
        params: { ...action.payload },
        action: NavigationActions.navigate({
          routeName: "WarmUp",
          params: { ...action.payload }
        })
      });
      break;

    case "goto_time_circuit_view":
      nextAction = NavigationActions.navigate({
        routeName: "WorkoutStack",
        params: { ...action.payload },
        action: NavigationActions.navigate({
          routeName: "TimeCircuit",
          params: { ...action.payload }
        })
      });
      break;

    case "goto_set_circuit_view":
      nextAction = NavigationActions.navigate({
        routeName: "WorkoutStack",
        params: { ...action.payload },
        action: NavigationActions.navigate({
          routeName: "SetsCircuit",
          params: { ...action.payload }
        })
      });
      break;

    case "goto_videodetail_view":
      nextAction = NavigationActions.navigate({
        routeName: "VideoDetail",
        params: { ...action.payload }
      });
      break;

    case "goto_complete_profile":
      nextAction = NavigationActions.navigate({
        routeName: "CompleteProfileStack",
        params: { ...action.payload }
      });
      break;

    case "goto_complete_profile_congrats":
      nextAction = NavigationActions.navigate({
        routeName: "UserProfileCongratulations",
        params: { ...action.payload }
      });
      break;

    case "goto_support_view":
      nextAction = NavigationActions.navigate({
        routeName: "Support",
        params: { ...action.payload }
      });
      break;

    case "complete_profile_congrats_dismiss":
      nextAction = NavigationActions.goBack(null);
      break;

    case "viewmore_pressed":
      nextAction = NavigationActions.navigate({
        routeName: "PerformanceScene",
        params: { ...action.payload }
      });
      break;

    case "change_option_Pressed":
      console.log(
        "ACTION>PAYLOAD IN THE NavigationReducer is ##### ***** ±±±±± ###### : ",
        action.payload
      );
      nextAction = NavigationActions.navigate({
        routeName: "SelectOptionScene",
        params: { ...action.payload }
      });
      break;

    case "go-back":
      // nextAction = NavigationActions.navigate({
      //   routeName: "PerformanceScene"
      // });
      nextAction = NavigationActions.back();
      break;

    case "open-camera":
      nextAction = NavigationActions.navigate({
        routeName: "OpenCameraView",
        params: { ...action.payload }
      });
      break;

    case "goto-tutorial":
      nextAction = NavigationActions.navigate({
        routeName: "OpenTutorialView",
        params: { ...action.payload }
      });
      break;

    case "goto_units_view":
      nextAction = NavigationActions.navigate({
        routeName: "UnitsView",
        params: { ...action.payload }
      });
      break;

    case "goto_payment_history":
      nextAction = NavigationActions.navigate({
        routeName: "PaymentHistroyView",
        params: { ...action.payload }
      });
      break;

    case "goto_personal_trainer_agreement":
      nextAction = NavigationActions.navigate({
        routeName: "PersonalTrainerAgreement",
        params: { ...action.payload }
      });
      break;

    case "country_list_select":
      nextAction = NavigationActions.back();
      break;

    case "go_to_the_previous_page":
      nextAction = NavigationActions.back();
      break;

    case "goto_progress_gallery":
      nextAction = NavigationActions.navigate({
        routeName: "ProgressGallery",
        params: { ...action.payload }
      });
      break;

    case "goto_card_details": 
      nextAction = NavigationActions.navigate({
        routeName: "CardDetails",
        params: { ...action.payload }
      });
      break;

  }

  // dispatch the navigator and make a screen transition
  const nextState = AppNavigator.router.getStateForAction(
    nextAction || action,
    state
  );

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
