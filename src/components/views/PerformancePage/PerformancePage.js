import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import {
  performance_Realm,
  performance_Server_Relam,
  searchPerformance,
  performance_Type_Pressed
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

class PerformancePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }

  performanceTypePressed(item) {
    var pop_up = false;
    this.props.performance_Type_Pressed({ item, pop_up });
  }

  static navigationOptions = {
    //title: 'Profile',
    headerTintColor: "white"
  };

  componentWillMount() {
    this.props.performance_Realm();
    this.props.performance_Server_Relam();
  }

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => {
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
            onPress={this.performanceTypePressed.bind(this, item.toLowerCase())}
          >
            <Text style={Styles.viewmoreStyle}>View More</Text>
          </TouchableOpacity>
        </View>
      );
    }
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

        this.props.performance_Server_Relam();

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
              onPress={this.performanceTypePressed.bind(this, "weight")}
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
              onPress={this.performanceTypePressed.bind(this, "Body Fat")}
            >
              <Text style={Styles.viewmoreStyle}>View More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { mainContainer, searchContainer, inputStyle } = Styles;

    return (
      <View style={mainContainer}>
        <View style={searchContainer}>
          <View
            style={{
              margin: 15,
              backgroundColor: "white",
              borderRadius: 10
            }}
          >
            <TextInput
              autoCapitalize="none"
              style={inputStyle}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              placeholder="Search"
              placeholderTextColor="#cccccc"
              onChangeText={this._onSearchChange.bind(this)}
            />
          </View>
        </View>

        <FlatList
          data={this.props.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={this._renderEmptyComponent}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ performancered }) => {
  return {
    dataSource: performancered.data
  };
};

export default connect(
  mapStateToProps,
  {
    performance_Realm,
    performance_Server_Relam,
    searchPerformance,
    performance_Type_Pressed
  }
)(PerformancePage);
