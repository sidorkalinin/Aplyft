import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import ScrollableTabView from "react-native-scrollable-tab-view";

// custom Tab Views
import DailyTrainingScreen from "./DailyTrainingScreen";
import DailyNutritionScreen from "./DailyNutritionScreen";

class myTrainingDailyViewScreen extends Component {
  static navigationOptions = props => {
    return {
      headerTintColor: "white",
      title: props.navigation.state.params.title,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" }
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { underlineStyle } = styles;

    return (
      <ScrollableTabView
        tabBarUnderlineStyle={underlineStyle}
        tabBarBackgroundColor="#ffffff"
        tabBarActiveTextColor="#ea1e39"
        tabBarInactiveTextColor="#bcbcbc"
        prerenderingSiblingsNumber={true}
      >
        <DailyTrainingScreen tabLabel="Training" />
        <DailyNutritionScreen tabLabel="Nutrition" />
      </ScrollableTabView>
    );
  }
}

const styles = {
  underlineStyle: {
    backgroundColor: "#ea1e39"
  }
};

export default connect(
  null,
  {}
)(myTrainingDailyViewScreen);
