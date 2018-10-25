import realm from '../../../../models';

// this function is specific only to the set based circuit
export const updateInRealm = (payload) => {

	var calculated_primary_key = String(payload.setId) + String(payload.round); //. i.e. 10


	realm.write( () => {

		var set = realm.objectForPrimaryKey('SetModel', String(payload.setId));
		
		//construct the model to be inserted into realm
		var round_model = {

			compounded_primary_key : calculated_primary_key,
			id : String(payload.setId),
			round : payload.round,
			accomplished_repetitions : String(payload.accomplished_repetitions) || "0",
			accomplished_time : String(payload.accomplished_time) || "0",
			accomplished_distance : String(payload.accomplished_distance) || "0",
			accomplished_weight : String(payload.accomplished_weight) || "0",
			accomplished_reps_left : String(payload.accomplished_reps_left) || "0",
		};


		// check if the set model round is already in realm 
		try {

			// if its there we need to update it
			var round = realm.objectForPrimaryKey('SetModelRound', String(calculated_primary_key));
			
			round.accomplished_repetitions = round_model.accomplished_repetitions;
			round.accomplished_time = round_model.accomplished_time;
			round.accomplished_distance = round_model.accomplished_distance;
			round.accomplished_weight = round_model.accomplished_weight;
			round.accomplished_reps_left = round_model.accomplished_reps_left;


		} catch (e) {
			// if its not there add it to the set model it will be create automatically
			set.rounds.push(round_model);

		}

			
	});

	return {
		type: 'set_circuit_update_in_realm_success'
	};

};