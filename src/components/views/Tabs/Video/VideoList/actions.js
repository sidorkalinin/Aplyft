import axios from "axios";
import realm from "../../../../../models";
import { VIDEO_URI } from "../../../../../variables";

export const loadVideoListItems = (url = VIDEO_URI) => {
  return dispatch => {
    axios
      .get(url /*+ "?page[offset]=0&page[limit]=3000"*/)
      .then(function(response) {
        //console.log("video list loaded success", response);
        var response_data = response.data;
        var data = response_data.results;
        var next_url = response_data.next;
        var previous_url = response_data.previous;
        var count = response_data.count;

        for (var data_index in data) {
          var row = data[data_index];

          let obj_to_be_inserted = {
            id: String(row.id),
            video_picture_url: String(row.thumbnail_url) || "",
            video_url: String(row.url) || "",
            title: String(row.title) || "",
            description: String(row.description) || "",
            tags: String(row.tag_name) || "",
            timer: String(row.timer) || ""
          };

          realm.write(() => {
            // console.log("creating", obj_to_be_inserted);
            realm.create(
              "VideoModel",
              obj_to_be_inserted,
              true // check if it its laready inserted otherwise update
            );
          });
        }

        if (next_url != null) {
          url = next_url;

          dispatch(loadVideoListItems(url));
        } else {
          dispatch({
            type: "load_video_list_items"
          });
        }
      })
      .catch(function(error) {
        console.log(" loading video list error ", error);
        dispatch({ type: "load_video_list_items_fail" });
      });

    dispatch({
      type: "load_video_list_items"
    });
  };
};

export const onSearch = payload => {
  return {
    type: "search_video_list_items",
    payload: payload
  };
};

export const gotoVideoDetail = payload => {
  return {
    type: "goto_videodetail_view",
    payload: { id: payload }
  };
};
