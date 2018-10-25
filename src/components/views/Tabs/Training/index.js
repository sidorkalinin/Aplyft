import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import BarStyles from "../../../styles/tabBarStyle";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {
  loadWorkoutFromServer,
  requestFreeDailyWorkout,
  refreshDailyWorkoutView
} from "./actions";
import { gotoSetGoal } from "../Profile/actions";
import {
  Realm_loadDailyWorkouts,
  Server_loadDailyWorkouts_Realm,
  RefreshingTab_0,
  RefreshingTab_1
} from "./DailyView/DailyTrainingScreen/actions";
import firebase from "react-native-firebase";
import Mixpanel from "react-native-mixpanel";
import { loadDailyNutrition } from "./DailyView/DailyNutritionScreen/actions";
//custom pages
import DailyView from "./DailyView";
import MonthlyView from "./MonthlyView";
import CustomTabBar from "./CustomTabBar";
import { colors } from "../../../styles/theme";
import { Button } from "../../../common";

class myTrainingsScreen extends Component {
  static navigationOptions = {
    title: "My Training",
    headerTintColor: "white",

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../../assets/images/my-training-icon.png")}
        style={[BarStyles.iconSize, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      refresh_corres_action: 0
    };
    // triggering the data load
  }

  componentWillMount() {
    this.props.loadWorkoutFromServer();
    this.props.loadDailyNutrition(new Date());
    // this.props.Realm_loadDailyWorkouts();
    // this.props.Server_loadDailyWorkouts_Realm();
  }

  _freeDailyWorkoutPress = (category_id) => {
    if(Platform.OS != "android")
      firebase.analytics().logEvent("request_free_workout");
    Mixpanel.track("SuggestedTrainersScreen_Requesting free daily workout");
    // check first if the user have a goal, if not, promp him to set a goal
    if (this.props.goal.length < 1) {
      Alert.alert(
        "Set your Goal",
        "Please set your goal to receive your complementary program",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "destructive"
          },
          { text: "Ok", onPress: () => this.props.gotoSetGoal() }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Congratulations!",
        "You have now access to a free daily workouts",
        [
          {
            text: "Cancel",
            onPress: () => {
              if(Platform.OS != "android")
                firebase.analytics().logEvent("request_free_workout_cancel");
              Mixpanel.track(
                "TrainningTabScreen_Pressed Cancel on free daily workout Popup"
              );
            }
          },
          {
            text: "Let's do it!",
            onPress: () => this.props.requestFreeDailyWorkout(category_id)
          }
        ],
        { cancelable: false }
      );
    }
  };

  _renderIPFWorkoutButton = () => {
    if (this.props.goal.length > 0)
      switch(String(this.props.goal[0].category_id)) {
        case "22": // off season
          return (
            <View
              style={{
                paddingVertical: 5,
                // borderTopWidth: 6,
                // borderColor: "#eeeeee",
                paddingLeft: 10,
                paddingRight: 10,
              }} >
              <TouchableOpacity
              style={styles.IPFButtonContainer}
              onPress={this._freeDailyWorkoutPress.bind(this, 100)}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    width: 50,
                  }} >
                  <Image
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                    source={require("assets/images/IPF2.png")}
                  />
                </View>
                <Text style={styles.IPFButtonText}> IPF PROGRAM</Text>
              </TouchableOpacity>
            </View>
          );
      }

    return null;
  };

  _renderFreeDailyWorkoutButton = () => {
    return (
      <View style={{justifyContent:'center'}}>
        <View
          style={{
            paddingVertical: 20,
            // borderTopWidth: 6,
            // borderColor: "#eeeeee",
            paddingLeft: 10,
            paddingRight: 10,
          }} >
          
          <TouchableOpacity
          style={[styles.IPFButtonContainer,{backgroundColor: '#181f31', borderColor: '#181f31'}]}
          onPress={this._freeDailyWorkoutPress.bind(this, null)}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                width: 50,
              }} >
              <Image
                resizeMode="contain"
                style={{ width: 30, height: 30}}
                source={require("assets/images/APLYFT.png")}
              />
            </View>
            <Text style={[styles.IPFButtonText,{color:'white'}]}> APLYFT PROGRAM</Text>
          </TouchableOpacity>
          
        </View>
        {this._renderIPFWorkoutButton()}
      </View>
    );
  };

  _onChangeTab = ({ i, ref }) => {
    if (i == 0) {
      //console.log("I am where the state is refresh_corres_action == 0 ");
      this.props.RefreshingTab_0(null);
      this.props.refreshDailyWorkoutView();
      this.props.loadDailyNutrition(new Date());
    }
  };

  _onRefresh = () => {
    // if (this.state.refresh_corres_action == 0) {
    //   console.log(
    //     "I am where the state is refresh_corres_action == 0 and Server_loadDailyWorkouts_Realm"
    //   );
    //   this.props.Server_loadDailyWorkouts_Realm();
    // } else if (this.state.refresh_corres_action == 1) {
    //   console.log(
    //     "I am where the state is refresh_corres_action == 1 and loadWorkoutFromServer"
    //   );
    this.props.loadWorkoutFromServer();
    // }
  };

  render() {
    const { underlineStyle } = styles;

    // console.log("...!!!...THIS>PROPS>DATA contains : ", ...this.props.data);
    if (this.props.data.length > 0 || this.props.nutritionData.length > 0) {
      return (
        <ImageBackground
          style={{ flex: 1, resizeMode: "center" }}
          source={require("../../../../assets/images/chatbg.jpg")}
        >
          <ScrollableTabView
            tabBarUnderlineStyle={underlineStyle}
            locked={true}
            renderTabBar={() => <CustomTabBar />}
            prerenderingSiblingsNumber={1}
            onChangeTab={this._onChangeTab.bind(this)}
          >
            <DailyView tabLabel="Daily View" />
            <MonthlyView tabLabel="Monthly View" />
          </ScrollableTabView>
        </ImageBackground>
      );
    }

    // or if no workout is avaiable in realm db
    return (
      <View style={{ flex: 1 }}>
        {this.props.refreshing ? (
          <Modal transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", paddingBottom: 10 }}>
                Building your free program
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}

        {// undefined when opt out
        this.props.isOnPaidPlan ? (
          <ScrollView
            style={styles.mainContainer}
            // refreshing={this.props.fetchingData}
            // onRefresh={this._onRefresh}
            refreshControl={
              <RefreshControl
                refreshing={this.props.fetchingData}
                onRefresh={this._onRefresh.bind(this)}
                // title="Loading..."
              />
            }
          >
            <Text style={styles.textStyle}>
              Your fitness expert is working on your tailored program. Your
              workout will be avaiable soon
            </Text>
          </ScrollView>
        ) : (
          <ScrollView
            style={[styles.mainContainer, {padding: 0}]}
            // refreshing={this.props.fetchingData}
            // onRefresh={this._onRefresh}
            refreshControl={
              <RefreshControl
                refreshing={this.props.fetchingData}
                onRefresh={this._onRefresh.bind(this)}
                // title="Loading..."
              />
            }
          >
            <Text style={styles.textStyle}>
              Choose your FREE Training Program
            </Text>
            {this._renderFreeDailyWorkoutButton()}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = {
  underlineStyle: {
    backgroundColor: "white"
  },
  mainContainer: {
    padding: 20,
    // backgroundColor: colors.backgroundGray,
    flex: 1
  },
  textStyle: {
    color: "#bbbbbb",
    padding: 20,
    textAlign: 'center'
  },

  IPFButtonContainer : {
    flex: 1,
    //alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset:{ width: 2, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  IPFButtonText:{
    alignSelf: 'center',
    color: '#181f31',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    width:150
  }
  
};

const mapStateToProps = ({ user, trainingTab }) => {
  var workouts = [];
  var nutrition = [];
  var goal = [];
  var isOnPaidPlan = false;

  if (user.user) {
    workouts = user.user.workouts;
    nutrition = user.user.nutritions;
    goal = user.user.goal;
  }

  // goal is a list
  if (goal.length > 0) isOnPaidPlan = goal[0].isOnPaidPlan;

  return {
    refreshing: trainingTab.requesting_free_daily_workout,
    data: workouts,
    nutritionData: nutrition,
    goal: goal,
    isOnPaidPlan: isOnPaidPlan,
    fetchingData: trainingTab.fetchingData
  };
};

export default connect(
  mapStateToProps,
  {
    loadWorkoutFromServer,
    Realm_loadDailyWorkouts,
    Server_loadDailyWorkouts_Realm,
    requestFreeDailyWorkout,
    gotoSetGoal,
    refreshDailyWorkoutView,
    RefreshingTab_0,
    RefreshingTab_1,
    loadDailyNutrition
  }
)(myTrainingsScreen);
