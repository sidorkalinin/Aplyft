import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  DatePickerIOS,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { Button } from "../../../../components/common";
import styles from "./styles";
import moment from "moment";
import AndroidDatePicker from "../../../../components/common/AndroidDatePicker";
import {
  change_option_Pressed,
  inputChange,
  getValues,
  onResetPress,
  updateIsResetting,
  submitVal,
  addNewInput,
  resetRecord,
  onSetPerformanceDate
} from "./actions";
import convert from "convert-units";
import {
  performance_Realm,
  performance_Server_Relam
} from "./components/actions";

import BarStyles from "../../../styles/tabBarStyle";
import { LineChart, Path, YAxis, Grid, XAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import {
  Circle,
  G,
  Line,
  Rect,
  ClipPath,
  Defs,
  Text as ChartText
} from "react-native-svg";
import Share from "react-native-share";

class PerformancePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Performance",
      headerTintColor: "white",
      headerLeft: (
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => params.handleSharePress()}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Share</Text>
        </TouchableOpacity>
      ),
      /* until this feature is complete */
      /*headerRight: (
        <TouchableOpacity style={{padding:15}} onPress = {() => params.handleExportPress()}>
          <Text style={{color:'white', fontSize: 15}}>Export</Text>
        </TouchableOpacity>
      ),*/
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("../../../../assets/images/performance-icon.png")}
          style={[BarStyles.iconSize, { tintColor: tintColor }]}
        />
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isAdding: this.props.isAdding,
      addnewInput: false,
      refreshedPage: false,
      FlatListData: this.props.flatListData,
      refreshingFlatListData: this.props.refreshingFlatListData
    };
  }

  componentWillMount() {
    let option = {
      name: "Weight",
      value: "weight"
    };

    let selectOption = true ? { type: option } : { duration: option }; // inorder to keep the same structure  like how its called in the component/SelectOptionPage, i passed true only to get the type obj
    let duration_id = this.props.duration.value;
    let itemType = this.props.type.value;

    this.props.performance_Server_Relam({
      itemType,
      duration_id,
      selectOption
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSharePress: this._shareButtonPressed,
      handleExportPress: this._exportButtonPressed
    });
  }
  _shareButtonPressed = () => {
    let shareOptions = {
      title: "APLYFT",
      message: "Share performance test",
      url: "http://facebook.github.io/react-native",
      subject: "Share performance"
    };
    Share.open(shareOptions);
  };

  _exportButtonPressed = () => {
    const exportURL =
      "type=" +
      this.props.type.value +
      "&duration=" +
      this.props.duration.value;
    alert(exportURL);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("I am in the Component Did Update ");
    if (
      prevProps.isAdding !== this.props.isAdding ||
      prevProps.refreshingFlatListData !== this.props.refreshingFlatListData
    ) {
      // console.log("Yess The Prev and now are different ");
      // console.log("The prevProps and prevState are : ", prevProps, prevState);
      this.forceUpdate();
    }
  }

  _onInputChange = text => {
    this.props.inputChange(text);
  };

  _onResetPress = () => {
    this.props.onResetPress(this.props.type.value);
  };

  _renderXaxisLabels = (item, index) => {
    return this.props.datavalue[index].date;
  };

  _renderStarttext() {
    if (this.props.datavalue.length > 0) {
      var startText = this.props.datavalue[1];
      if (this.props.data[0] != undefined) {
        //console.log('DATA is: ',this.props.data[0].value_type);

        if (this.props.isMetric == true) {
          //console.log('I am in Metric');

          switch (this.props.data[0].value_type) {
            case "weight":
              return (
                <Text style={styles.comparisonDataText}>{startText} kg</Text>
              );

            case "distance":
              return (
                <Text style={styles.comparisonDataText}>{startText} m</Text>
              );

            case "time":
              return (
                <Text style={styles.comparisonDataText}>{startText} sec</Text>
              );

            case "percentage":
              return (
                <Text style={styles.comparisonDataText}>{startText} %</Text>
              );
            default:
              return state;
          }
        } else {
          switch (this.props.data[0].value_type) {
            case "weight":
              return (
                <Text style={styles.comparisonDataText}>{startText} lb</Text>
              );

            case "distance":
              return (
                <Text style={styles.comparisonDataText}>{startText} feet</Text>
              );

            case "time":
              return (
                <Text style={styles.comparisonDataText}>{startText} sec</Text>
              );

            case "percentage":
              return (
                <Text style={styles.comparisonDataText}>{startText} %</Text>
              );
            default:
              return state;
          }
        }
      }
    }
  }
  _renderCurrenttext() {
    if (this.props.datavalue.length > 0) {
      var currentText = this.props.datavalue[this.props.datavalue.length - 2];
      if (this.props.data[0] != undefined) {
        //console.log('DATA is: ',this.props.data[0].value_type);

        if (this.props.isMetric == true) {
          //console.log('I am in Metric');

          switch (this.props.data[0].value_type) {
            case "weight":
              return (
                <Text style={styles.comparisonDataText}>{currentText} kg</Text>
              );

            case "distance":
              return (
                <Text style={styles.comparisonDataText}>{currentText} m</Text>
              );

            case "time":
              return (
                <Text style={styles.comparisonDataText}>{currentText} sec</Text>
              );

            case "percentage":
              return (
                <Text style={styles.comparisonDataText}>{currentText} %</Text>
              );
            default:
              return state;
          }
        } else {
          switch (this.props.data[0].value_type) {
            case "weight":
              return (
                <Text style={styles.comparisonDataText}>{currentText} lb</Text>
              );

            case "distance":
              return (
                <Text style={styles.comparisonDataText}>
                  {currentText} feet
                </Text>
              );

            case "time":
              return (
                <Text style={styles.comparisonDataText}>{currentText} sec</Text>
              );

            case "percentage":
              return (
                <Text style={styles.comparisonDataText}>{currentText} %</Text>
              );
            default:
              return state;
          }
        }
      }
    }
  }
  _renderChangeHeader() {
    if (this.props.datavalue.length > 0) {
      var startText = this.props.datavalue[1];
      var currentText = this.props.datavalue[this.props.datavalue.length - 2];
      var changeText = currentText - startText;
      var percentage = Math.round((changeText * 100) / startText);
      if (this.props.data[0] != undefined) {
        if (this.props.data[0].value_type == "percentage") {
          return <Text style={styles.comparisonTitle}>Change</Text>;
        } else {
          return (
            <Text style={styles.comparisonTitle}>Change ({percentage}%)</Text>
          );
        }
      }
    }
  }
  _renderChangetext() {
    if (this.props.datavalue.length > 0) {
      var startText = this.props.datavalue[1];
      var currentText = this.props.datavalue[this.props.datavalue.length - 2];
      var changeText = currentText - startText;
      if (this.props.data[0] != undefined) {
        //console.log('DATA is: ',this.props.data[0].value_type);

        if (this.props.isMetric == true) {
          //console.log('I am in Metric');

          switch (this.props.data[0].value_type) {
            case "weight":
              return (
                <Text style={styles.comparisonDataText}>{changeText} kg</Text>
              );

            case "distance":
              return (
                <Text style={styles.comparisonDataText}>{changeText} m</Text>
              );

            case "time":
              return (
                <Text style={styles.comparisonDataText}>{changeText} sec</Text>
              );

            case "percentage":
              return (
                <Text style={styles.comparisonDataText}>{changeText} %</Text>
              );
            default:
              return state;
          }
        } else {
          switch (this.props.data[0].value_type) {
            case "weight":
              return (
                <Text style={styles.comparisonDataText}>{changeText} lb</Text>
              );

            case "distance":
              return (
                <Text style={styles.comparisonDataText}>{changeText} feet</Text>
              );

            case "time":
              return (
                <Text style={styles.comparisonDataText}>{changeText} sec</Text>
              );

            case "percentage":
              return (
                <Text style={styles.comparisonDataText}>{changeText} %</Text>
              );
            default:
              return state;
          }
        }
      }
    }
  }

  _renderTitle = () => {
    //console.log('isMetric is: ',this.props.isMetric);

    if (this.props.data[0] != undefined) {
      //console.log('DATA is: ',this.props.data[0].value_type);

      if (this.props.isMetric == true) {
        //console.log('I am in Metric');

        switch (this.props.data[0].value_type) {
          case "weight":
            return (
              <View>
                <Text> kg / weeks</Text>
              </View>
            );

          case "distance":
            return (
              <View>
                <Text> m / weeks</Text>
              </View>
            );

          case "time":
            return (
              <View>
                <Text> sec / weeks</Text>
              </View>
            );

          case "percentage":
            return (
              <View>
                <Text> % / weeks</Text>
              </View>
            );
          default:
            return state;
        }
      } else {
        switch (this.props.data[0].value_type) {
          case "weight":
            return (
              <View>
                <Text> lb / weeks</Text>
              </View>
            );

          case "distance":
            return (
              <View>
                <Text> feet / weeks</Text>
              </View>
            );

          case "time":
            return (
              <View>
                <Text> sec / weeks</Text>
              </View>
            );

          case "percentage":
            return (
              <View>
                <Text> % / weeks</Text>
              </View>
            );
          default:
            return state;
        }
      }
    }
  };

  changeOption(isType) {
    this.props.change_option_Pressed({ isType });
  }

  onSubmitVal(inputVal, type) {
    let duration_id = this.props.duration.value;
    let itemType = this.props.type.value;
    let perfomance_date = this.props.date;
    if (itemType.toLowerCase() == "body fat") {
      var option = {
        name: itemType.toCamelCase(),
        value: itemType.toLowerCase()
      };
    } else {
      var option = {
        name: itemType.toCamelCase(),
        value: itemType.toLowerCase()
      };
    }

    let selectOption = true ? { type: option } : { duration: option }; // inorder to keep the same structure  like how its called in the component/SelectOptionPage, i passed true only to get the type obj
    // console.log("The inputVal in the submitVal func is : ", inputVal);
    this.props.submitVal({
      inputVal,
      type,
      itemType,
      duration_id,
      selectOption,
      perfomance_date
    });
    this.props.addNewInput(false);
  }

  _renderAddValue() {
    if (
      this.props.type.value == "weight" ||
      this.props.type.value == "Weight" ||
      this.props.type.value == "Body Fat" ||
      this.props.type.value == "body fat"
    ) {
      return (
        <TouchableOpacity
          onPress={this.onAddInput.bind(this)}
          style={{
            alignSelf: "center",
            //borderWidth: 2,
            margin: 10,
            borderRadius: 40
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 70,
              height: 70,
              borderRadius: 35
            }}
          >
            <Text
              style={{
                marginBottom: 14,
                alignSelf: "center",
                fontSize: 100,
                fontWeight: "300",
                color: "white"
              }}
            >
              +
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  cancelInputModal() {
    this.props.addNewInput(false);
  }
  onAddInput() {
    this.props.addNewInput(true);
  }

  _renderDots = ({ x, y, index }) => {
    // console.log("this.props.datavalue is: >>>>>> : ", this.props.datavalue);
    if (index == 0 || index == this.props.datavalue.length - 1) {
      return <G />;
    }
    return (
      <G x={x(index)} y={y(this.props.datavalue[index])}>
        <ChartText textAnchor="middle" y={-15}>
          {this.props.datavalue[index]}
        </ChartText>

        <Circle r={4} stroke={"rgb(244, 0, 0)"} strokeWidth={2} fill={"red"} />
      </G>
    );
  };

  onDeleteRecord(item_value, item_id, item_type, item_value_type) {
    let duration_id = this.props.duration.value;
    let itemType = this.props.type.value;
    if (itemType.toLowerCase() == "body fat") {
      var option = {
        name: item_type.toCamelCase(),
        value: item_type.toLowerCase()
      };
    } else {
      var option = {
        name: item_type.toCamelCase(),
        value: item_value_type.toLowerCase()
      };
    }

    let selectOption = true ? { type: option } : { duration: option };
    this.props.resetRecord({
      item_value,
      item_id,
      duration_id,
      itemType,
      selectOption
    });
  }
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => {
    if (this.props.isMetric) {
      var item_value = item.value;
      if (item.value_type == "weight") {
        var unitSymbol = "Kg";
      } else if (item.value_type == "percentage") {
        var unitSymbol = "%";
      } else if (item.value_type == "time") {
        var unitSymbol = "s";
      } else if (item.value_type == "distance") {
        var unitSymbol = "cm";
      }
    } else {
      if (item.value_type == "weight") {
        var item_value = convert(item.value)
          .from("kg")
          .to("lb");
        var unitSymbol = "lb";
      } else if (item.value_type == "percentage") {
        var item_value = item.value;
        var unitSymbol = "%";
      } else if (item.value_type == "time") {
        var item_value = item.value;
        var unitSymbol = "s";
      } else if (item.value_type == "distance") {
        var item_value = convert(item.value)
          .from("cm")
          .to("in");
        var unitSymbol = "inches";
      }
    }
    if (
      item.type == "weight" ||
      item.type == "Weight" ||
      item.type == "body fat" ||
      item.type == "Body Fat" ||
      item.type == "bodyfat"
    ) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // marginTop: 10,
            // marginBottom: 10,
            // marginLeft: 10,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              backgroundColor: "white"
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                {Math.round(item_value * 100) / 100}
                {unitSymbol}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {moment(item.date).format("dddd DD, MMMM YYYY ")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.onDeleteRecord.bind(
              this,
              item_value,
              item.id,
              item.type,
              item.value_type
            )}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 20,
              paddingLeft: 20
            }}
          >
            <Image
              style={{ width: 22, height: 22 }}
              source={require("assets/images/trash-icon.png")}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            backgroundColor: "white"
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {Math.round(item_value * 100) / 100}
              {unitSymbol}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              {moment(item.date).format("dddd DD, MMMM YYYY ")}
            </Text>
          </View>
        </View>
      );
    }
  };
  _renderSeparator = () => {
    return <View style={styles.seperatorStyle} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text
          style={{
            color: "#bbbbbb",
            textAlign: "center",
            padding: 20,
            paddingBottom: 0
          }}
        >
          No Previous Performance Records
        </Text>
      </View>
    );
  };
  _renderHeader = () => {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#EEEEEE",
          height: 50
        }}
      >
        <View
          style={{
            marginLeft: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Entries</Text>
        </View>
      </View>
    );
  };

  setDate(newDate) {
    // this.setState({ chosenDate: newDate });
    this.props.onSetPerformanceDate({ newDate });
  }

  render() {
    const axesSvg = {
      rotation: 0,

      fontSize: 10,
      fill: "black",
      originY: 30
    };
    const indexToClipFrom = 10;
    const Clips = ({ x, width }) => {
      return (
        <Defs key={"clips"}>
          <ClipPath id="clip-path-1">
            <Rect x={"0"} y={"0"} width={x(1)} height={"100%"} />
          </ClipPath>
          <ClipPath id={"clip-path-2"}>
            <Rect
              x={x(1)}
              y={"0"}
              width={width - 2 * (x(1) - x(0))}
              height={"100%"}
            />
          </ClipPath>
          <ClipPath id={"clip-path-3"}>
            <Rect
              x={x(this.props.datavalue.length - 2)}
              y={"0"}
              width={width - x(this.props.datavalue.length - 1)}
              height={"100%"}
            />
          </ClipPath>
        </Defs>
      );
    };

    const DashedLine = ({ line }) => {
      return (
        <Path
          key={"line-1"}
          d={line}
          stroke={"rgb(244, 0, 0)"}
          strokeWidth={2}
          fill={"none"}
          strokeDasharray={[4, 4]}
          clipPath={"url(#clip-path-2)"}
        />
      );
    };
    const Shadow = ({ line }) => (
      <Path
        key={"shadow"}
        y={2}
        d={line}
        fill={"none"}
        strokeWidth={4}
        stroke={"rgb(244, 0, 0, 0.2)"}
        clipPath={"url(#clip-path-2)"}
      />
    );

    var inputVal = this.props.inputvalue;
    // console.log("this.props.inputVal", this.props.inputvalue);
    console.log("this.props.date", this.props.date);
    var performanceType = this.props.type.value;
    var addnewInput = this.props.addnewInput;
    var date = this.props.date;
    return (
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <ScrollView style={styles.mainContainer}>
          <View style={styles.headerTabContainer}>
            <TouchableOpacity
              onPress={this.changeOption.bind(this, true)}
              style={{
                flex: 1,
                backgroundColor: "#cccccc",
                alingItems: "center",
                justifyContent: "center",
                margin: 2,
                marginRight: 1
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center"
                }}
              >
                {this.props.type.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.changeOption.bind(this, false)}
              style={{
                flex: 1,
                backgroundColor: "#cccccc",
                alingItems: "center",
                justifyContent: "center",
                margin: 2,
                marginLeft: 1
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center"
                }}
              >
                {this.props.duration.name}
              </Text>
            </TouchableOpacity>
          </View>
          {this.props.isResetting ? (
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
                  Resettting Performance Type
                </Text>
                <ActivityIndicator />
              </View>
            </Modal>
          ) : (
            <View />
          )}

          {/* {this.props.isAdding ? (
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
                  Adding A New Performance Value
                </Text>
                <ActivityIndicator />
              </View>
            </Modal>
          ) : (
            <View />
          )} */}
          <Modal
            visible={addnewInput}
            transparent
            animationType="fade"
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 100,
                  marginBottom: 100,
                  width: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 20,
                  height: "85%"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      // marginLeft: 35,
                      marginBottom: 10
                    }}
                  >
                    <Text style={{ fontWeight: "900", color: "#181f31" }}>
                      Input a New Value
                    </Text>
                  </View>

                  <View style={styles.searchContainer}>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.inputStyle}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      autoCorrect={false}
                      placeholder="Your New Value is..."
                      placeholderTextColor="#cccccc"
                      value={this.props.inputvalue}
                      onChangeText={this._onInputChange.bind(this)}
                    />
                  </View>
                </View>

                {Platform.OS === "ios" ? ( //determining whether ios or android to use different UI
                  <View
                    style={{
                      flex: 2,
                      width: "94%",
                      marginTop: 15,
                      marginLeft: 15,
                      marginRight: 15,
                      height: "auto",
                      backgroundColor: "#F0EFEF",
                      borderRadius: 5
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 20,
                        marginLeft: 12,
                        color: "#AEAEAE"
                      }}
                    >
                      Date
                    </Text>

                    <DatePickerIOS
                      date={date}
                      mode={"date"}
                      onDateChange={this.setDate.bind(this)}
                      maximumDate={
                        new Date(
                          moment()
                            .add(1, "d")
                            .format("YYYY-MM-DD")
                        )
                      }
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      width: "94%",
                      marginTop: 15,
                      marginLeft: 15,
                      marginRight: 15,
                      // height: "10%",
                      backgroundColor: "#FFF",
                      borderRadius: 5
                    }}
                  >
                    <View style={{ backgroundColor: "#F0EFEF" }}>
                      <Text
                        style={{
                          marginTop: 20,
                          marginLeft: 12,
                          color: "#AEAEAE"
                        }}
                      >
                        Date
                      </Text>
                    </View>

                    <View style={{ justifyContent: "center" }}>
                      <AndroidDatePicker
                        value={moment(date).format("DD MMMM YYYY")}
                        onDateChange={this.setDate.bind(this)}
                      />
                    </View>
                  </View>
                )}

                <View
                  style={{
                    alingItems: "center",
                    justifyContent: "center",
                    height: 45,
                    marginTop: 20,
                    width: "82%"
                  }}
                >
                  <Button
                    onPress={this.onSubmitVal.bind(
                      this,
                      inputVal,
                      performanceType
                    )}
                  >
                    SUBMIT VALUE
                  </Button>
                </View>
                <TouchableOpacity
                  onPress={this.cancelInputModal.bind(this)}
                  style={{
                    alingItems: "center",
                    justifyContent: "center",

                    marginTop: 20,
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      color: "#cccccc",
                      fontSize: 16,
                      textDecorationLine: "underline"
                    }}
                  >
                    cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              flexDirection: "row",
              margin: 10
              // marginLeft: 10
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.comparisonTitle}>Start</Text>
              {this._renderStarttext()}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.comparisonTitle}>Current</Text>
              {this._renderCurrenttext()}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {this._renderChangeHeader()}
              {this._renderChangetext()}
            </View>
          </View>
          <View
            style={{
              height: 2,
              // marginRight: 10,
              // marginLeft: 10,
              backgroundColor: "#eeeeee"
            }}
          />
          <View
            style={{
              flex: 1,
              margin: 10,
              height: 400,
              flexDirection: "column"
            }}
          >
            {this._renderTitle()}
            <View style={{ flexDirection: "row", flex: 1 }}>
              <YAxis
                style={{ marginBottom: 5 }}
                data={this.props.datavalue}
                contentInset={{ top: 30, bottom: 90, left: 0, right: 0 }}
                formatLabel={(value, index) => value}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column"
                }}
              >
                <View style={{ flex: 1 }}>
                  <LineChart
                    //yAccessor={({ item }) => item.value}
                    style={{ flex: 1, marginLeft: 0, padding: 0, height: 200 }}
                    data={this.props.datavalue}
                    svg={{
                      stroke: "red",
                      clipPath: "url(#clip-path-2)"
                    }}
                    contentInset={{ top: 30, bottom: 10, left: 0, right: 0 }}
                    extras={[Shadow, Clips]}
                    renderGrid={Grid.Horizontal}
                    renderDecorator={this._renderDots.bind(this)}
                  />
                </View>
                <View style={{ Top: 10 }}>
                  <XAxis
                    style={{
                      marginLeft: 0,
                      marginHorizontal: -55,
                      height: 80
                    }}
                    svg={axesSvg}
                    data={this.props.datavalue}
                    contentInset={{
                      left: 5,
                      right: 60
                    }}
                    formatLabel={(value, index) => {
                      if (
                        index == 0 ||
                        index < 0 ||
                        index == this.props.datavalue.length - 1
                      ) {
                        return "";
                      } else if (this.props.data.length < 1) {
                        return "";
                      } else {
                        return moment(this.props.data[index].date).format(
                          "MM/DD"
                        );
                      }
                    }}
                    labelStyle={{ color: "red" }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/*	 <View style={styles.resetButtonContainer}>
		            	<Button onPress={this._onResetPress.bind(this)}>
							Reset
						</Button>
		            </View>*/}

          {this._renderAddValue()}
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
              extraData={this.state}
              data={this.props.flatListData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this._renderSeparator}
              ListEmptyComponent={this._renderEmptyComponent}
              ListHeaderComponent={this._renderHeader}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ graphpagered, user }) => {
  const {
    inputvalue,
    datavalue,
    data,
    type,
    duration,
    isResetting,
    isAdding,
    addnewInput,
    flatListData,
    date,
    refreshingFlatListData
  } = graphpagered;
  return {
    type: type,
    duration: duration,
    flatListData: flatListData,
    inputvalue: inputvalue,
    datavalue: datavalue,
    addnewInput: addnewInput,
    data: data,
    date: date,
    isResetting: isResetting,
    isAdding: isAdding,
    refreshingFlatListData: refreshingFlatListData,
    isMetric: user.user.units == "metric" ? true : false
  };
};

export default connect(
  mapStateToProps,
  {
    change_option_Pressed,
    inputChange,
    getValues,
    onResetPress,
    updateIsResetting,
    submitVal,
    addNewInput,
    performance_Realm,
    performance_Server_Relam,
    resetRecord,
    onSetPerformanceDate
  }
)(PerformancePage);
