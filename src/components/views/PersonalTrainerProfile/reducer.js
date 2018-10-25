import realm from "../../../models";

const INITIAL_STATE = {
  personalinfo: "",
  personal_trainer_age: "",
  chosen: "",
  personal_trainer_bio: "",
  personal_trainer_certification: "",
  personal_trainer_languages: "",
  personal_trainer_areaofexpertise: "",
  personal_trainer_video_url: "",
  planningList: [],
  reviews_data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "user_logout":
      return {
        ...state,
        planningList: [],
        personalinfo: "",
        personal_trainer_age: "",
        personal_trainer_bio: "",
        personal_trainer_certification: "",
        personal_trainer_languages: "",
        personal_trainer_areaofexpertise: "",
        personal_trainer_video_url: "",
        chosen: "",
        reviews_data: []
      };

    case "get_personal_trainer_info":
      let personaltrianer = realm
        .objects("PersonalTrainerModel")
        .filtered("id = $0 ", action.payload)[0];
      let trianer_review = realm
        .objects("SuggestTrainerModel")
        .filtered("id = $0 ", action.payload)[0];

      return {
        ...state,
        reviews_data: trianer_review.reviews,
        personalinfo: personaltrianer,
        personal_trainer_age: "29",
        personal_trainer_bio: personaltrianer.bio,
        personal_trainer_certification: personaltrianer.certifications,
        personal_trainer_languages: personaltrianer.languages,
        personal_trainer_areaofexpertise: personaltrianer.areaOfExpertise,
        planningList: personaltrianer.pricingplans,
        personal_trainer_video_url: personaltrianer.video_url,
        chosen: personaltrianer.chosen
      };

    default:
      return state;
  }
};
