import Realm from "realm";

// importing the list of models
import UserModel from "./UserModel";
import NutritionModel from "./NutritionModel";
import GoalModel from "./GoalModel";
import VideoModel from "./VideoModel";
import PersonalTrainerModel from "./PersonalTrainerModel";
import WorkoutModel from "./WorkoutModel";
import MoveModel from "./MoveModel";
import ExerciseModel from "./ExerciseModel";
import SetModel from "./SetModel";
import SetModelRound from "./SetModelRound";
import FieldModel from "./FieldModel";
import PaymentModel from "./PaymentModel";
import ChatContactsModel from "./ChatContactsModel";
import ChatMessageModel from "./ChatMessageModel";
import PerformanceModel from "./PerformanceModel";
import PerformanceDataModel from "./PerformanceDataModel";
import PerformanceSearchListModel from "./PerformanceSearchListModel";
import SuggestTrainerModel from "./SuggestTrainerModel";
import DailyNutritionModel from "./DailyNutritionModel";
import ProgressGalleryModel from "./ProgressGalleryModel";
import WarmUpExerciseModel from "./WarmUpExerciseModel";
import WarmUpModel from "./WarmUpModel";
import WarmUpSetModel from "./WarmUpSetModel";
import PricingPlanModel from "./PricingPlanModel";
import UserSettings from "./UserSettings";
import CardInfoModel from "./CardInfoModel";
import TrainersReviewModel from "./TrainersReviewModel";

// defineing the database structure
let realm = new Realm({
  schemaVersion: 45,
  schema: [
    UserModel,
    CardInfoModel,
    NutritionModel,
    GoalModel,
    VideoModel,
    PersonalTrainerModel,
    WorkoutModel,
    MoveModel,
    ExerciseModel,
    SetModel,
    SetModelRound,
    FieldModel,
    UserSettings,
    PaymentModel,
    ChatContactsModel,
    ChatMessageModel,
    SuggestTrainerModel,
    TrainersReviewModel,
    PerformanceModel,
    PerformanceDataModel,
    PerformanceSearchListModel,
    DailyNutritionModel,
    ProgressGalleryModel,
    WarmUpExerciseModel,
    WarmUpModel,
    WarmUpSetModel,
    PricingPlanModel
  ],
  migration: (oldRealm, newRealm) => {
    // only apply this change if upgrading to schemaVersion 2
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects("UserModel");
      const newObjects = newRealm.objects("UserModel");
      // adding the units variable to the User Model
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].units = "metric";
      }
    }
  }
});

// displaying the path of the realm file database
console.log("Realm Path: ", realm.path);

export default realm;
