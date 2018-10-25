import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Button } from "./../../../../components/common";
import styles from "./styles";
import moment from "moment";
import {
  inputChange,
  getValues,
  onResetPress,
  updateIsResetting,
  submitVal,
  addNewInput
} from "./actions";

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

class GraphPage extends Component {
  static navigationOptions = props => {
    return {
      title: props.navigation.state.params.item,
      headerTintColor: "white"
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      addnewInput: false,
      refreshedPage: false
    };
  }

  componentWillMount() {
    itemType = this.props.type.item.toLowerCase();

    this.props.getValues({ itemType });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("I am in the Component Did Update ");
    if (prevProps.isAdding !== this.props.isAdding) {
      console.log("Yess The Prev and now are different ");
      this.forceUpdate();
    }
  }

  _onInputChange = text => {
    this.props.inputChange(text);
  };

  _onResetPress = () => {
    this.props.onResetPress(this.props.type.item);
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

  onSubmitVal(inputVal, type) {
    this.props.submitVal({ inputVal, type });
    this.props.addNewInput(false);
  }

  _renderAddValue() {
    if (
      this.props.type.item == "weight" ||
      this.props.type.item == "Weight" ||
      this.props.type.item == "Body Fat" ||
      this.props.type.item == "body fat"
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

  // _renderInputButton = () => {
  //
  //   return (
  //
  //   );
  // };

  _renderDots = ({ x, y, index }) => {
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
    var performanceType = this.props.type.item;
    var addnewInput = this.props.addnewInput;
    var isAdding = this.props.isAdding;

    return (
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <ScrollView style={styles.mainContainer}>
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

          <Modal visible={isAdding} transparent animationType="fade">
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
                  height: "40%"
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 35,
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

                <View
                  style={{
                    alingItems: "center",
                    justifyContent: "center",
                    height: 45,
                    marginTop: 10,
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

                    marginTop: 15
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
                        index == this.props.datavalue.length - 1
                      ) {
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ performancered, graphpagered, user }) => {

  return {
    type: performancered.type,
    inputvalue: graphpagered.inputvalue,
    datavalue: graphpagered.datavalue,
    addnewInput: graphpagered.addnewInput,
    data: graphpagered.data,
    isResetting: graphpagered.isResetting,
    isAdding: graphpagered.isAdding,
    isMetric: user.user.units == "metric" ? true : false
  };
};

export default connect(
  mapStateToProps,
  {
    inputChange,
    getValues,
    onResetPress,
    updateIsResetting,
    submitVal,
    addNewInput
  }
)(GraphPage);
