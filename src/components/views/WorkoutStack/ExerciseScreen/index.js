import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Video from "react-native-video";

// custom components
import VideoItem from "./components/videoItem";
import ExerciseSetScreen from "./components/exerciseSetScreen";
import { Button } from "../../../common";
import { gotoVideoDetail, updateSetInRealm } from "./actions";

//to be removed from here
import realm from "../../../../models";

class ExerciseScreen extends Component {
  static navigationOptions = props => {
    return {
      headerTintColor: "white",
      title: props.navigation.state.params.title,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" }
    };
  };

  state = {
    pageIndex: 0,
    tabs: [<View tabLabel="Empty " />]
  };

  componentDidMount() {
    this._renderTabs();
    // this.player.presentFullscreenPlayer();
    // this.player.seek(0);
  }

  _onSetValueChanged = ({ data }) => {
    // console.log("><<<><><><", data);

    for (var index in data) {
      this.props.updateSetInRealm(data[index]);
    }
  };

  _renderTabs() {
    var tmp = [];
    this.props.data.sets.forEach((item, index) => {
      // link the bitwise operator to the set
      console.log(
        "VARIATIONS in the index of the exercises : >>>> ",
        Array.from(this.props.data.sets)
      );
      console.log("ITEM in the index of the exercises : >>>> ", item);
      tmp.push(
        <ExerciseSetScreen
          isMetric={this.props.isMetric}
          tabLabel={"Set " + (index + 1)}
          title={this.props.title}
          variations={item.variations}
          showVariation={this.props.showVariation}
          bitwiseLogic={this.props.data.bitwise_logic}
          dataSource={[item]}
          onChangeValue={this._onSetValueChanged.bind(this)}
        />
      );
    });

    if (tmp.length == 0) tmp.push(<View />);

    this.setState({
      tabs: tmp
    });
  }

  _handleChangeScreen = ({ i, from }) => {
    // console.log(this.state.pageIndex);
    this.state.pageIndex = i;
    // this.pageIndex = i; // save local too
  };

  _gotoNextSet = () => {
    // save in realm first

    if (this.state.pageIndex == this.props.data.sets.length - 1) {
      // console.log("going back");
      this.props.navigation.goBack(null);
    } else this.tabView.goToPage(++this.state.pageIndex);
  };

  render() {
    // this is for the video place under the keyboard avoiding component

    // {
    //   this.props.video_id == "0" ? null : (
    //     <View style={VideoItemContainer}>
    //       <VideoItem
    //         onPress={this.props.gotoVideoDetail.bind(this, this.props.video_id)}
    //         onThumbnailPress={() => console.log("pressed")}
    //         videoPicture={this.props.videoPicURL}
    //         title={this.props.title}
    //         duration=""
    //       />
    //     </View>
    //   );
    // }

    const { mainContainer, VideoItemContainer, underlineStyle } = Styles;

    return (
      <ScrollView style={mainContainer}>
        {this.props.video_id == "0" ? null : (
          <View style={VideoItemContainer}>
            <VideoItem
              onPress={this.props.gotoVideoDetail.bind(
                this,
                this.props.video_id
              )}
              onThumbnailPress={this.props.gotoVideoDetail.bind(
                this,
                this.props.video_id
              )}
              videoPicture={this.props.videoPicURL}
              title={this.props.title}
              duration={this.props.timer}
            />
          </View>
        )}
        <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior="position">
          <ScrollableTabView
            ref={tabView => {
              this.tabView = tabView;
            }}
            onChangeTab={this._handleChangeScreen}
            tabBarUnderlineStyle={underlineStyle}
            tabBarBackgroundColor="#ffffff"
            tabBarActiveTextColor="#ea1e39"
            tabBarInactiveTextColor="#bcbcbc"
            prerenderingSiblingsNumber={true}
          >
            {this.state.tabs}
          </ScrollableTabView>
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 6,
              borderColor: "#eeeeee",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Button onPress={this._gotoNextSet}>
              <Text>Next</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapsStateToProps = ({ currentExercise, user }) => {
  // we need to pass the exercise ID

  // check if the video is ok and in our database
  let obj = realm.objectForPrimaryKey(
    "VideoModel",
    currentExercise.data.video_id
  );
  // console.log(
  //   "/@/@/@/@/@/@/@/--- The data in the ExerciseScreen ",
  //   currentExercise.data
  // );
  return {
    showVariation: currentExercise.showVariation,
    data: currentExercise.data,
    sets: [],
    title: currentExercise.data.title,
    timer: obj == undefined ? "" : obj.timer,
    video_id: obj == undefined ? 0 : obj.id,
    videoPicURL: obj == undefined ? "" : obj.video_picture_url,
    isMetric: user.user.units == "metric" ? true : false
  };
};

export default connect(
  mapsStateToProps,
  {
    gotoVideoDetail,
    updateSetInRealm
  }
)(ExerciseScreen);
