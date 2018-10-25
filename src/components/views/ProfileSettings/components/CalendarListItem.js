import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { fetchAllEvents } from "./../actions";

class CalendarListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      check: false
    };
  }
  _getTick() {
    console.log("dasfghfggfdsfghgfdsafghfsadfghfds");
    if (this.state.check) {
      return (
        <Image
          resizeMode="contain"
          style={Styles.rightButtonImage}
          source={require("./../../../../assets/images/check-red-thin.png")}
        />
      );
    }
  }
  onItemPress = () => {
    const { id, title } = this.props.calendarList;
    this.setState({
      check: !this.state.check
    });
    this.props.onItemPress();
  };
  render() {
    const { id, title } = this.props.calendarList;

    const { mainContainer, descriptionContainer, nameStyle } = Styles;

    return (
      <TouchableOpacity onPress={this.onItemPress.bind(this)}>
        <View style={mainContainer}>
          <View style={descriptionContainer}>
            <Text style={nameStyle}>{title}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10
            }}
          >
            {this._getTick()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const Styles = {
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //padding: 20,
    //paddingLeft: 10,
    //borderTopWidth : 4,
    //borderBottomWidth : 4,
    //borderColor: '#eeeeee',
    backgroundColor: "white"
  },

  descriptionContainer: {
    //flex:1,
    //flexDirection: 'column',
    marginTop: 20,
    paddingLeft: 10,
    paddingBottom: 25,
    justifyContent: "flex-end"
  },

  nameStyle: {
    //fontFamily:'Zetta Serif',
    fontSize: 16,
    fontWeight: "700",
    color: "#000000"
  },
  rightButtonImage: {
    width: 20,
    height: 20,
    padding: 10
  }
};

const mapStatetoProps = state => {};

export default connect(
  null,
  {
    fetchAllEvents
  }
)(CalendarListItem);
