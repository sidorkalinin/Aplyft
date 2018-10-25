import realm from '../../../../models';

export const gotoSubmitView = (payload) => {
	return {
		type: 'goto_time_circuit_submit_view',
		payload: payload
	}
}

export const updateTimerCircuitInRealm = (payload) => {

	realm.write(()=>{
		var set = realm.objectForPrimaryKey('MoveModel', payload.id);
		set.accomplished_repetitions = payload.number;
	});

	// not subscribed in any reducers
	return {
		type: 'time_circuit_realm_save_on_update'
	}


};