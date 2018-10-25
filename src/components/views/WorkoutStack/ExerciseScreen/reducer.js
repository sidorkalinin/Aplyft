// import data from './data.json';
import realm from "../../../../models";

const INITIAL_STATE = {
  data: null,
  showVariation: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "goto_exercise_view":
      let exerciseList = realm.objectForPrimaryKey(
        "MoveModel",
        action.payload.id
      );
      console.log("=========", Array.from(exerciseList.exercises[0].sets));

      return { ...state, data: exerciseList.exercises[0] };

    case "showing_var":
      return { ...state, showVariation: action.payload };

    default:
      return state;
  }
};
