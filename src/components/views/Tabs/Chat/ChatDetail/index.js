import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Linking,
  ActivityIndicator,
  NativeModules,
  PermissionsAndroid,
  Platform,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import SocketIOClient from "socket.io-client";
import { CHAT_SOCKET_ADDRESS } from "../../../../../variables";
// component
console.disableYellowBox = true;
import moment from "moment";
import { GiftedChat } from "react-native-gifted-chat";
import AplyftBubble from "./components/AplyftBubble";
import CustomInputToolbar from "./components/CustomInputToolbar";
import CustomActions from "./components/CustomActions";
import CustomSendIcon from "./components/CustomSendIcon";
import CustomMicroIcon from "./components/CustomMicroIcon";
import CustomCameraIcon from "./components/CustomCameraIcon";
import CustomMicroAnimation from "./components/CustomMicroAnimation";
import FastImage from "react-native-fast-image";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import {
  updateNotificationIcon,
  updateUploadingToSendBird,
  updateisRecording,
  storeMessage
} from "./actions";
import {
  UpdateChannelList_on_msg_rec,
  ChatList_Server_to_Realm
} from "./../ChatList/actions";
import PushNotification from "react-native-push-notification";
import SendBird from "sendbird";
import ImagePicker from "react-native-image-crop-picker";
import SoundRecorder from "react-native-sound-recorder";
import Realm from "../../../../../models";

class chatIMScreen extends Component {
  componentDidMount() {
    this.props.navigation.setParams({
      optionsClick: this.backPressed.bind(this)
    });

      BackHandler.addEventListener("backpressed", this.backPressed.bind(this));
  }

  static navigationOptions = props => {
    console.log(
      "In ChatDetail/Index navigation params: >>>> >>> >> > :",
      props.navigation.state.params
    );
    return {
      title: props.navigation.state.params.title,
      headerTintColor: "white",
      headerLeft: (
        <HeaderBackButton
          tintColor={"#FFF"}
          onPress={() => {
            props.navigation.state.params.optionsClick();
          }}
        />
      )
    };
  };

  backPressed(props) {
    console.log("I am in back ()");
    const sb = SendBird.getInstance();
    sb.removeChannelHandler("chatdetails-" + this.props.roomId);

    this.props.navigation.goBack(null);

    //on going back reload the list of contacts to show last message
    this.props.ChatList_Server_to_Realm();
  }

  constructor(props) {
    super(props);
    // console.log("the props are", this.props.navigation.state.params);
    PushNotification.requestPermissions();
  }

  // componentWillMount() {
  //   if (Platform.os != "ios") {
  //     this.requestMicrophonePermission();
  //     this.requestStoragePermission();
  //   }
  // }
  componentWillUnmount() {
    console.log("BACKKK");
      BackHandler.removeEventListener("backpressed", this.backPressed.bind(this));
  }
  requestMicrophonePermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Requesting Microphone Access",
          message: "App needs permission to access to your microphone "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the microphone");
      } else {
        console.log("Microphone permission denied");
        alert("Microphone permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  requestStoragePermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Requesting Storage Access",
          message: "App needs permission to access to your Storage "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Storage");
      } else {
        console.log("Storage permission denied");
        alert("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillReceiveProps(nextprops) {
    console.log("will recieve");

    if (this.props.channel != nextprops.channel) {
      this._getChannelMetaData(nextprops.channel);
      const sb = SendBird.getInstance();
      if (sb) {
        var ChannelHandler = new sb.ChannelHandler();

        // subscribing to sendBird = events
        ChannelHandler.onMessageReceived = this.onMessageReceived;
        ChannelHandler.onReadReceiptUpdated = this.onReadReceiptUpdated;
        ChannelHandler.onTypingStatusUpdated = this.onTypingStatusUpdated;

        // Add this channel handler to SendBird object.
        sb.addChannelHandler("chatdetails-" + nextprops.roomId, ChannelHandler);
      } else {
        console.log("no instance");
      }
    }
  }

  onMessageReceived = (channel, message) => {
    console.log("msg received from ", channel, message);
    this.props.ChatList_Server_to_Realm();
    channel.markAsRead();
    this._storeMessages([this.sendBirdFormatToGiftedChatParser(message)]);
  };

  onReadReceiptUpdated = groupChannel => {
    console.log("read Receipt", groupChannel);
    this.props.ChatList_Server_to_Realm();
  };

  onTypingStatusUpdated = groupChannel => {
    console.log("type started", groupChannel);
  };

  _getChannelMetaData = channel => {
    console.log("getting channel meta data", channel);
    if (channel) {
      // enabling push settings for this channel
      channel.setPushPreference(true, function(response, error) {
        if (error) {
          console.error("error setting the push notifcation to on", error);
          return;
        }

        // Do something in response to turning on push notifications.
      });
      const messagesQuery = channel.createPreviousMessageListQuery();

      messagesQuery.load(50, false, (messages, error) => {
        if (error) {
          console.error("error loading chat query ", error);
        } else {
          console.log("got chat messages from sendbird", messages);

          // when we load, that means the users read the messages
          channel.markAsRead();

          Realm.write(() => {
            let chat_client_id = String(
              this.props.navigation.state.params.opponentId
            );
            console.log(
              "opponentId is : ",
              this.props.navigation.state.params.opponentId
            );
            let chat_contact = Realm.objects("ChatContactsModel").filtered(
              "user_id == $0",
              chat_client_id
            );
            console.log("chat_client_id $$$$  : ", Array.from(chat_contact));
            let chat_to_update = {
              id: chat_contact[0].id,
              // fullname: chat_contact[0].fullname,
              // roomid: chat_contact[0].roomid,
              // active: chat_contact[0].active,
              // user_id: chat_contact[0].user_id,
              unread_message_count: 0
            };

            let chat_update = Realm.create(
              "ChatContactsModel",
              chat_to_update,
              true
            );
          });

          for (var index in messages) {
            var row = messages[index];
            this._storeMessages([this.sendBirdFormatToGiftedChatParser(row)]);
          }

          this.props.ChatList_Server_to_Realm();
        }
      });
    } else {
      console.log("channel not defined");
    }
    return;
  };

  sendBirdFormatToGiftedChatParser = row => {
    let sender = {
      _id: row._sender ? row._sender.userId : 0,
      name: row._sender ? row._sender.nickname : "APLYFT",
      avatar: row._sender
        ? row._sender.profileUrl
        : "https://images-aplyft.s3.amazonaws.com/aplyft/logo-gray-bg.png"
    };

    var msg_obj = {
      _id: row.messageId,
      createdAt: moment(row.createdAt),
      text: row.message,
      user: sender
    };

    // chek if the message returned from the server contains a url
    // and also check the type fo the file
    if (row.messageType == "file" && row.url) {
      switch (row.type) {
        case "image/jpeg":
        case "image/jpg":
        case "image/png":
          msg_obj.image = row.url;
          break;

        case "audio/mpeg":
          msg_obj.audio = row.url;
          break;

        case "video/mp4":
          msg_obj.video = row.url;
          break;
      }
    }

    return msg_obj;
  };

  /*componentWillUnmount() {
    console.log("closing");
    if (this.state.isActive)
        this.socket.emit('unsubscribe');
  }*/

  onSend(messages = []) {
    var msg = messages[0];
    // console.log("the state is:", this.state);
    // msg.opponent_id = this.state.opponent_id;

    // sending message
    const sb = SendBird.getInstance();
    this.props.channel.sendUserMessage(msg.text, (response, error) => {
      if (!error) {
        // handle._getChannelMetaData(channel);
      }
      console.log("the retreives msg from sendbird is: ", response);
      msg = {
        _id: response.messageId,
        text: response.message || null,
        user: {
          _id: response._sender.userId,
          name: response._sender.nickname,
          avatar: response._sender.profileUrl
        },
        createdAt: response.createdAt
      };

      if (response.messageType == "file" && response.url) {
        switch (response.type) {
          case "image/jpeg":
          case "image/jpg":
          case "image/png":
            msg.image = response.url;
            break;

          case "audio/mpeg":
            msg.audio = response.url;
            break;

          case "video/mp4":
            msg.video = response.url;
            break;
        }
      }

      this._storeMessages([msg]);
    });
  }

  onSendFile(path, filename = "picture.png", type) {
    this.props.updateUploadingToSendBird(true);
    this.props.channel.sendFileMessage(
      {
        uri: path,
        name: filename,
        type: type
      },
      data => {
        // console.log("progressing...", data);
      },
      (message, error) => {
        // when message is recieved.
        if (error) {
          console.log("error sending file to sendbird", error);
        } else {
          console.log("all went well", message);
          var message_ = {
            _id: message.messageId,
            createdAt: moment(),
            type: type,
            user: {
              _id: this.props.user.id
            }
          };

          // add the proper key to the message
          switch (type) {
            case "image/png":
            case "image/jpeg":
            case "image/jpg":
              message_.image = message.url;
              break;

            case "audio/mpeg":
              message_.audio = message.url;
              break;

            case "video/mp4":
              message_.video = message.url;
              break;
          }

          this._storeMessages([message_]);
        }
        this.props.updateUploadingToSendBird(false);
      }
    );
  }

  _renderInput = () => {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: 30,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Chat Message is locked</Text>
      </View>
    );
  };

  _onMicroPress = async () => {
    if (Platform.OS === "android") {
      // wiat for the permission to finish
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Requesting Storage Access",
          message: "App needs permission to access to your Storage "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this._recordAudio();
      } else {
        console.log("Storage permission denied");
        alert("Please Allow the Audio Permission from the Settings");
      }
    } else {
      this.props.updateisRecording(true);
      this._recordAudio();
    }
  };

  _recordAudio = () => {
    SoundRecorder.start(SoundRecorder.PATH_CACHE + "/test.mp4", {
      format:
        Platform.OS === "android"
          ? SoundRecorder.FORMAT_AAC_ADTS
          : SoundRecorder.FORMAT_MPEG4AAC,
      encoder: SoundRecorder.ENCODER_AAC
    }).then(() => {
      console.log("started recording");
    });
  };

  _onMicroRelease = () => {
    var that = this;
    this.props.updateisRecording(false);
    SoundRecorder.stop().then(function(result) {
      console.log("stopped recording, audio file saved at: ", result.path);
      that.onSendFile(result.path, "test.mp4", "audio/mpeg");
    });
  };

  _renderCustomInput = props => {
    if (this.props.navigation.state.params.active == "1") {
      return (
        <CustomInputToolbar
          {...props}
          children={<CustomSendIcon />}
          childrenCamera={<CustomCameraIcon />}
          onCameraPress={() => this._openCamera()}
          childrenMicro={<CustomMicroIcon />}
          onMicroPress={this._onMicroPress}
          onMicroRelease={this._onMicroRelease}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: "white",
            height: 30,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Chat Message is locked</Text>
        </View>
      );
    }
  };

  _renderBubble = props => {
    return <AplyftBubble {...props} />;
  };

  _renderAvatar = props => {
    const { avatarProps, user } = props.currentMessage;
    return (
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={{ width: 30, height: 30, borderRadius: 15 }}
        source={{
          uri: user.avatar,
          priority: FastImage.priority.normal
        }}
      />
    );
  };

  _openSettings = () => {
    // this is only for iOS
    Linking.openURL("app-settings:")
      .then(supported => {
        if (!supported) {
          NativeModules.OpenSettings.openNetworkSettings(data => {
            console.log("call back data", data);
          });
        } else {
          return Linking.openURL("app-settings:");
        }
      })
      .catch(err => console.error("An error occurred", err));
  };

  _renderCustomActions = props => {
    const options = {
      "Photo Library": props => {
        this._openGalery();
      },
      "Video Library": props => {
        this._openVideoGalery();
      },
      Camera: props => {
        this._openCamera();
      },
      Cancel: () => {
        console.log("ff");
      }
    };
    return (
      <CustomActions
        options={options}
        // onPressActionButton={()=>alert("hi")}
      />
    );
  };
  _openVideoGalery = () => {
    ImagePicker.openPicker({
      mediaType: "video"
    })
      .then(video => {
        console.log("choosing from video gallery", video);
        if (Platform.OS == "android") {
          var f = video.path.slice(0, -3) + "mp4";
          this.onSendFile(video.path, f, "video/mp4"); //video.mime);
        } else {
          var f = video.filename.slice(0, -3) + "mp4";
          this.onSendFile(video.path, f, "video/mp4"); //video.mime);
        }
      })
      .catch(err => {
        console.log("error choosing video", err);
        if (err.code == "E_PERMISSION_MISSING")
          Alert.alert(
            "Gallery Access",
            "Please allow APLYFT to access your video gallery",
            [
              {
                text: "Settings",
                onPress: () => {
                  // this is only for iOS
                  this._openSettings();
                }
              },
              { text: "Cancel" }
            ],
            { cancelable: true }
          );
      });
  };
  _openGalery = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      compressImageQuality: 0.5
    })
      .then(image => {
        console.log("choosing from gallery", image);
        this.onSendFile(image.path, image.filename, image.mime);
      })
      .catch(err => {
        if (err.code == "E_PERMISSION_MISSING")
          Alert.alert(
            "Gallery Access",
            "Please allow APLYFT to access your gallery",
            [
              {
                text: "Settings",
                onPress: () => {
                  // this is only for iOS
                  this._openSettings();
                }
              },
              { text: "Cancel" }
            ],
            { cancelable: true }
          );
      });
  };
  _openCamera = () => {
    ImagePicker.openCamera({
      compressImageQuality: 0.5
    })
      .then(image => {
        console.log("choosing from gallery", image);
        this.onSendFile(image.path, image.filename, image.mime);
      })
      .catch(err => {
        if (err.code == "E_PERMISSION_MISSING")
          Alert.alert(
            "Gallery Access",
            "Please allow APLYFT to access your gallery",
            [
              {
                text: "Settings",
                onPress: () => {
                  // this is only for iOS
                  this._openSettings();
                }
              },
              { text: "Cancel" }
            ],
            { cancelable: true }
          );
      });
  };

  _renderFooter = () => {
    if (this.props.uploadingToSendBird)
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 30
          }}
        >
          <ActivityIndicator size={"small"} />
          <Text style={{ color: "#b2b2b2", paddingLeft: 5 }}>uploading...</Text>
        </View>
      );
    else return <View />;
  };

  _renderAccessory = () => {
    if (this.props.isRecording)
      return <CustomMicroAnimation styleContainer={styles.accessoryStyle} />;

    return null;
  };

  _renderLoading = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 30
      }}
    >
      <ActivityIndicator size={"small"} />
      <Text style={{ color: "#b2b2b2", paddingLeft: 5 }}>loading...</Text>
    </View>
  );

  render() {
    return (
      <GiftedChat
        renderAccessory={this._renderAccessory}
        minInputToolbarHeight={25}
        // placeholder={this.props.active ? "Message" : "Chat is locked"}
        renderInputToolbar={this._renderCustomInput}
        renderActions={this._renderCustomActions}
        messages={this.props.messages}
        onSend={this.onSend.bind(this)}
        user={{
          _id: this.props.user.id // get the loged in user ID
        }}
        isAnimated
        // showUserAvatar
        renderBubble={this._renderBubble}
        // renderAvatar={this._renderAvatar}
        renderLoading={this._renderLoading}
        renderFooter={this._renderFooter}
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    // edit the sotred message os the avatar will be displayed
    var msg = messages[0];
    // console.log("the message is", msg);
    // msg.image = 'https://placehold.it/100x100';
    // msg.sent = true;
    // msg.received = true;
    this.props.storeMessage(msg);
  }
}

const styles = {
  accessoryStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#171e4e",
    position: "absolute",
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
};

const mapStateToProps = ({ user, chatDetail }) => {
  return {
    user: user.user,
    channel: chatDetail.channel,
    roomId: chatDetail.roomId,
    uploadingToSendBird: chatDetail.uploadingToSendBird,
    isRecording: chatDetail.isRecording,
    opponent_id: chatDetail.opponent_id,
    messages: chatDetail.messages,
    isActive: chatDetail.isActive,
    pic: chatDetail.pic
  };
};

export default connect(
  mapStateToProps,
  {
    UpdateChannelList_on_msg_rec,
    ChatList_Server_to_Realm,
    updateNotificationIcon,
    updateUploadingToSendBird,
    updateisRecording,
    storeMessage
  }
)(chatIMScreen);
