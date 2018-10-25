import { GET_CHAT_LIST } from "../../../../../variables";
import { Platform } from "react-native";
import axios from "axios";
import Realm from "../../../../../models";
import SendBird from "sendbird";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const gotoChatView = payload => {
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return dispatch => {
    console.log("going to chat view", payload);

    const sb = SendBird.getInstance();
    const { opponentId, roomId } = payload;

    dispatch({
      type: "goto_chatview",
      payload: payload
    });
    // if (payload.active == "1") {
    sb.GroupChannel.createChannelWithUserIds(
      [opponentId],
      true,
      (createdChannel, error) => {
        if (error) {
          console.error("could not create channel", error);
        } else {
          // adding the channel to the payload passed
          console.log("group chat connected", createdChannel);
          dispatch({
            type: "chat_detail_update_channel",
            payload: createdChannel
          });
          // analytics
          if (Platform.OS != "android")
            firebase.analytics().logEvent("ChatScreen_open");
          Mixpanel.trackWithProperties("ChatScreen Open", {
            trainerID: opponentId
          });

          // updating the meta data of the channel so it can be reflected
          // createdChannel.updateMetaData(
          //   {
          //     roomId: roomId
          //   },
          //   (response, error) => {
          //   if (error) {
          //     console.log(error);
          //     return;
          //   }
          // });
        }
      }
    );
    // } else {
    //   console.log(
    //     "The Chat is Blocked and can not create channel between the users"
    //   );
    // }
  };
};

export const initSendBird = (userId, nickname, urlPicture) => {
  return dispatch => {
    const sb = SendBird.getInstance();
    sb.connect(
      userId,
      (user, error) => {
        console.log("SandBird INIT user: ", user);
        console.log("SandBird INIT error: ", error);
        if (error) {
          console.log("SendBird Login Failed.", error);
        } else {
          dispatch({ type: "ChatList_connect_to_sendbird", payload: true });
          sb.updateCurrentUserInfo(nickname, urlPicture, (user, error) => {
              if(user){
                  console.log("Update current user", user)
              }
            if (error) {
              console.log("Update user Failed!", user, error);
            }
          });
        }
        // getting the total number of unread message via Sendbird API
        sb.GroupChannel.getTotalUnreadMessageCount((count, error) => {
          console.log("count-----", count);
          console.log("error-----", error);
          dispatch({
            type: "chat_notification_update",
            payload: count
          });
        });

        var ChannelHandler = new sb.ChannelHandler();

        // subscribing to sendBird = events
        ChannelHandler.onMessageReceived = function(channel, message) {
          dispatch(ChatList_Server_to_Realm());
        };
        ChannelHandler.onChannelChanged = onChannelChanged;
        ChannelHandler.onReadReceiptUpdated = function (channel) {
            console.log("read Receipt", channel);
            dispatch(ChatList_Server_to_Realm());
        };
        // ChannelHandler.onTypingStatusUpdated = onTypingStatusUpdated;

        // Add this channel handler to SendBird object.
        sb.addChannelHandler("all", ChannelHandler);
      }
    );
  };
};

const getChannelList = current_user_id => {
  return dispatch => {
    //console.log("The trainerid in getChannelList() is : ", current_user_id);
    const sb = SendBird.getInstance();
    //console.log("sb is ", sb);
    sb.connect(
      current_user_id,
      (user, error) => {
        // getting the total number of unread message via Sendbird API
        sb.GroupChannel.getTotalUnreadMessageCount((count, error) => {
          console.log("count-----", count);
          console.log("error-----", error);
          dispatch({
            type: "chat_notification_update",
            payload: count
          });
        });

        var channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();

        console.log("channelListQuery is ", channelListQuery);
        channelListQuery.includeEmpty = true;
        channelListQuery.limit = 20; // pagination limit could be set up to 100

        if (channelListQuery.hasNext) {
          channelListQuery.next(function(channelList, error) {
            if (error) {
              console.error(error);
              return;
            }
            console.log("list of channels", channelList);

            //loop and update the unread message count
            Realm.write(() => {
              // get the list of channels from realm in order to loop and update the unread messages
              var chatcontact = Realm.objects("ChatContactsModel").sorted(
                "fullname"
              );
              console.log("got the list of chat contact", chatcontact.length);
              // loop through the list of created channels to add the unread messafe count
              channelList.forEach((channel, index) => {
                console.log(
                  "the channel have ",
                  channel.unreadMessageCount,
                  "unread messages",
                    channel

                );
                channel.members.forEach((member, index) => {
                  // the user and the trainer should be present in this array
                  // the trainer will be the other array element
                  console.log(
                    "searching for member",
                    member.userId,
                    "different than current user",
                    current_user_id
                  );
                  if (
                    String(current_user_id).trim() !=
                    String(member.userId).trim()
                  ) {
                    console.log("found", member.userId);
                    // this is the ID of the trainer
                    chatcontact.forEach((row, index) => {
                      if (
                        String(row.trainer.user_id).trim() ==
                        String(member.userId).trim()
                      ) {
                        console.log(
                          "found, unread message is",
                          channel.unreadMessageCount
                        );
                        row.unread_message_count = channel.unreadMessageCount;

                        if(channel.lastMessage){
                            if(channel.lastMessage.messageType==="file"){
                                row.last_message_type = channel.lastMessage.type
                            }else{
                                row.last_message_type = "text";
                                row.last_message = channel.lastMessage.message;
                            }
                            row.last_message_createdAt = channel.lastMessage.createdAt;
                            row.last_message_senderID = channel.lastMessage.sender.userId;
                            let lastRead = channel.getReadReceipt(channel.lastMessage);
                            if(lastRead !== null || lastRead !== undefined){
                                row.last_message_readStatus=lastRead;
                                console.log(
                                    "member user ID",
                                    member.userId,
                                    "channels last message read status ",
                                    lastRead
                                );
                            }
                        }

                        dispatch({ type: "ChatList_load_Realm" });
                      }
                    });
                  }
                });
              });
            });
          });
        }
      }
    );
  };
};

const onMessageReceived = (channel, message) => {
  console.log("msg rec ", channel, message);

  //dispatch({ type: "msg_rec" });
};
const onChannelChanged = channel => {
  console.log("channel changed", channel);
};

export const loadChatListItems = () => {
  return {
    type: "load_chat_list_items"
  };
};

export const searchChanged = payload => {
  return {
    type: "Chat_search_changed",
    payload: payload
  };
};

export const ChatList_load_Realm = payload => {
  return {
    type: "ChatList_load_Realm",
    payload: payload
  };
};

var ParseSingleObjectFromArray = (obj, ar) => {
  var fomatted_object = {};

  for (var index in ar) {
    var ar_obj = ar[index];

    if (ar_obj.type == obj.type && ar_obj.id == obj.id) {
      // concatinate into a one level object
      return {
        ...ar_obj.attributes,
        id: ar_obj.id,
        relationships: ar_obj.relationships
      };
    }
  }
};

export const ChatList_Server_to_Realm = (payload, url = GET_CHAT_LIST) => {
  return (dispatch, getState) => {
    //getting the trainer id
    axios
      .get(url(getState().user.user.id))
      .then(function(response) {
        var response_data = response.data;
        var data = response_data;
        var next_url = response_data.next;
        var previous_url = response_data.previous;
        var count = response_data.count;
        var results = response_data.results;

        //looping first through the chatlist data
        for (var result_index in results) {
          var row = results[result_index];
          var chatlistContacts_to_insert = {}; // will fillit it along the way

          chatlistContacts_to_insert.id = String(row.id);
          chatlistContacts_to_insert.roomid = String(row.uuid); // roomid used for connecting to the chat server
          chatlistContacts_to_insert.user_id = String(row.trainer_user_id);
          chatlistContacts_to_insert.active =
            String(row.blocked) == "0" ? "1" : "0"; // blocked used for knowing wether the chat is active or not
          chatlistContacts_to_insert.fullname =
            row.trainer_first_name + " " + row.trainer_last_name;

          try {
            // this is a very heavy operation
            Realm.write(() => {
              //make sure the trainer model is in the database
              let trainer = Realm.create(
                "PersonalTrainerModel",
                {
                  id: String(row.personal_trainer),
                  user_id: row.trainer_user_id,
                  firstName: row.trainer_first_name,
                  lastName: row.trainer_last_name,
                  picURL: row.trainer_photo_url
                },
                true
              ); // update if exists

              //update first and then link
              const current_chatlist_contacts = Realm.create(
                "ChatContactsModel",
                chatlistContacts_to_insert,
                true
              );
              current_chatlist_contacts.trainer = trainer;
            });
          } catch (error) {
            console.log(
              "Cannot Create a New ChatContactsModel !!!!!!!!",
              error
            );
          }
        }
        if (next_url != null) {
          url = next_url;

          dispatch(ChatList_Server_to_Realm(url));
        } else {
          dispatch({
            // inorder to reload the data from Realm that contains the newly added ones
            type: "ChatList_load_Realm",
            payload: payload
          });

          // ask send bird to get the list of channels
          dispatch(getChannelList(getState().user.user.id));
        }
      })
      .catch(function(error) {
        console.log(" loading Chat list error ", error);
      });
    dispatch({
      // inorder to reload the data from Realm that contains the newly added ones
      type: "ChatList_load_Realm",
      payload: payload
    });
  };
};
