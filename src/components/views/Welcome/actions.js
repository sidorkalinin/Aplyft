
export const gotoLoginView = () => {

	// we will return a function so that redux-thuk will know that its an asynchronice request
	return {
		type : 'goto_loginview'
	};
};

export const gotoRegisterView = () => {
	return {
		type : 'goto_registration' 
	};
};