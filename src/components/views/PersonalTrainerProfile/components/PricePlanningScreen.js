import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import Video from "react-native-video";

// custom components
import { Card, CardSection } from "../../../common";
import { colors } from "../../../styles/theme";

class PricePlanningScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFreeTrailPeriod(trial_period) {
    const { currencyStyle, intervalStyle } = Styles;

    if (trial_period == "null") {
      return null;
    } else {
      return (
        <View
          style={{
            paddingTop: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%"
          }}
        >
          <View style={{ paddingRight: 5 }}>
            <Text style={currencyStyle}>Free Trial</Text>
          </View>
          <View style={{ paddingRight: 5 }}>
            <Text style={intervalStyle}>({trial_period}/days)</Text>
          </View>
        </View>
      );
    }
  }

  renderBtn(item, status) {
    const {
      mainContainer,
      planNameStyle,
      descriptionNameStyle,
      currencyStyle,
      priceStyle,
      intervalStyle,
      chooseBtnStyle,
      Chosen_mainContainer
    } = Styles;

    // default
    // waiting_user_approval
    // active
    // pending_trainer_approval
    // declined

    if (status == "default") {
      if (this.props.isPaid) {
        return <View />;
      } else {
        return (
          <View>
            <TouchableOpacity
              style={{
                paddingRight: 10,
                paddingLeft: 10,
                backgroundColor: colors.darkBlueColor,
                borderRadius: 5,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this.props.onChooseTrainerButtonPress.bind(
                this,
                item.id,
                item.name
              )}
            >
              <Text style={chooseBtnStyle}>+</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (
      (status == "waiting_user_approval" ||
        status == "pending_trainer_approval") &&
      item.id == this.props.chosenId
    ) {
      return (
        <View>
          <TouchableOpacity
            style={{
              marginRight: 10,
              marginLeft: 10,
              backgroundColor: colors.redColor,
              borderRadius: 5,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.props.onCancelTrainerButtonPress.bind(this, item.id)}
          >
            <Text style={chooseBtnStyle}>-</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      (status == "waiting_user_approval" ||
        status == "pending_trainer_approval") &&
      this.props.chosenId != item.id
    ) {
      return (
        <View>
          <View
            style={{
              marginRight: 10,
              marginLeft: 10,
              backgroundColor: colors.lightGray,
              borderRadius: 5,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            //onPress={this.props.onChooseTrainerButtonPress.bind(this, item.id)}
          >
            <Text style={chooseBtnStyle}>+</Text>
          </View>
        </View>
      );
    } else if (status == "active" || status == "declined") {
      if (item.id == this.props.chosenId) {
        return (
          <View>
            <View
              style={{
                marginRight: 10,
                marginLeft: 10,
                backgroundColor: colors.darkBlueColor,
                borderRadius: 5,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
              //onPress={this.props.onChooseTrainerButtonPress.bind(this, item.id)}
            >
              <Text style={chooseBtnStyle}>✓</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={{
              marginRight: 10,
              marginLeft: 10,
              // backgroundColor: colors.lightGray,
              borderRadius: 5,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        );
      }
    }
  }

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => {
    const {
      mainContainer,
      planNameStyle,
      descriptionNameStyle,
      currencyStyle,
      priceStyle,
      intervalStyle,
      chooseBtnStyle,
      Chosen_mainContainer,
      Chosen_planNameStyle,
      Chosen_descriptionNameStyle,
      Chosen_currencyStyle,
      Chosen_priceStyle,
      Chosen_intervalStyle
    } = Styles;

    return (
      <View style={mainContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
            // borderWidth: 2,
            // borderColor: "red"
          }}
        >
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "flex-start",
              marginRight: 10
            }}
          >
            <Text style={planNameStyle}>{item.name}</Text>
          </View>
          <View
            style={{
              flex: 2,
              //borderWidth: 1,
              alignItems: "flex-start",
              marginRight: 10
            }}
          >
            <Text style={descriptionNameStyle}>{item.description}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1.1,
            flexDirection: "row"
            // borderWidth: 2,
            //borderColor: "yellow"
          }}
        >
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              <View style={{ paddingRight: 5 }}>
                <Text style={currencyStyle}>{item.currency}</Text>
              </View>
              <View style={{ paddingRight: 5 }}>
                <Text style={priceStyle}>{item.price}</Text>
              </View>
              <View style={{ paddingRight: 5 }}>
                <Text style={intervalStyle}>
                  ({item.interval_count}/{item.interval})
                </Text>
              </View>
            </View>
            {this.renderFreeTrailPeriod(item.trial_period)}
          </View>
          <View
            style={{
              // flex: 1,
              //justifyContent: "center",
              alignItems: "center",
              justifyContent: "flex-end"
              // borderWidth: 1,
              //borderColor: "red"
            }}
          >
            {this.renderBtn(item, this.props.status)}
          </View>
        </View>
      </View>
    );
  };

  _renderSeparator = () => {
    return <View style={Styles.seperatorStyle} />;
  };

  _renderHeader = () => {
    return <View />;
  };

  // _renderFooter = () => {
  //   if (this.props.user.freedailyWorkout) return <View />;
  //
  //   return <View />;
  //
  //   return (
  //     <View
  //       style={{
  //         paddingVertical: 20,
  //         borderTopWidth: 6,
  //         borderColor: "#eeeeee",
  //         paddingLeft: 10,
  //         paddingRight: 10
  //       }}
  //     >
  //       <Button onPress={this._freeDailyWorkoutPress.bind(this)}>
  //         <Text>GET A FREE DAILY WORKOUT</Text>
  //       </Button>
  //     </View>
  //   );
  // };

  _renderEmptyComponent = () => {
    return (
      <View style={Styles.emptyComponentContainer}>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          Coming Soon
        </Text>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          You will be able to select a Pricing Plan
        </Text>
      </View>
    );
  };

  // _onRefresh = () => {
  //   this.props.loadSearchListItems();
  // };

  render() {
    const {
      planNameStyle,
      descriptionNameStyle,
      currencyStyle,
      priceStyle,
      intervalStyle,
      chooseBtnStyle,
      Chosen_planNameStyle,
      Chosen_descriptionNameStyle,
      Chosen_currencyStyle,
      Chosen_priceStyle,
      Chosen_intervalStyle
    } = Styles;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#e2e2e2"
        }}
      >
        <FlatList
          data={this.props.planningList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          style={{ flex: 1 }}
          // ListHeaderComponent={this._renderHeader}
          //ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmptyComponent}
          //refreshing={this.props.refreshing}
          //onRefresh={this._onRefresh}
        />
      </ScrollView>
    );
  }
}
const Styles = {
  mainContainer: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    //borderWidth: 1,
    padding: 10,
    // height: 80,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },

  planNameStyle: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.darkBlueColor
    // borderWidth: 2
  },
  emptyComponentContainer: {
    paddingTop: 10
  },
  descriptionNameStyle: {
    fontSize: 13,
    color: "#bcbcbc"
  },
  currencyStyle: {
    fontSize: 12,
    color: "red"
  },
  priceStyle: {
    fontSize: 14,
    color: "red"
  },
  intervalStyle: {
    fontSize: 14,
    color: "#bcbcbc"
  },
  chooseBtnStyle: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    //backgroundColor: colors.darkBlueColor,
    color: "#ffffff"
  },
  seperatorStyle: {
    height: 1,
    width: "100%",
    backgroundColor: "#eeeeee"
  }
};

export default connect(
  null,
  {}
)(PricePlanningScreen);
