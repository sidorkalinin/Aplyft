import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator
} from "react-native";
import { Alert } from "react-native";
import Styles from "./../styles";
import { connect } from "react-redux";
//import realm from './../../models';

//custom components
import CalendarListItem from "./CalendarListItem";
import { loadCalendars, fetchAllEvents } from "./../actions";
import { Button } from "./../../../common";

class CalendarList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTintColor: "white",
      headerRight: (
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => params.handleSyncPress()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>sync</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);

    props.navigation.setParams({
      handleSyncPress: this.onSyncCalendars.bind(this)
    });

    this.state = {
      refreshing: false,
      ids: []
    };
  }

  componentWillMount() {
    this.props.loadCalendars(); //Load The List From Realm
    //this.props.LoadFromServer(RenderId); //Sync Realm With The Server , Inorder To Get Any New Updates.
  }
  _onRowPressed(id) {
    let ids = this.state.ids;
    let index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
      this.setState({ ids: ids }, () => {
        console.log(this.state.ids, "ids **|**|**|**|** ");
      });
    } else {
      this.setState({ ids: [...ids, id] }, () => {
        console.log("ids are", this.state.ids);
      });
    }
  }

  onSyncCalendars() {
    ids_array = this.state.ids;
    console.log(ids_array, "ids_array ********** ");
    console.log("ids_array.length ********** ", ids_array.length);
    if (ids_array.length > 0) {
      this.props.fetchAllEvents({ ids_array });
    } else {
      Alert.alert(
        "No Calendar Chosen",
        "Please choose one or more calendars to sync",
        [
          {
            text: "OK",
            onPress: () =>
              console.log("OK Pressed For All Data are already Synced!")
          }
        ],
        { cancelable: true }
      );
    }
  }

  // onSearchChange(text) {
  //   this.props.searchChanged(text);
  // }

  // _renderHeader = () => {
  //   return (
  //     <TextInput
  //       style={Styles.input}
  //       placeholder="Search..."
  //       onChangeText={this.onSearchChange.bind(this)}
  //       autoCorrect={false}
  //       underlineColorAndroid="rgba(0,0,0,0)"
  //     />
  //   );
  // };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <CalendarListItem
      ids_array={this.state.ids}
      calendarList={item}
      onItemPress={this._onRowPressed.bind(this, item.id)}
    />
  );

  _renderSeparator = () => {
    return <View style={Styles.seperatorStyle} />;
  };
  _renderFooter = item => {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{ width: "100%", flex: 1, marginTop: 20, marginBottom: 20 }}
        >
          <Button onPress={this.onSyncCalendars.bind(this)}>
            <Text style={{ fontWeight: "900" }}>Sync Calendars</Text>
          </Button>
        </View>
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

        //this.props.LoadFromServer(RenderId);

        this.setState({ refreshing: false });
      }
    );
  };

  ListViewItemSeparator() {
    const { separator } = Styles;

    return <View style={separator} />;
  }

  render() {
    const { scrollViewStyle, separator, container, input } = Styles;

    return (
      <View style={container}>
        {this.props.fetchingEvents ? (
          <Modal transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", paddingBottom: 10 }}>
                Syncing Calendars
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}
        <FlatList
          style={container}
          data={this.props.calendarlist_data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ profileSettingsred }) => {
  return {
    calendarlist_data: profileSettingsred.calendarList,
    fetchingEvents: profileSettingsred.fetchingEvents
  };
};

export default connect(
  mapStateToProps,
  {
    loadCalendars,
    fetchAllEvents
  }
)(CalendarList);
