import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  Alert,
  StatusBar,
  Modal,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import BarStyles from "../../../styles/tabBarStyle";
import { ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED } from "../../../../variables";
// styles
import { colors } from "../../../styles/theme";

// actions
import {
  loadSearchListItems,
  chooseTrainer,
  gotoPersonalTrainer,
  requestFreeDailyWorkout,
  switchToProfileTab,
  switchToWorkout,
  gotoPayment
} from "./actions";

import { gotoSetGoal } from "../Profile/actions";

// custom components
import RecommendedTrainerItem from "./components/RecommendedTrainerItem";
import { Button } from "../../../common";

class searchTabScreen extends Component {
  static navigationOptions = {
    title: "Fitness Experts",
    headerTintColor: "white",

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../../assets/images/search-icon.png")}
        style={[BarStyles.iconSize, { tintColor: tintColor }]}
      />
    )
  };

  // make it from the navigator
  componentWillMount() {
    // this.props.gotoSetGoal();
  }

  constructor(props) {
    super(props);

    // loading the dta file
    this.props.loadSearchListItems();

    if (this.props.user.goal.length < 1) this.props.gotoSetGoal();
  }
  gotoPersonalTrainer(trainer, status, chosen) {
    this.props.gotoPersonalTrainer({
      trainer: trainer,
      trainerID: trainer.id,
      status: status,
      chosen: chosen
    });
  }

  _freeDailyWorkoutPress = () => {
    // check first if the user have a goal, if not, promp him to set a goal
    if (this.props.user.goal.length < 1) {
      Alert.alert(
        "Set your Goal",
        "You need to set a goal first in order to get a free workout program",
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
        "You have now access to APLYFT's free daily workouts",
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
          {
            text: "Let's do it!",
            onPress: () => this.props.requestFreeDailyWorkout()
          }
        ],
        { cancelable: false }
      );
    }
  };

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => {
    let fullname =
      item.personal_trainer.firstName + " " + item.personal_trainer.lastName;
    return (
      <RecommendedTrainerItem
        //key={item}
        ImageSource={item.personal_trainer.picURL}
        FullName={`${item.personal_trainer.firstName} ${
          item.personal_trainer.lastName
        }`}
        Category={item.personal_trainer.description}
        Location={item.personal_trainer.location}
        country_code={item.personal_trainer.country_code}
        free_trail={item.personal_trainer.free_trail}
        price_range={item.personal_trainer.price_range}
        Stars={item.personal_trainer.stars}
        Price={item.program_price}
        Currency={item.program_currency}
        Duration={item.program_duration}
        onPress={this.gotoPersonalTrainer.bind(
          this,
          item.personal_trainer,
          item.status,
          item.chosen
        )}
        onChooseTrainerButtonPress={this.props.chooseTrainer.bind(
          this,
          item.personal_trainer.id,
          fullname
        )}
        onProcessPaymentPress={this.props.gotoPayment.bind(
          this,
          item.personal_trainer.id
        )}
        status={item.status}
        locked={
          this.props.all_lock
            ? true
            : this.props.selected_trainers >=
              ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED
              ? true
              : false
        }
        showPrice={item.show_price}
        showStars={item.show_stars}
      />
    );
  };

  _renderSeparator = () => {
    return <View style={styles.seperatorStyle} />;
  };

  _renderHeader = () => {
    return <View />;
  };

  _renderFooter = () => {
    if (this.props.user.freedailyWorkout) return <View />;

    return <View />;

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
        <Button onPress={this._freeDailyWorkoutPress.bind(this)}>
          <Text>GET A FREE DAILY WORKOUT</Text>
        </Button>
      </View>
    );
  };

  _dailyWorkoutButton = () => {
    return (
      <View>
        <Text style={{ paddingTop: 15, paddingBottom: 15 }}>
          Congratulations you have your new daily workout available for you
        </Text>
        <Button onPress={this.props.switchToWorkout.bind(this)}>
          <Text>Switch to your free workout</Text>
        </Button>
      </View>
    );
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          Coming Soon
        </Text>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          You will be able to search for and connect with a fitness expert
        </Text>
      </View>
    );

    return (
      <View style={styles.emptyComponentContainer}>
        {this.props.user.freedailyWorkout ? (
          this._dailyWorkoutButton()
        ) : (
          <Text>Create your goal to get your free workout</Text>
        )}
      </View>
    );
  };

  _onRefresh = () => {
    this.props.loadSearchListItems();
  };

  render() {
    const { title, mainContainer } = styles;

    return (
      <ImageBackground
        style={mainContainer}
        source={require("../../../../assets/images/chatbg.jpg")}
      >
        {this.props.isChoosing ? (
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
                Selecting Trainer
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}

        <StatusBar barStyle="light-content" />
        {this.props.data.length > 0 ? (
          <Text style={title}>Recommended Fitness Experts</Text>
        ) : null}

        <FlatList
          data={this.props.data}
          // keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          // ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmptyComponent}
          refreshing={this.props.refreshing}
          onRefresh={this._onRefresh}
        />
      </ImageBackground>
    );
  }
}

const styles = {
  title: {
    fontWeight: "bold",
    backgroundColor: "white",
    padding: 10,
    color: colors.darkBlueColor
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    resizeMode: "center"
  },
  seperatorStyle: {
    height: 6,
    width: "100%",
    backgroundColor: "#eeeeee"
  },
  emptyComponentContainer: {
    padding: 20
    // backgroundColor: 'white'
  }
};

const mapStateToProps = ({ SearchList, user }) => {
  return {
    data: SearchList.data,
    refreshing: SearchList.refreshing,
    isChoosing: SearchList.isChoosing,
    selected_trainers: SearchList.selected_trainers,
    user: user.user,
    all_lock: SearchList.all_lock
  };
};

export default connect(
  mapStateToProps,
  {
    loadSearchListItems,
    chooseTrainer,
    gotoPersonalTrainer,
    gotoSetGoal,
    requestFreeDailyWorkout,
    switchToProfileTab,
    gotoSetGoal,
    switchToWorkout,
    gotoPayment
  }
)(searchTabScreen);
