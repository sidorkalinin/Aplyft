// importing the list of models
import UserModel from './models/UserModel';
import WorkoutModel from './models/WorkoutModel';
import NutritionModel from './models/NutritionModel';
import MealModel from './models/MealModel';
import GoalModel from './models/GoalModel';
import VideoModel from './models/VideoModel';
import PersonalTrainerModel from './models/PersonalTrainerModel';

const combinedModels = [
	UserModel,
	WorkoutModel,
	NutritionModel,
	MealModel,
	GoalModel,
	VideoModel,
	PersonalTrainerModel,
];

export default mapSchema = (jsonApiObject, type) => {

	for (var index in combinedModels) {
		var model = combinedModels[index];

		// skip if dont have the scehmas defined
		// prerequestits
		if (!model.JSONAPISchema) continue;
		if (!model.schema) continue;

		// console.log("mapschema----");
		// console.log(jsonApiObject);
		// console.log(model.JSONAPISchema);
		// console.log(model.schema);
		// console.log("----");

		if (model.JSONAPISchema.name == type) {
			var transformed_obj = {};
			// now we will loop and map the attributes supplied to the maped schema

			for ( var key in model.JSONAPISchema.properties) {
				var value = model.JSONAPISchema.properties[key];
				console.log("the value", value, key);

				transformed_obj[key] = jsonApiObject[value];

			}

			return transformed_obj; 
		}

	}

}