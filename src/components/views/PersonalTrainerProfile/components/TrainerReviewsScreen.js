import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { connect } from "react-redux";

// custom components
import { Card, CardSection } from "../../../common";
import Rating from "../../../Rating";

class TrainerReviewsScreen extends Component {
  state = {};

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => {
    const { renderItem_mainContainer } = Styles;

    return (
      <View style={renderItem_mainContainer}>
        <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
          <Text>{item.client_name}</Text>
        </View>
        <View
          style={{
            flex: 2,
            width: "100%",
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1, marginTop: 10 }}>
            <Rating stars={item.client_rating} showStars={true} />
          </View>
        </View>
        <View
          style={{ flex: 1, width: "100%", marginTop: 10, marginBottom: 10 }}
        >
          <Text style={{ color: "#cccccc" }}>{item.client_review}</Text>
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
        <Text
          style={{ color: "#bbbbbb", textAlign: "center", marginTop: "20%" }}
        >
          No Enough Reviews Available
        </Text>
      </View>
    );
  };
  render() {
    const { mainContainer, textStyle } = Styles;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#e2e2e2"
        }}
      >
        <FlatList
          data={this.props.reviews_data}
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
  renderItem_mainContainer: {
    flexDirection: "column",
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
    color: "red"
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
)(TrainerReviewsScreen);
