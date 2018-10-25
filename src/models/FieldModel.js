import Realm from 'realm';

class FieldModel extends Realm.Object {}
FieldModel.schema = {
    name: 'FieldModel',
    primaryKey: 'id',
    properties: {
        id:{ type:'string' },
        value:{ type:'string',default: null, optional: true},
        title:{ type:'string',default: null, optional: true},

        // back linking
        goal: { type: 'linkingObjects', objectType: 'GoalModel', property: 'fields'},
    },
};

export default FieldModel;