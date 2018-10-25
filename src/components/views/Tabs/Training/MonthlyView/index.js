import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import BarStyles from "../../../../styles/tabBarStyle";
import { colors } from "../../../../styles/theme";
import { gotoWorkout, loadDataFromRealm, onItemDayPressed } from "./actions";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

class myTrainingTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawableDates: [],
      items: {},
      h: 0
    };
  }

  // helper function to select the default date in the agenda calendr
  selectDate() {
    // we will select the current date
    var today = new Date("2018-01-01");
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  }

  render() {
    let knob = <View style={styles.knobContainer} />;
    return (
      <Agenda
        items={this.props.items}
        //loadItemsForMonth={this.loadItems.bind(this)}
        selected={() => this.timeToString(new Date())}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        renderKnob={() => {
          return (
            <View>
              <View>
                <Text style={{ fontSize: 12 }}>Tap to expand</Text>
              </View>
              {knob}
            </View>
          );
        }}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={this.renderEmptyData.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          backgroundColor: "transparent",
          agendaTodayColor: "#181f2f",
          "stylesheet.day.basic": {
            selected: {
              backgroundColor: "#181f2f",
              borderRadius: 20
            }
          },
          todayTextColor: "red"
        }}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        pastScrollRange={3}
        futureScrollRange={3}
        hideKnob={false}
      />
    );
  }
  _onItemPress = item => {
    // this.props.onItemDayPressed();
    // if this goal is free, forbid the user from accessing other than the current workout
    // console.log(
    //   "this.props.isFreeDailyWorkout is : ",
    //   this.props.isFreeDailyWorkout
    // );
    // console.log("item><>>><<>>> is : ", item);
    // console.log(
    //   "this.props.today_workout_id is @@/ : ",
    //   this.props.today_workout_id
    // );
    // console.log("item.id>>><<< : ", item.id);

    var today_date = moment().format("YYYY-MM-DD");
    var pressed_workout_date = moment(item.date).format("YYYY-MM-DD");
    // console.log("today_date ~~~~~~~~~~~~~~~  :  ", today_date);
    // console.log("pressed_workout_date ~~~~~~~~~~~~ :  ", pressed_workout_date);

    // if (this.props.isFreeDailyWorkout)
    // if (today_date < pressed_workout_date) return;

    this.props.gotoWorkout({
      workout_id: item.id,
      title: item.title,
      openStack: true
    });
  };

  renderItem(item) {
    return (
      <TouchableOpacity onPress={this._onItemPress.bind(this, item)}>
        <View style={[styles.item, { height: 50 }]}>
          <Text style={styles.itemTextStyle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  renderEmptyData() {
    return (
      <View style={styles.emptyDatacontainer}>
        <Text style={styles.emotyDataTextStyle}>
          There is no workout at the selected date
        </Text>
      </View>
    );
  }
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <View style={styles.emptyDateBorder} />
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(date) {
    //const date = new Date(time);
    let formatedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return formatedDate;
  }
}

const styles = {
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderColor: "#181f2f",
    borderWidth: 2
  },
  knobContainer: {
    //flex: 1,
    //position: "absolute",
    left: 0,
    right: 0,
    height: 15,
    borderRadius: 5,
    width: "50%",
    alignSelf: "center",
    bottom: 8,

    top: 3,
    alignItems: "center",
    backgroundColor: "#181f2f"
  },

  itemTextStyle: {
    color: "#181f2f"
  },
  emptyDate: {
    height: 15,
    flex: 1,
    // paddingTop: 20,
    justifyContent: "flex-end",
    padding: 20
  },
  emptyDateBorder: {
    borderTopWidth: 1,
    borderColor: "#eeeeee"
  },
  emptyDatacontainer: {
    padding: 20,
    alignItems: "center"
  },
  emotyDataTextStyle: {
    color: "#bebebe"
  }
};

const mapStateToProps = ({ monthlyViewReducer, user }) => {
  var isFreeDailyWorkout = false;
  if (user.user.goal.length > 0)
    isFreeDailyWorkout = user.user.goal[0].freedailyWorkout;

  return {
    minDate: monthlyViewReducer.minDate,
    maxDate: monthlyViewReducer.maxDate,
    today_workout_id: monthlyViewReducer.today_workout_id,
    isFreeDailyWorkout: isFreeDailyWorkout,
    items: monthlyViewReducer.items
  };
};

export default connect(
  mapStateToProps,
  {
    gotoWorkout,
    onItemDayPressed,
    loadDataFromRealm
  }
)(myTrainingTabScreen);
