import { combineReducers } from "redux";

import AuthReducer from "../components/views/Login/reducer";
import NavigationReducer from "./navigationReducer";
import userSettingsReducer from "./userSettingsReducer";

import DailyTrainingListReducer from "../components/views/Tabs/Training/DailyView/DailyTrainingScreen/reducer";
import DailyNutritionListReducer from "../components/views/Tabs/Training/DailyView/DailyNutritionScreen/reducer";
import MealNutritionPage from "../components/views/Tabs/Training/DailyView/DailyNutritionScreen/components/MealNutritionPage/reducer";
import MonthlyViewReducer from "../components/views/Tabs/Training/MonthlyView/reducer";
import ChatListReducer from "../components/views/Tabs/Chat/ChatList/reducer";
import ChatDetailReducer from "../components/views/Tabs/Chat/ChatDetail/reducer";
import SearchListReducer from "../components/views/Tabs/Search/reducer";
import VideListReducer from "../components/views/Tabs/Video/VideoList/reducer";
import SetGoalReducer from "../components/views/GoalStack/reducer";
import UserReducer from "./userReducer";
import Registration from "../components/views/Register/reducer";
import SetCurrentExercise from "../components/views/WorkoutStack/ExerciseScreen/reducer";
import WarmUpReducer from "../components/views/WorkoutStack/WarmUpScreen/WarmUpReducer";
import SetCurrentCircuit from "../components/views/WorkoutStack/TimeBasedCircuitScreen/reducer";
import ContinueProfile from "../components/views/Register/ContinueUserProfileScreenStack/reducer";
import ProfileEdit from "../components/views/ProfileEdit/reducer";
import ProfileSettingsReducer from "../components/views/ProfileSettings/ProfileSettingsReducer";
import ProfileReducer from "../components/views/Tabs/Profile/reducer";
import CameraView from "../components/views/OpenCameraView/reducer";
import ChangePassword from "../components/views/ChangePassword/reducer";
import CountryListReducer from "../components/views/ProfileEdit/CountryList/reducer";
import TrainingTabReducer from "../components/views/Tabs/Training/reducer";
// import PerformanceReducer from "../components/views/PerformancePage/PerformanceReducer";
// import GraphPageReducer from "../components/views/PerformancePage/components/GraphPageReducer";
import PerformanceReducer from "../components/views/Tabs/Performance/PerformanceReducer";
import SelectOptionPageReducer from "../components/views/Tabs/Performance/components/SelectOptionPageReducer";
import PersonalTrainerReducer from "../components/views/PersonalTrainerProfile/reducer";
import PaymentReducer from "../components/views/Payment/reducer";
import PaymentHistoryReducer from "../components/views/PaymentHistory/reducer";
import PaymentAgreementReducer from "../components/views/PersonalTrainerAgreement/reducer";
import ProgressGalleryPhotoReducer from "../components/views/ProgressGalleryView/ProgressPhotoListView/reducer";
import ProgressGalleryVideoReducer from "../components/views/ProgressGalleryView/ProgressVideoListView/reducer";
import ProgressGalleryReducer from "../components/views/ProgressGalleryView/reducer";
import CardDetailsReducer from "../components/views/CardDetails/reducer";

// this is the memory state Database of our app,
// on each run this will get re-generated and all none persisted data will be lost
const AppReducer = combineReducers({
  nav: NavigationReducer /* preloadedState, */,
  auth: AuthReducer,

  usersettingsred: userSettingsReducer,

  register: Registration,
  continueProfile: ContinueProfile,

  dailyTrainingList: DailyTrainingListReducer,
  dailyNutritionList: DailyNutritionListReducer,
  mealred: MealNutritionPage,
  monthlyViewReducer: MonthlyViewReducer,
  chatList: ChatListReducer,
  chatDetail: ChatDetailReducer,
  SearchList: SearchListReducer,
  VideoList: VideListReducer,
  setGoal: SetGoalReducer,
  trainingTab: TrainingTabReducer,
  graphpagered: PerformanceReducer,
  // graphpagered: GraphPageReducer,
  performancered: SelectOptionPageReducer,
  personalTrainer: PersonalTrainerReducer,

  currentExercise: SetCurrentExercise, // this is used to load the selected exercise
  currentCircuit: SetCurrentCircuit, // this is used to load the selected circuit
  cardDetailReducer: CardDetailsReducer,
  profileEdit: ProfileEdit,
  profileSettingsred: ProfileSettingsReducer,
  CameraView: CameraView,
  ChangePasswordView: ChangePassword,
  paymentReducer: PaymentReducer,
  paymentHistoryReducer: PaymentHistoryReducer,
  paymentAgreementReducer: PaymentAgreementReducer,
  // global user object to load and use inside all the app
  user: UserReducer,
  profile: ProfileReducer,
  countryListReducer: CountryListReducer,

  progressGallerPhotoReducer: ProgressGalleryPhotoReducer,
  progressGalleryVideoReducer: ProgressGalleryVideoReducer,
  progressGallerReducer: ProgressGalleryReducer,

  warmupred: WarmUpReducer
});

export default AppReducer;
