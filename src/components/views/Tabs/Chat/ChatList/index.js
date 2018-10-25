import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Platform
} from "react-native";
import { connect } from "react-redux";
import BarStyles from "../../../../styles/tabBarStyle";
// styles
import { colors } from "../../../../styles/theme";

// action function REDUX
import {
  gotoChatView,
  loadChatListItems,
  ChatList_load_Realm,
  ChatList_Server_to_Realm,
  searchChanged,
  initSendBird
} from "./actions";
import ChatListItem from "./components/ChatListItem";
import TabIcon from "../../../../TabIcon";
// import PushNotification from "react-native-push-notification";

// initializing the sendBird SDK
import SendBird from "sendbird";
import { SENDBIRD_APP_ID } from "../../../../../variables";
const sb = new SendBird({ appId: SENDBIRD_APP_ID });

class chatIMTabScreen extends Component {
  constructor(props) {
    super(props);

    // requesting the permission in both cases
    // PushNotification.requestPermissions();

    this.state = {
      refreshing: false,
      connectedToSendBird: false
    };
    this.props.loadChatListItems();

    this.props.initSendBird(
      this.props.user.user.id,
      this.props.user.user.fullname,
      this.props.user.user.imageURL
    );
    // props.navigation.setParams({chatNotificationNumber: 4});
  }

  static navigationOptions = ({ navigation, state }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Chat",
      headerTintColor: "white",

      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <TabIcon
          containerStyle={BarStyles.iconSize}
          imgSource={require("../../../../../assets/images/chat-im-icon.png")}
          imgStyle={[BarStyles.iconSize, { tintColor: tintColor }]}
        />
      )
    };
  };

  componentWillMount() {
    this.props.ChatList_load_Realm();
    this.props.ChatList_Server_to_Realm();
  }

  // logic behind the list item press
  goToChat(roomId, title, active, trainerPic, opponentId) {
    if (this.props.connectedToSendBird)
      this.props.gotoChatView({
        roomId,
        title,
        active,
        trainerPic,
        opponentId
      });
  }

  onSearchChange(text) {
    this.props.searchChanged(text);
  }

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={this.goToChat.bind(
        this,
        item.roomid,
        item.fullname,
        item.active,
        item.trainer.picURL,
        item.trainer.user_id
      )}
    >
      <ChatListItem
        unreadMessagesCount={item.unread_message_count}
        lastMessage={item.last_message}
        lastMessageCreatedAt={item.last_message_createdAt}
        lastMessageType={item.last_message_type}
        lastMessageSenderID={item.last_message_senderID}
        lastMessageReadStatus={item.last_message_readStatus}
        clientlist={{
          ClientID: item.id,
          ClientName: item.fullname,
          active: item.active,
          ClientImage: item.trainer.picURL || "",
          //ClientRequest : item.trainer.category || '',
          // ClientLocation: item.trainer.location || ""
        }}
      />
    </TouchableOpacity>
  )

  _renderSeparator = () => {
    return <View style={styles.seperatorStyle} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          No Contacts Available
        </Text>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          Connect with a fitness expert and chat
        </Text>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // call back once the state is chaged
        // we can make a remote request here
        console.log("Done in refresh");

        this.props.ChatList_Server_to_Realm();

        this.setState({ refreshing: false });
      }
    );
  };

  _connectIndicator = () => {
    if (!this.props.connectedToSendBird)
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alingItems: "center",
            paddingTop: 10
          }}
        >
          <ActivityIndicator />
          <Text style={{ padding: 5, color: "grey" }}>Connecting...</Text>
        </View>
      );

    return <View />;
  };

  render() {
    const { mainContainer, searchContainer, inputStyle } = styles;

    return (
      <ImageBackground
        style={mainContainer}
        source={require("../../../../../assets/images/chatbg.jpg")}
      >
        {this._connectIndicator()}
        <View style={searchContainer}>
          <View
            style={{
              margin: 15,
              backgroundColor: "white",
              borderRadius: 10
            }}
          >
            <TextInput
              style={inputStyle}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              placeholder="Search"
              placeholderTextColor="#cccccc"
              onChangeText={this.onSearchChange.bind(this)}
            />
          </View>
        </View>

        <FlatList
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={this._renderEmptyComponent}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      </ImageBackground>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    resizeMode: "center"
  },
  seperatorStyle: {
    height: 6,
    width: "100%",
    backgroundColor: "#eeeeee"
  },
  searchContainer: {
    borderWidth: 0,
    width: "100%",
    backgroundColor: "#eeeeee"
  },
  inputStyle: {
    padding: 20
  },
  emptyComponentContainer: {
    padding: 20,
    backgroundColor: "transparent",
    alingItems: "center",
    justifyContent: "center"
  }
};

const mapStateToProps = ({ chatList, user }) => {
  return {
    connectedToSendBird: chatList.connectedToSendBird,
    data: chatList.data,
    user: user
  };
};

export default connect(
  mapStateToProps,
  {
    gotoChatView,
    loadChatListItems,
    ChatList_load_Realm,
    ChatList_Server_to_Realm,
    searchChanged,
    initSendBird
  }
)(chatIMTabScreen);
