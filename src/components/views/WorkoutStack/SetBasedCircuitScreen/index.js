import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import Styles from "./styles";

import { Button } from "../../../common";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ExerciseSetScreen from "../ExerciseScreen/components/exerciseSetScreen";
import { updateInRealm } from "./actions";

// workaroud for the scrollable tab view and its flatlist
import { Dimensions } from "react-native";

class SetBasedCircuitScreen extends Component {
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
    // console.log("changed values", {...data});

    // data wil receive as
    for (var index in data) {
      var row = data[index];

      this.props.updateInRealm({
        setId: row.id,
        round: this.state.pageIndex,
        accomplished_repetitions: row.data[0].acheived,
        accomplished_weight: row.data[1].acheived,
        accomplished_time: row.data[2].acheived,
        accomplished_distance: row.data[3].acheived
      });
    }
  };

  _renderTabs() {
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
      "window"
    );

    var ds = [];

    // loop throught the exercises
    for (var index in this.props.dataSource) {
      // parse the exercise to fit the ExerciseSetScreen Component
      var exercise = this.props.dataSource[index];

      //creating the obejct and pushing it to the ds
      ds.push({
        id: exercise.sets[0].id,
        title: exercise.title,
        repetitions: exercise.sets[0].repetitions,
        accomplished_repetitions: exercise.sets[0].accomplished_repetitions,
        weight: exercise.sets[0].weight,
        accomplished_weight: exercise.sets[0].accomplished_weight,
        restTime: exercise.sets[0].restTime,
        accomplished_time: exercise.sets[0].accomplished_time,
        distance: exercise.sets[0].distance,
        accomplished_distance: exercise.sets[0].accomplished_distance
      });
    }

    var tabs = [];
    for (var i = 0; i < this.props.sets; i++) {
      tabs.push(
        <View
          tabLabel={"Round " + (i + 1)}
          style={{ height: viewportHeight - 200 }}
        >
          <ExerciseSetScreen
            // title={"Circuit"}
            tabLabel={"Round " + (i + 1)}
            dataSource={ds}
            onChangeValue={this._onSetValueChanged.bind(this)}
          />
        </View>
      );
    }

    if (tabs.length == 0) tabs.push(<View />);

    this.setState({
      tabs: tabs
    });
  }

  _renderFooterComponent = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 6,
          borderColor: "#eeeeee",
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        <Button onPress={() => console.log("save pressed")}>
          <Text>Save</Text>
        </Button>
      </View>
    );
  };

  _handleChangeScreen = ({ i, from }) => {
    // console.log(this.state.pageIndex);
    this.state.pageIndex = i;
    // this.pageIndex = i; // save local too
  };

  _gotoNextSet = () => {
    if (this.state.pageIndex == this.props.data.sets.length - 1) {
      // console.log("going back");
      this.props.navigation.goBack(null);
    } else this.tabView.goToPage(++this.state.pageIndex);
  };

  render() {
    const { mainContainer, underlineStyle } = Styles;

    return (
      <ScrollView style={mainContainer}>
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
          {this._renderFooterComponent()}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ currentCircuit }) => {
  return {
    sets: currentCircuit.data.repetitions,
    dataSource: currentCircuit.data.exercises
  };
};

export default connect(mapStateToProps, {
  updateInRealm
})(SetBasedCircuitScreen);
