import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import BarStyles from "../../../../styles/tabBarStyle";
import Styles from "./styles";
import ImageHeader from "../../../../ImageHeader";
import { loadVideoListItems, gotoVideoDetail, onSearch } from "./actions";

//custom components
import VideoGlossaryListItem from "./components/videoGlossaryListItem";

class videoGlossaryTabScreen extends Component {
  static navigationOptions = {
    title: "Video Glossary",
    headerTintColor: "white",

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../../../assets/images/video-glossary-icon.png")}
        style={[BarStyles.iconSize, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    // loading the dta file
    this.props.loadVideoListItems();
  }

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={this.props.gotoVideoDetail.bind(this, item.id)}>
      <VideoGlossaryListItem
        title={item.title}
        description={item.description}
        videoPicture={item.video_picture_url}
        timer={item.timer}
      />
    </TouchableOpacity>
  );

  _renderSeparator = () => {
    return <View style={Styles.seperatorStyle} />;
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // call back once the state is chaged
        // we can make a remote request here
        // console.log("done in refresh");
        this.setState({ refreshing: false });
      }
    );
  };

  _onSearchVideoChange = value => {
    this.props.onSearch(value);
  };

  render() {
    const { mainContainer, searchContainer, inputStyle } = Styles;

    return (
      <View style={mainContainer}>
        <View style={searchContainer}>
          <TextInput
            style={inputStyle}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            placeholder="Search: e.g. Upper Body, Arms, Biceps"
            placeholderTextColor="#cccccc"
            onChangeText={this._onSearchVideoChange.bind(this)}
          />
        </View>

        <FlatList
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ VideoList }) => {
  // const { data } = chatList;
  return {
    data: VideoList.dataSource
  };
};

export default connect(mapStateToProps, {
  loadVideoListItems,
  gotoVideoDetail,
  onSearch
})(videoGlossaryTabScreen);
