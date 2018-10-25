export const gotoPersonalTrainerView = () => {

	// we will return a function so that redux-thuk will know that its an asynchronice request
	return dispatch => {
		dispatch({type : 'goto_personal_trainer'});
	};

};