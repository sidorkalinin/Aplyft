import Realm from 'realm';

class GoalModel extends Realm.Object {}
GoalModel.schema = {
    name: 'GoalModel',
    primaryKey: 'id',
    properties: {
        id: { type:'string' },
        category_id: { type:'string', default: '' },
		require_nutrition_plan: { type:'bool', default: false },
        freedailyWorkout: { type:'bool', default: false },
        isOnPaidPlan: { type:'bool', default: false },
        personlTrainer: { type: 'PersonalTrainerModel',  default: null},	
		fields: { type:'list', objectType:'FieldModel' , default: [] },
    },
};

export default GoalModel;
