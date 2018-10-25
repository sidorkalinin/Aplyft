import realm from '../../../models';

export const save = () => {

	return {
		type : 'save'
	};
};

export const changeUnit = (payload) => {
	
	return (dispatch, getState) => {

		realm.write(()=>{
			getState().user.user.units = payload;
		});

		dispatch ({
			type: 'reload_user_from_realm'
		});
	}
};