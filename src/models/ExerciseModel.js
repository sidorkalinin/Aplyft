import Realm from 'realm';

class ExerciseModel extends Realm.Object {}
ExerciseModel.schema = {
    name: 'ExerciseModel',
    primaryKey: 'id',
    properties: {
        id: {type: 'string' },
        title: {type: 'string', default: null},
        description: {type: 'string', default: null},
        edited : {type: 'bool', default: false },
        video_id : {type: 'string', default: '' },
        thumbnail_url : {type: 'string', default: '' },
        bitwise_logic : {type: 'int', default: 0},
        sets: {type: 'list', objectType: 'SetModel', default: []},
        // linked
        moves: {type: 'linkingObjects', objectType: 'MoveModel', property: 'exercises'}

    },
};

export default ExerciseModel;
