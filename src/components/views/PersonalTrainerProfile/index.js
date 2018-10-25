import React, { Component } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import ScrollableTabView from "react-native-scrollable-tab-view";

// custom components
import { Card, CardSection } from "../../common";
import Avatar from "../../Avatar";
import Rating from "../../Rating";
import Button from "../../Button";
import { getPersonalTrainerInfo } from "./actions";
import { chooseTrainer, cancelTrainer } from "./../Tabs/Search/actions";
import AboutTrainerScreen from "./components/AboutTrainerScreen";
import TrainerReviewsScreen from "./components/TrainerReviewsScreen";
import PricePlanningScreen from "./components/PricePlanningScreen";

class PersonalTrainerProfileScreen extends Component {
  constructor(props) {
    super(props);
    var trainerId = this.props.navigation.state.params.payload.trainerID;
    var status = this.props.navigation.state.params.payload.status;
  }

  static navigationOptions = {
    headerTintColor: "white"
  };

  state = {};
  componentDidMount() {
    setTimeout(() => this.scrollableTabView.goToPage(0), 200);
  }
  componentWillMount() {
    var trainerId = this.props.navigation.state.params.payload.trainerID;
    this.props.getPersonalTrainerInfo(trainerId);
  }
  choose_Trainer(id, plan_name) {
    var personalTrainerInfo = this.props.personalTrainer.personalinfo;
    var fullname =
      personalTrainerInfo.firstName + " " + personalTrainerInfo.lastName;
    var trainer_id = personalTrainerInfo.id;

    this.props.chooseTrainer({ fullname, trainer_id, id, plan_name });
  }
  cancel_Trainer(id) {
    var personalTrainerInfo = this.props.personalTrainer.personalinfo;
    var fullname =
      personalTrainerInfo.firstName + " " + personalTrainerInfo.lastName;
    var trainer_id = personalTrainerInfo.id;

    this.props.cancelTrainer({ fullname, trainer_id, id });
  }

  render() {
    const {
      mainContainer,
      underlineStyle,
      tabBarTextStyle,
      trainerContainerStyle,
      trainerImageContainer,
      trainerImageStyle,
      trainerNameStyle,
      trainerLocationStyle,
      trainerDetailStyle,
      trainerDescriptionStyle,
      profileDetailSection
    } = Styles;
    var personalTrainerInfo = this.props.personalTrainer.personalinfo;
    var status = this.props.navigation.state.params.payload.status;
    var chosen = this.props.navigation.state.params.payload.chosen;
    return (
      <View style={mainContainer}>
        <View style={trainerContainerStyle}>
          <View style={trainerImageContainer}>
            <Image
              style={trainerImageStyle}
              source={{
                uri: this.props.personalTrainer.personalinfo.picURL
              }}
            />
          </View>
          <View style={profileDetailSection}>
            <View>
              <Text style={trainerNameStyle}>
                {this.props.personalTrainer.personalinfo.firstName}{" "}
                {this.props.personalTrainer.personalinfo.lastName}
              </Text>
            </View>
            <View style={{ width: "70%" }}>
              <Text style={trainerDescriptionStyle}>
                {this.props.personalTrainer.personalinfo.description}
              </Text>
            </View>
            <View>
              <Text style={trainerLocationStyle}>
                {this.props.personalTrainer.personalinfo.location}
              </Text>
            </View>
            <View>
              <Rating stars={this.props.personalTrainer.personalinfo.stars} />
            </View>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <ScrollableTabView
            ref={ref => {
              this.scrollableTabView = ref;
            }}
            style={{ height: null, backgroundColor: "#fff" }}
            tabBarUnderlineStyle={underlineStyle}
            tabBarBackgroundColor="#ffffff"
            tabBarActiveTextColor="#ea1e39"
            tabBarInactiveTextColor="#bcbcbc"
            prerenderingSiblingsNumber={true}
            initialPage={0}
          >
            <AboutTrainerScreen
              tabLabel="About"
              aboutinfo={this.props.personalTrainer.personalinfo}
              aboutbio={this.props.personalTrainer.personal_trainer_bio}
              aboutcert={
                this.props.personalTrainer.personal_trainer_certification
              }
              aboutVideoURL={
                this.props.personalTrainer.personal_trainer_video_url
              }
              aboutage={this.props.personalTrainer.personal_trainer_age}
              aboutlang={this.props.personalTrainer.personal_trainer_languages}
              aboutareaofexp={
                this.props.personalTrainer.personal_trainer_areaofexpertise
              }
            />

            <PricePlanningScreen
              chosenId={this.props.personalTrainer.chosen}
              tabLabel="Plans"
              isPaid={this.props.user.user.goal[0].isOnPaidPlan}
              planningList={this.props.personalTrainer.planningList}
              onChooseTrainerButtonPress={this.choose_Trainer.bind(this)}
              onCancelTrainerButtonPress={this.cancel_Trainer.bind(this)}
              status={status}
            />

            <TrainerReviewsScreen
              tabLabel="Reviews"
              reviews_data={this.props.personalTrainer.reviews_data}
              //props here
            />
          </ScrollableTabView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ personalTrainer, user }) => {
  // that means the reducer structure is directly reflected int this page. we can ofcourse change it
  return {
    personalTrainer: personalTrainer,
    user: user
  };
};

export default connect(
  mapStateToProps,
  {
    getPersonalTrainerInfo,
    cancelTrainer,
    chooseTrainer
  }
)(PersonalTrainerProfileScreen);
