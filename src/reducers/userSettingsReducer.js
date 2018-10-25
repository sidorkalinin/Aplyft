import realm from "./../models";
import moment from "moment";
var today_date = moment().format("YYYY-MM-DD");
const INITIAL_STATE = {
  date: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "save_weight":
      realm.write(() => {
        // Create a ApiModel object
        realm.create("UserSettings", {
          key: "weight_value_date",
          date: today_date,
          value: today_date
        }, true);
      });

      return { ...state };

    default:
      return state;
  }
};
