import data from './data.json';

const INITIAL_STATE = { 
    data : data
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {

        case "country_list_search":

            var tmp = [];
            if (action.payload.trim() == "")
                tmp = data.slice(); // copy
            else
                for (var i in data){
                    const row = data[i];
                    if(row.name.indexOf(action.payload.trim()) > -1)
                        tmp.push(row);
                }

            return { ...state, data: tmp};

        default :
            return state;

    }

};