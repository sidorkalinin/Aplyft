// import data from './data.json';
import realm from '../../../../models';

const INITIAL_STATE = {
	data : null,
};

export default (state = INITIAL_STATE, action) => {

	switch(action.type) {

		case "goto_set_circuit_view":
		case "goto_time_circuit_view":
			// the payload.id is the move id
			let move = realm.objectForPrimaryKey('MoveModel', action.payload.id);
			return { ...state, data: move};

		default:
			return state;
	}

};