import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import {
  setValues,
  performance_Realm,
  performance_Server_Relam,
  searchPerformance,
  goBack,
  performance_SearchList_Realm,
  performance_SearchList_Server_Relam
} from "./actions";

String.prototype.toCamelCase = function() {
  var splitStr = this.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

class SelectOptionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isType: true,
      durationSource: [
        { name: "Week", value: "1w" },
        { name: "1 month", value: "1m" },
        { name: "2 month", value: "2m" },
        { name: "3 month", value: "3m" },
        { name: "6 month", value: "6m" },
        { name: "1 year", value: "1y" },
        { name: "All", value: "all" }
      ]
    };
  }

  performanceTypePressed(option) {
    let selectOption = this.props.navigation.state.params.isType
      ? { type: option }
      : { duration: option };
    let chosen = this.props.navigation.state.params.isType
      ? "type"
      : "duration";
    let duration_id = this.props.duration.value;
    let itemType = this.props.type.value;
    if (this.props.navigation.state.params.isType) {
      this.props.setValues({ selectOption, duration_id, chosen });
    } else {
      this.props.setValues({ selectOption, itemType, chosen });
    }
    console.log("selectOption in SelectOptionPage( is : ) : ", selectOption);

    this.props.goBack();
  }

  static navigationOptions = {
    headerTintColor: "white"
  };

  componentWillMount() {
    this.setState({
      isType: this.props.navigation.state.params.isType
    });
    // let duration_id = this.props.duration.value;
    // let itemType = this.props.type.value;
    // console.log("duration OBJ is : ", duration_id);
    // console.log("itemType OBJ is : ", itemType);
    // // this.props.performance_Realm();
    // // this.props.performance_Server_Relam({ itemType, duration_id });
    this.props.performance_SearchList_Realm();
    this.props.performance_SearchList_Server_Relam();
  }

  _keyExtractor = (item, index) => item.id;
  _renderTypes = ({ item }) => {
    if (
      item == "weight" ||
      item == "Body Fat" ||
      item == "Weight" ||
      item == "body fat"
    ) {
      return;
    } else {
      return (
        <View style={Styles.itemContainer}>
          <View style={{ flex: 1 }}>
            <Text style={Styles.performanceTypeText}>{item.toCamelCase()}</Text>
          </View>
          <TouchableOpacity
            onPress={this.performanceTypePressed.bind(this, {
              name: item.toCamelCase(),
              value: item.toLowerCase()
            })}
          >
            <Text style={Styles.viewmoreStyle}>View More</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  _renderDurations = ({ item }) => {
    return (
      <View style={Styles.itemContainer}>
        <View style={{ flex: 1 }}>
          <Text style={Styles.performanceTypeText}>{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={this.performanceTypePressed.bind(this, item)}
        >
          <Text style={Styles.viewmoreStyle}>View More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderSeparator = () => {
    return <View style={Styles.seperatorStyle} />;
  };

  _onSearchChange = value => {
    this.props.searchPerformance(value);
  };

  _renderEmptyComponent = () => {
    return (
      <View style={Styles.emptyComponentContainer}>
        <Text
          style={{
            color: "#bbbbbb",
            textAlign: "center",
            padding: 20,
            paddingBottom: 0
          }}
        >
          No Previous Performance Records{" "}
        </Text>
        <Text
          style={{
            color: "#bbbbbb",
            textAlign: "center",
            padding: 20,
            paddingTop: 0
          }}
        >
          Start a workout in order to track your performance
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

        this.props.performance_SearchList_Server_Relam();

        this.setState({ refreshing: false });
      }
    );
  };

  _renderHeader = () => {
    return (
      <View>
        <View>
          <View style={Styles.itemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={Styles.performanceTypeText}>Weight</Text>
            </View>
            <TouchableOpacity
              onPress={this.performanceTypePressed.bind(this, {
                name: "Weight",
                value: "weight"
              })}
            >
              <Text style={Styles.viewmoreStyle}>View More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 2,
            marginRight: 10,
            marginLeft: 10,
            backgroundColor: "#eeeeee"
          }}
        />
        <View>
          <View style={Styles.itemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={Styles.performanceTypeText}>Body Fat</Text>
            </View>
            <TouchableOpacity
              onPress={this.performanceTypePressed.bind(this, {
                name: "Body Fat",
                value: "body fat"
              })}
            >
              <Text style={Styles.viewmoreStyle}>View More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { mainContainer } = Styles;

    return (
      <View style={mainContainer}>
        <FlatList
          data={
            this.state.isType
              ? this.props.typeSource
              : this.state.durationSource
          }
          keyExtractor={this._keyExtractor}
          renderItem={
            this.state.isType ? this._renderTypes : this._renderDurations
          }
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={this._renderEmptyComponent}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          ListHeaderComponent={this.state.isType ? this._renderHeader : null}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ performancered, graphpagered }) => {
  return {
    typeSource: performancered.searchList_data,
    duration: graphpagered.duration,

    type: graphpagered.type
  };
};

export default connect(
  mapStateToProps,
  {
    setValues,
    performance_SearchList_Realm,
    performance_SearchList_Server_Relam,
    performance_Realm,
    performance_Server_Relam,
    searchPerformance,
    goBack
  }
)(SelectOptionPage);
