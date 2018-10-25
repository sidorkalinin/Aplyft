import Realm from 'realm';

class BaseModel extends Realm.Object {

	hydrate (json_string) {
		console.log("hydrating", this);
	};
	
}

BaseModel.JSONAPISchema = {}; // will be extended

export default BaseModel;