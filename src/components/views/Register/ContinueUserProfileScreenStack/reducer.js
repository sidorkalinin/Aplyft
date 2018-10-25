import realm from "../../../../models";

const INITIAL_AUTH_STATE = {
  dob: new Date(),
  country: "",
  phone: "",
  activity_level: 0,
  preferedWorkoutDaysBitwise: 0,
  body_weight: 0,
  body_fat: 0,
  height: 0,
  injury: false,
  injury_text: "",
  fullname: "",
  imageurl: "",
  first_name: "",
  last_name: "",
  gender: "",
  dataArray: []
};

export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case "continueProfileLoaded":
      var userinfo = realm.objects("UserModel");
      var injury = userinfo[0].injury;
      var injuryText = userinfo[0].injuryText;
      var dob = userinfo[0].dateOfBirth;
      var body_fat = userinfo[0].bodyfat;
      var country = userinfo[0].injuryText;
      var phone = userinfo[0].phone;
      var activity_level = userinfo[0].activityLevel;
      var body_weight = userinfo[0].weight;
      var height = userinfo[0].height;
      var preferedWorkoutDaysBitwise = userinfo[0].preferedWorkoutDays;
      var fullname = userinfo[0].fullname;
      var imageurl = userinfo[0].imageURL;
      var first_name = userinfo[0].firstName;
      var last_name = userinfo[0].lastName;
      var gender = userinfo[0].gender;
      var injurySVG = userinfo[0].injurySVG;

      console.log(injurySVG, "INJURY<SVG");

      if (injurySVG == "" || injurySVG == null) {
        var injury_code_svg = [];
      } else {
        var injury_code_svg = injurySVG.split(",");
      }

      return {
        ...state,
        dob: dob,
        country: country,
        phone: phone,
        activity_level: activity_level,
        preferedWorkoutDaysBitwise: preferedWorkoutDaysBitwise,
        body_weight: body_weight,
        body_fat: body_fat,
        height: height,
        injury: injury,
        injury_text: injuryText,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        dataArray: injury_code_svg
      };

    case "change_injury":
      return { ...state, injury: action.payload };

    case "data_Array_Addition":
      return { ...state, dataArray: action.payload };

    case "change_dob":
      return { ...state, dob: action.payload };

    case "change_phone":
      return { ...state, phone: action.payload };

    case "change_body_weight":
      return { ...state, body_weight: action.payload };

    case "change_body_height":
      return { ...state, height: action.payload };

    case "change_injury_text":
      return { ...state, injury_text: action.payload };

    default:
      return state;
  }
};
