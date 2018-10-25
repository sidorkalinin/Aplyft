// import data from './data.json';
import realm from "../../../../models";

const INITIAL_STATE = {
  data: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "goto_warmup_view":
      console.log("I am here in the warmup reducer >>>>>> ");
      let warmupList = realm
        .objects("WarmUpExerciseModel")
        .filtered("id == $0", action.payload.id);
      console.log("=========", warmupList[0]);

      return { ...state, data: warmupList[0] };

    default:
      return state;
  }
};
