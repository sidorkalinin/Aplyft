// import data from "./data.json";
import realm from "../../../models";

const INITIAL_STATE = {
  dataSource: [],
  refreshing: false,
  isRemoving: false,
  userInfoText: '',
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "card_details_refresh":
      return {
        ...state,
        refreshing: action.payload
      };

    case "card_details_info_text":
      return {
        ...state,
        userInfoText: action.payload,
      };
      
    case "card_details_removing":
      return {
        ...state,
        isRemoving: action.payload
      };

    case "load_all_cards_realm":
      let allCards = realm.objects("CardInfoModel");
      return { ...state, dataSource: allCards };

    default:
      return state;
  }
};
