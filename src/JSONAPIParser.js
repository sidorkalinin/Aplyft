export default JSONAPIParser = (response) => {

    // helpers
    var ParseSingleObjectFromArray = (obj, ar) => {
        var fomatted_object = {};

        for (var index in ar) {
            var ar_obj = ar[index];

            if ( ar_obj.type == obj.type && ar_obj.id == obj.id ){
                // concatinate into a one level object
                return { ...ar_obj.attributes, id : ar_obj.id };
            }
        }
    }

    var ParseMultipleObjectsFromArray = (multipleObj , ar) => {
        return multipleObj.map(item => ParseSingleObjectFromArray(item, ar));
    }

    // end helpers

    // Do something with response before passing it
    // we will parse the data
    var response_data = response.data;
    var data = response_data.data;
    var included = response_data.included;
    var final_object = [];

    for (var data_index in data) {
        
        var data_row = data[data_index];
        var data_attributes = data_row.attributes;
        var data_relationships = data_row.relationships;

        //we need to concatinate and create a new object of a specific given type
        var fomatted_object = { ...data_attributes, id: data_row.id };
        
        // loop in the relationships and add them
        for (var relationship_index in data_relationships) {
            var relationship_object = data_relationships[relationship_index];

            // we need to check the data in each relationship so if its an array we will create an array
            // so we will check the first key inside the object .data 
            var relationship_object_data = relationship_object[Object.keys(relationship_object)[0]];

            if (relationship_object_data instanceof Array ) {
                for (var relationships_index in relationship_object_data) {
                    var tmp = relationship_object_data[relationships_index];
                    
                    fomatted_object = { ...fomatted_object, [tmp.type] : [ ParseSingleObjectFromArray (tmp, included)] }

                }

            } else {

                //now we will loop on each included and add it
                fomatted_object = { ...fomatted_object, [relationship_object_data.type] : ParseSingleObjectFromArray (relationship_object_data, included) }
            }

        }

        // after all the parsing just add it to the main object
        final_object = [ ...final_object, fomatted_object ];
    }

    return final_object;
}