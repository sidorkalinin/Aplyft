import React, { PureComponent } from "react";
import { Alert } from "react-native";
import moment from "moment";
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import {
  loadDailyNutrition,
  //lognutrition,
  goto_AddMeal,
  loadDailyNutritionRealm
} from "./actions";
import { colors } from "../../../../../styles/theme";
import Styles from "./styles";
import { Button } from "./../../../../../common";
import DailyNutritionListItem from "./components/DailyNutritionListItem";

class DailyNutritionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
    // loading nutrition data list
    this.counter = 0;
  }

  componentDidMount() {
    this.props.loadDailyNutrition(this.props.workout_date);
    this.props.loadDailyNutritionRealm(this.props.workout_date);
  }

  onAddMeal(id, title) {
    this.props.goto_AddMeal({ id, title });
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => {
    function getTotal_Calories(protein, fat, carbs) {
      var totalCalories = 4 * protein + 4 * carbs + 9 * fat;

      return totalCalories;
    }
    var protein = item.protein_intake;
    var fat = item.fats_intake;
    var carbs = item.carbs_intake;
    var acc_calories = getTotal_Calories(protein, fat, carbs).toString();
    return (
      <DailyNutritionListItem
        item={item}
        title={item.name}
        totalCalories={item.total_calories}
        accCalories={acc_calories}
        onMealPress={this.onAddMeal.bind(this, item.id, item.name)}
      />
    );
  };

  _renderHeader = item => {
    var Total_Meals_Calories = 0;
    var Total_Proteins = 0;
    var Total_Fats = 0;
    var Total_Carbs = 0;
    var Total_Water = 0;

    var Total_Fats_intake = 0;
    var Total_Proteins_intake = 0;
    var Total_Carbs_intake = 0;
    var Total_Water_intake = 0;

    for (var i in this.props.data) {
      row = this.props.data[i];
      if (row.total_calories == "" || row.total_calories == null) {
        var total_calories = 0;
      } else {
        var total_calories = row.total_calories;
      }
      if (row.protein == "" || row.protein == null) {
        var protein = 0;
      } else {
        var protein = row.protein;
      }
      if (row.carbs == "" || row.carbs == null) {
        var carbs = 0;
      } else {
        var carbs = row.carbs;
      }
      if (row.water == "" || row.water == null) {
        var water = 0;
      } else {
        var water = row.water;
      }
      if (row.fats == "" || row.fats == null) {
        var fats = 0;
      } else {
        var fats = row.fats;
      }

      if (row.protein_intake == "" || row.protein_intake == null) {
        var protein_intake = 0;
      } else {
        var protein_intake = row.protein_intake;
      }
      if (row.carbs_intake == "" || row.carbs_intake == null) {
        var carbs_intake = 0;
      } else {
        var carbs_intake = row.carbs_intake;
      }
      if (row.water_intake == "" || row.water_intake == null) {
        var water_intake = 0;
      } else {
        var water_intake = row.water_intake;
      }
      if (row.fats_intake == "" || row.fats_intake == null) {
        var fats_intake = 0;
      } else {
        var fats_intake = row.fats_intake;
      }

      var Total_Meals_Calories =
        Total_Meals_Calories + parseInt(total_calories);
      var Total_Fats = Total_Fats + parseInt(fats);
      var Total_Proteins = Total_Proteins + parseInt(protein);
      var Total_Carbs = Total_Carbs + parseInt(carbs);
      var Total_Water = Total_Water + parseInt(water);

      var Total_Fats_intake = Total_Fats_intake + parseInt(fats_intake);
      var Total_Proteins_intake =
        Total_Proteins_intake + parseInt(protein_intake);
      var Total_Carbs_intake = Total_Carbs_intake + parseInt(carbs_intake);
      var Total_Water_intake = Total_Water_intake + parseInt(water_intake);
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <View style={Styles.HeaderTitleContainer}>
          <View style={{ flex: 1.05, marginLeft: 15 }}>
            <Text style={{ color: "#181f31", fontWeight: "bold" }}>
              Calories
            </Text>
          </View>
          <View style={{ flex: 1.4 }}>
            <Text style={{ color: "#777777", fontWeight: "600" }}>
              {Total_Meals_Calories}
            </Text>
          </View>
        </View>
        <View style={Styles.HeaderRowContainer}>
          <View style={Styles.HeaderInside_RowContainer}>
            <View style={{ flex: 1 }}>
              <Text>Total Proteins (g)</Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={Styles.HeaderRowValues}>{Total_Proteins}</Text>
            </View>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column", marginRight: 5 }}>
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.acc_caloriesStyle}>
                  {Total_Proteins_intake}
                </Text>
              </View>
              <View
                style={{ width: "100%", backgroundColor: "red", height: 1 }}
              />
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.recomendedStyle}>Actual</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.HeaderRowContainer}>
          <View style={Styles.HeaderInside_RowContainer}>
            <View style={{ flex: 1 }}>
              <Text>Total Carbs (g)</Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={Styles.HeaderRowValues}>{Total_Carbs}</Text>
            </View>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column", marginRight: 5 }}>
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.acc_caloriesStyle}>
                  {Total_Carbs_intake}
                </Text>
              </View>
              <View
                style={{ width: "100%", backgroundColor: "red", height: 1 }}
              />
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.recomendedStyle}>Actual</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.HeaderRowContainer}>
          <View style={Styles.HeaderInside_RowContainer}>
            <View style={{ flex: 1 }}>
              <Text>Total Fats (g)</Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={Styles.HeaderRowValues}>{Total_Fats}</Text>
            </View>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column", marginRight: 5 }}>
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.acc_caloriesStyle}>
                  {Total_Fats_intake}
                </Text>
              </View>
              <View
                style={{ width: "100%", backgroundColor: "red", height: 1 }}
              />
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.recomendedStyle}>Actual</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.HeaderRowContainer}>
          <View style={Styles.HeaderInside_RowContainer}>
            <View style={{ flex: 1 }}>
              <Text>Total Water (L)</Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={Styles.HeaderRowValues}>{Total_Water}</Text>
            </View>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column", marginRight: 5 }}>
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.acc_caloriesStyle}>
                  {Total_Water_intake}
                </Text>
              </View>
              <View
                style={{ width: "100%", backgroundColor: "red", height: 1 }}
              />
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={Styles.recomendedStyle}>Actual</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // logNutrition() {
  //   this.props.lognutrition();
  // }

  _renderFooter = item => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 20,
          //borderTopWidth: 6,
          borderColor: "#eeeeee",
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: "row"
        }}
        onPress={this.onAddMeal.bind(this, "", "Meal Addition")}
      >
        <Image
          source={require("../../../../../../assets/images/plus-red-icon.png")}
          style={{
            width: 50,
            height: 50
          }}
        />
        <Text style={{ paddingLeft: 10, fontWeight: "bold", paddingTop: 16 }}>
          Add Meal
        </Text>
      </TouchableOpacity>
    );
  };

  _renderSeparator = () => {
    return <View style={{ height: 5, flex: 1, backgroundColor: "#e2e2e2" }} />;
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // call back once the state is chaged
        // we can make a remote request here
        //console.log("workout_date  @#$%^&*&^%$#@  : ", this.props.workout_date);
        if (this.props.workout_date == null) {
          this.props.loadDailyNutrition(new Date());
        } else {
          var workout_date = this.props.workout_date;
          this.props.loadDailyNutrition(workout_date);
        }
        console.log("done in refresh");

        this.setState({ refreshing: false });
      }
    );
  };

  render() {
    const { mainContainer, emptyComponentContainer } = Styles;
    return (
      <View style={mainContainer}>
        <FlatList
          //extraData={this.state}
          style={{}}
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          //ListEmptyComponent={this._renderEmptyComponent}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ dailyNutritionList, dailyTrainingList }) => {
  const { inputValue, snackValue, count } = dailyNutritionList;

  // loop through the array of WorkoutStack
  var date = new Date();
  for (var index in dailyTrainingList.workouts) {
    let w = dailyTrainingList.workouts[index];
    date = new Date(w.workout_date);
    break;
  }

  return {
    workout_date: date,
    data: dailyNutritionList.data,
    inputValue,
    snackValue,
    count: count,
    isSubmittingNut: dailyNutritionList.nut_loading,
    total_calories_per_day: dailyNutritionList.total_calories_per_day
  };
};

export default connect(
  mapStateToProps,
  {
    loadDailyNutrition,
    goto_AddMeal,
    //lognutrition,
    loadDailyNutritionRealm
  }
)(DailyNutritionScreen);
