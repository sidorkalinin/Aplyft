import realm from "../../../../models";

export const gotoVideoDetail = payload => {
  console.log(
    "I am in the action of the video in WorkoutStack/ExerciseSetScreen/actions and payload is : ",
    payload
  );
  // first check if we have the video id in our Database
  let obj = realm.objectForPrimaryKey("VideoModel", payload);
  console.log("obj in the got to videoDetail is :  ", obj);
  if (obj != undefined)
    return {
      type: "goto_videodetail_view",
      payload: { id: payload }
    };

  return {
    type: "bla bla"
  };
};

export const updateSetInRealm = payload => {
  // console.log("trying to SetModel i realm", {...payload} );
  return (dispatch, getState) => {
    var isMetric = getState().user.user.units == "metric" ? true : false;

    realm.write(() => {
      var set = realm.objectForPrimaryKey("SetModel", payload.id);
      // console.log ("getting set Model from realm ", {...set});

      for (var index in payload.data) {
        var row = payload.data[index];

        switch (row.key) {
          case "reps":
            set.accomplished_repetitions = String(row.acheived);
            break;

          case "weight":
            // will always save in lb in database realm, so by default its in lb
            let weight_value = row.acheived == "" ? "0" : row.acheived;
            if (isMetric) set.accomplished_weight = String(weight_value);
            else
              set.accomplished_weight = String(
                Math.floor(parseInt(weight_value) / 2.2046226218 + 0.5).toFixed(
                  0
                )
              ); // need to convert to lb

            break;

          case "height":
            let height_value = row.acheived == "" ? "0" : row.acheived;
            // will always save in lb in database realm, so by default its in lb
            if (isMetric)
              set.accomplished_height = String(parseInt(height_value));
            else
              set.accomplished_height = String(
                Math.floor(parseInt(height_value) / 0.3937 + 0.5).toFixed(0)
              ); // need to convert to lb
            break;

          case "time":
            let time_value = row.acheived == "" ? "0" : row.acheived;
            set.accomplished_time = String(
              (parseInt(time_value) * 60).toFixed(0)
            );
            break;

          case "distance":
            if (isMetric) set.accomplished_distance = String(row.acheived);
            else
              set.accomplished_distance = String(parseInt(row.acheived) / 3.3);

            break;

          case "repsleft":
            set.accomplished_reps_left = String(row.acheived);
            break;
        }
      }
    });

    dispatch({
      type: "exercise_screen_realm_save_on_update",
      payload: payload
    });
  };
};
