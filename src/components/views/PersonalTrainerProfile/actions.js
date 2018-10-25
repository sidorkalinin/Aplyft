export const getPersonalTrainerInfo = trainerId => {
  return {
    type: "get_personal_trainer_info",
    payload: trainerId
  };
};
