import React, { PureComponent } from "react";
import {
  View,
  Text,
  SectionList,
  Alert,
  Modal,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import DailyTrainingListItem from "./components/DailyTrainingListItem";
import {
  loadDailyTrainings,
  gotoExerciseView,
  gotoWarmupView,
  gotoCircuitView,
  logDaySubmit,
  Server_loadDailyWorkouts_Realm,
  closeRatingModal,
  submitRating
} from "./actions";
import moment from "moment";
import { gotoWorkout } from "../../MonthlyView/actions";
import {
  gotoVideoDetail,
  Realm_loadDailyWorkouts
} from "../../../../WorkoutStack/ExerciseScreen/actions";
import { Button } from "../../../../../common";
import styles from "./styles";
import LogDayTrainingModal from "./components/LogDayTrainingModal";
import Rating from "./components/rating";
class DailyTrainingScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      modalVisible: false,
      selected_workout_id: null
    };

    // fetching the data from realm on page load
    // this.props.loadDailyTrainings();
  }

  toggleModal(visible, id) {
    //console.log("workout id is", id);
    this.setState({ modalVisible: visible, selected_workout_id: id });
  }

  _onItemPressed = item => {
    // navigate the user to the specific page wether
    switch (item.type) {
      case "normal":
        // console.log(
        //   "Item in the _onItemPressed is >  > > > !@#$%&*( 3$% )) ",
        //   item
        // );
        if (item.category == "moves") {
          this.props.gotoExerciseView({ title: item.title, id: item.id });
        } else {
          console.log("gotoWarmupView: item.id on ItemPress ", item);
          this.props.gotoWarmupView({ title: item.title, id: item.id });
        }
        break;

      case "circuit":
        this.props.gotoCircuitView({
          title: item.title,
          id: item.id,
          type: item.timer != 0 ? "time" : "set"
        });
        break;

      default:
        break;
    }
  };

  _onVideoItemPress = videoId => {
    //console.log("I am here in video press");
    this.props.gotoVideoDetail(videoId);
  };

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item, index, section }) => {
    //we need to check about the exercise if it exists
    if (item.category == "warmup") {
      console.log(
        "~Q#@~~#@~~@#@#~~ >>??>>>?? rendering item",
        item.exercises[0]
      );
      let title = item.type == "circuit" ? "Circuit" : item.exercises[0].title;
      let description = item.type == "circuit" ? "Circuit" : "Set";
      let videoImageURL = item.exercises[0].thumbnail_url;
      let set_number = item.exercises[0].sets.length;
      return (
        <DailyTrainingListItem
          videoimage={videoImageURL}
          set_length={set_number}
          title={title}
          status={description}
          onItemPress={this._onItemPressed.bind(this, item.exercises[0])}
          onVideoPress={this._onVideoItemPress.bind(
            this,
            item.exercises[0].video_id
          )}
        />
      );
    } else {
      let title = item.type == "circuit" ? "Circuit" : item.exercises[0].title;
      let description = item.type == "circuit" ? "Circuit" : "Set";
      let videoImageURL = item.exercises[0].thumbnail_url;
      let set_number = item.exercises[0].sets.length;
      return (
        <DailyTrainingListItem
          videoimage={videoImageURL}
          set_length={set_number}
          title={title}
          status={description}
          onItemPress={this._onItemPressed.bind(this, item)}
          onVideoPress={this._onVideoItemPress.bind(
            this,
            item.exercises[0].video_id
          )}
        />
      );
    }
  };

  _renderSeparator = () => {
    return <View style={styles.seperatorStyle} />;
  };

  _renderHeader = ({ section }) => {
    return (
      <View
        style={{
          padding: 20,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#eeeeee"
        }}
      >
        <Text style={{ alignSelf: "center" }}>{section.title}</Text>
      </View>
    );
  };

  _renderFooter = ({ section }) => {
    // dont display the button if there is no workouts for today
    if (section.data.length < 1) {
      return <View />;
    }
    if (section.data[0].category == "warmup") {
      return <View />;
    }

    // var date =
    //   +section.workout_date.getFullYear() +
    //   "-" +
    //   ("0" + section.workout_date.getMonth()).slice(-2) +
    //   "-" +
    //   ("0" + section.workout_date.getDate()).slice(-2);
    //
    // // console.log("the workout date is ", new Date(date), "today is", (new Date()) );
    //
    // // we need to enable the log button only if the date is equal or before the current workout date
    // console.log("New Date(date) is : ", new Date(date));
    // console.log("New Date() is : ", new Date());
    // if (new Date(date) > new Date()) return <View />;

    if (!section.is_workout_loged) {
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
          <Button onPress={this._logDayPressed.bind(this, section.workout_id)}>
            <Text>LOG YOUR DAY</Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 6,
            borderColor: "#eeeeee",
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              borderWidth: 0,
              alignSelf: "center",
              padding: 5
            }}
          >
            Press again to submit your changes
          </Text>
          <Button onPress={this._logDayPressed.bind(this, section.workout_id)}>
            <Text>DAY ALREADY LOGGED</Text>
          </Button>
        </View>
      );
    }
  };

  _logDayPressed = workout_id => {
    // console.log("log day button is pressed")
    /*Alert.alert(
            'Are you sure?',
            'This will log your day of training, and the trainer will get notified about your workout',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );*/

    this.toggleModal(true, workout_id);
  };

  _logDaySubmit = ({ text, nut_text }) => {
    // console.log("done pressed");
    this.setState({
      modalVisible: false
    });
    if (this.props.workouts.length > 0) {
      this.props.logDaySubmit({
        date: moment(
          this.props.workouts[this.props.workouts.length - 1].workout_date
        ).format("YYYY-MM-DD"),
        workoutId: this.state.selected_workout_id,
        text: text,
        nut_text: nut_text
      });
    } else {
      this.props.logDaySubmit({
        date: moment().format("YYYY-MM-DD"),
        workoutId: this.state.selected_workout_id,
        text: text,
        nut_text: nut_text
      });
    }
  };

  _logDayCancel = () => {
    this.setState({
      modalVisible: false,
      selected_workout_id: null
    });
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // call back once the state is chaged
        // we can make a remote request here
        //console.log("done in refresh");

        if (this.props.workout_id == null) {
          console.log("I am where the app should resfresh the dailyWorkout");
          // that means we are vieweing the daily workout screen, thus we need to get all the workouts details of that daily
          this.props.Server_loadDailyWorkouts_Realm();
        } else {
          // we are viewing only one workout so we need to fetch its details, access via monthly view
          let workout_id = this.props.workout_id;
          this.props.gotoWorkout({ workout_id });
        }

        // this.props.loadDailyTrainings();
        this.setState({ refreshing: false });
      }
    );
  };

  _renderEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 20,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text>No Workout for today</Text>
        </View>
        {/* <View
          style={{
            flex: 1,
            marginTop: 0,
            paddingVertical: 20,
            borderTopWidth: 6,
            borderColor: "#eeeeee",
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Button
            style={{ padding: 10 }}
            onPress={this._logDayPressed.bind(this, "")}
          >
            <Text>LOG YOUR NUTRITION DAY</Text>
          </Button>
        </View> */}
      </View>
    );
  };
  ratingSubmit = data => {
    let user_rating_comment = data.text;
    let user_rating = data.stars;
    let user_goal_id = this.props.user_goal_id;
    let user_id = this.props.user.id;
    let pt_id = this.props.user.goal[0].personlTrainer.id;

    this.props.submitRating({
      user_rating_comment,
      user_rating,
      user_id,
      user_goal_id,
      pt_id
    });
    this.props.closeRatingModal();
  };
  RatingCancel = () => {
    this.props.closeRatingModal();
  };

  render() {
    const { mainContainer, fetchingContainer, fetchingTextStyle } = styles;
    if (this.props.isFetching) {
      return (
        <View style={fetchingContainer}>
          <ActivityIndicator />
          <Text style={fetchingTextStyle}>Fetching workout details</Text>
        </View>
      );
    }

    if (this.props.workouts.length > 0)
      if (this.props.workouts[0].data)
        if (this.props.workouts[0].data.length < 1) {
          return (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              contentContainerStyle={fetchingContainer}
            >
              <Text style={fetchingTextStyle}>
                Connection needed in order to get your workout details
              </Text>
            </ScrollView>
          );
        }

    // else display the workout details
    return (
      <View style={mainContainer}>
        <Modal
          visible={this.props.isSubmitting}
          transparent
          animationType="fade"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", paddingBottom: 10 }}>
              Logging your day
            </Text>
            <ActivityIndicator />
          </View>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //console.log("Modal has been closed.");
          }}
        >
          <ImageBackground
            style={styles.modal}
            resizeMode="cover"
            source={require("../../../../../../assets/images/background-transparent.png")}
          >
            <LogDayTrainingModal
              date={new Date()}
              onPressSubmit={this._logDaySubmit.bind(this)}
              onPressCancel={this._logDayCancel.bind(this)}
            />
          </ImageBackground>
        </Modal>
        {this.props.user.goal.length > 0 &&
        this.props.user.goal[0].personlTrainer ? (
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.props.workoutRatingModal}
            onRequestClose={() => {
              //console.log("Modal has been closed.");
            }}
          >
            <View style={styles.modal}>
              <Rating
                review_txt_title={
                  this.props.user.goal[0].personlTrainer.ratingStars != null
                    ? "Edit Review"
                    : "Add Review"
                }
                review_btn_title={
                  this.props.user.goal[0].personlTrainer.ratingStars != null
                    ? "Edit Review"
                    : "Add Review"
                }
                text={
                  this.props.user.goal.length > 0
                    ? this.props.user.goal[0].personlTrainer.ratingText
                    : ""
                }
                ratingStars={
                  this.props.user.goal.length > 0
                    ? this.props.user.goal[0].personlTrainer.ratingStars
                    : "0"
                }
                date={new Date()}
                onPressSubmit={this.ratingSubmit.bind(this)}
                onPressCancel={this.RatingCancel.bind(this)}
              />
            </View>
          </Modal>
        ) : null}

        <SectionList
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          sections={this.props.workouts}
          keyExtractor={this._keyextractor}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          renderSectionFooter={this._renderFooter}
          // SectionSeparatorComponent={this._renderSeparator}
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={this._renderEmptyComponent}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ dailyTrainingList, user }) => {
  // this should be a section list not flat list
  console.log(" This.props.WORKOUTS : > > >  > > ", dailyTrainingList);

  var goal = [];
  var usergoal_id = "";

  if (user.user) {
    goal = user.user.goal;
  }

  // goal is a list
  if (goal.length > 0) usergoal_id = goal[0].id;

  return {
    user: user.user,
    user_goal_id: usergoal_id,
    workouts: dailyTrainingList.workouts,
    isSubmitting: dailyTrainingList.loading,
    isFetching: dailyTrainingList.isFetching,
    workout_id: dailyTrainingList.id,
    workoutRatingModal: dailyTrainingList.workoutRatingModal
  };
};

export default connect(
  mapStateToProps,
  {
    loadDailyTrainings,
    Realm_loadDailyWorkouts,
    Server_loadDailyWorkouts_Realm,
    gotoExerciseView,
    gotoWarmupView,
    gotoCircuitView,
    logDaySubmit,
    gotoVideoDetail,
    gotoWorkout,
    submitRating,
    closeRatingModal
  }
)(DailyTrainingScreen);
