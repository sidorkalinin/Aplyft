import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class LeftLowerFrontSVG extends PureComponent {
  state = {
    selected: []
  };

  _onItemSelect = key => {
    if (this._ifKeyExists(key)) this._removeKey(key);
    else this._addKey(key);

    if (this.props.onSelect) {
      if (this._ifKeyExists(key)) {
        var array = this._removeKey2(key);

        this.props.onSelect(array, this.props.name);
      } else {
        this.props.onSelect([...this.props.dataArray, key], this.props.name);
      }
    }
  };

  _ifKeyExists = key => {
    if (this.props.dataArray.indexOf(key) > -1) return true;
    return false;
  };
  _addKey = key => {
    this.setState({ selected: [...this.props.dataArray, key] });
  };
  _removeKey = key => {
    var index = this.props.dataArray.indexOf(key);
    var tmp = this.props.dataArray.slice();
    tmp.splice(index, 1);

    this.setState({ selected: tmp });
  };
  _removeKey2 = key => {
    var index = this.props.dataArray.indexOf(key);
    var tmp = this.props.dataArray.slice();
    tmp.splice(index, 1);

    return tmp;
  };

  _ifPressed = key => {
    if (this._ifKeyExists(key)) return "#eb1d3a";
    else return "#969696";
  };

  render() {
    //const { mainContainer, labelStyle, valueStyle } = styles;

    return (
      <Svg
        height="510"
        width="100%"
        style={{
          marginLeft: 30,
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <G scale={"0.7"}>
          <Path
            onPress={this._onItemSelect.bind(this, "1LLF")}
            fill={this._ifPressed("1LLF")}
            d="M37.2,93.4c0.8-17.5,1.7-31.3,2.8-42.6c4.5,12.3,7.8,25,10,37.9c0,0.3,0.1,0.5,0.3,0.8
          	c0,22.3,4.5,44.1,11.4,65.9c3.3,10.2,7,20.5,11.2,30.6c2.4,12.2,3.3,27.5-3.1,38.5c-5.5-6.2-11.2-12.2-17.1-17.9
          	c-0.5-3.1-1.2-6.1-2.2-9C43.4,176.7,34.8,146.7,37.2,93.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "2LLF")}
            fill={this._ifPressed("2LLF")}
            d="M95.5,264.1C95.5,264.1,95.5,264.1,95.5,264.1c3.6,9.6,7.6,25.8,0.9,35.2c-10.9-5.5-22.5-9.2-34.5-9.1
          	c-0.5-12.9-1-58.9,16.3-49.8c0.1,0.1,0.1,0.1,0.1,0.1C84.2,248.2,90,256.1,95.5,264.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "3LLF")}
            fill={this._ifPressed("3LLF")}
            d="M58,290.4c-0.4,0-0.7,0-1,0c-2.9,0.3-5.8,0.8-8.6,1.6c0.1-1,0.2-2,0.2-3c2.2-33,6.5-57.3,4.8-76.4
          	c4.9,4.8,9.7,9.9,14.2,15.1l1.9,2.2c1.5,1.7,2.9,3.5,4.4,5.2C56.6,233,57.4,277.2,58,290.4L58,290.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "4LLF")}
            fill={this._ifPressed("4LLF")}
            d="M29.6,380.4c1-14.2,3.7-28.2,8.3-41.6c0.2,20.4,1.3,40.9,3,61.1c1.9,23.6,5,47.2,10.7,70.2
          	c4.1,16.7,9.9,34.8,21.3,48.1c0,1.8,0,3.7-0.1,5.5l-28.6-4.1C39.5,476.3,26.4,421.5,29.6,380.4L29.6,380.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "5LLF")}
            fill={this._ifPressed("5LLF")}
            d="M72.9,594.6c-1.9,22.8-15.2,53.1-26.2,50.8c-2.9-0.6-7.4-1.7-12.6-3.3c3.7-3.6,7.4-7.3,11-11
          	c6.2-6.4,14-13.4,16.8-22.1c5-16,2.8-35.6,1.5-52c-0.2-2.4-4-2.5-3.8,0c1.3,16.2,2.5,33.6-1,49.5c-2,9.3-11.4,17-17.8,23.5
          	c-3.5,3.6-7.1,7.2-10.8,10.7c-14-4.7-30.3-12.1-30-20.5c0.5-12.4,48.5-49.5,44.8-93.8c-0.1-1-0.2-2.1-0.3-3.1l28.2,4.1
          	C72.7,553.4,74.5,575.4,72.9,594.6L72.9,594.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6LLF")}
            fill={this._ifPressed("6LLF")}
            d="M111,345.2c-1,26.7,0.5,50-3.3,68.1c-2.8,13.3-19.7,43.2-28.9,71c-5.3-37.2-1.2-75.1,14.6-109.5
          	c4.7-10.6,10.6-20.6,17.5-29.9C111,345,111,345.1,111,345.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7LLF")}
            fill={this._ifPressed("7LLF")}
            d="M111.3,338.5c-9.1,10.8-16.2,23.6-22,36.1c-17,36.9-20.1,78.2-13.1,117.9c0,0,0,0,0,0.1
          	c-1.9,6.5-3,13.1-3.4,19.8c-10.1-13.5-14.9-31-18.7-47c-5.6-23.5-8.3-47.6-10.1-71.6c-1.7-22.1-2.6-44.3-2.5-66.5
          	c3.2-10.1,5.4-20.5,6.4-31c2.9-1,5.9-1.6,9-2c13.3-1.6,26.4,2.5,38.6,8.8l1.4,0.8c6.1,3.3,12,7,17.6,11.1
          	C112.8,322.7,111.7,330.6,111.3,338.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8LLF")}
            fill={this._ifPressed("8LLF")}
            d="M115.6,311.1c-5.1-3.6-10.4-7-15.8-10c4.9-7.5,4.6-17.7,2.6-26.8c5.9,9,11.6,18.2,17,27.2
          	C117.8,304.6,116.6,307.8,115.6,311.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "9LLF")}
            fill={this._ifPressed("9LLF")}
            d="M133.3,253.3c-1.4,19-1.9,30.5-9.5,40.9c-0.8,1.1-1.6,2.3-2.3,3.5C107,273.8,91,249.2,72.4,227.5
          	c5.4-8.2,6.6-19,6-29.3c5.4,11.6,11.8,22.8,19.1,33.3l0.2,0.3c0.1,0.3,0.3,0.5,0.5,0.7c7.9,10.8,22.1,21.4,35.3,18.3
          	C133.5,251.6,133.4,252.5,133.3,253.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "10LLF")}
            fill={this._ifPressed("10LLF")}
            d="M134,247.1c-12,4.6-24-6.1-32.5-17c2.6-39.2,10.8-78.5,17.7-117.2c1.6,4.9,3.2,9.8,4.6,14.7
          	c7.6,27,13.1,54.8,17.7,82.6C138.2,225.6,135.4,235.6,134,247.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11LLF")}
            fill={this._ifPressed("11LLF")}
            d="M52.7,206.6c6,5.6,11.7,11.6,17.1,17.9c6.4-11,5.5-26.3,3.1-38.5c-4.2-10.1-7.9-20.4-11.2-30.6
          	c-7-21.9-11.5-43.6-11.4-65.9c-0.2-0.2-0.3-0.5-0.3-0.8c-2.2-12.9-5.5-25.6-10-37.9c-1.1,11.3-2.1,25.1-2.8,42.6
          	c-2.4,53.3,6.2,83.3,13.3,104.2C51.5,200.6,52.2,203.6,52.7,206.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12LLF")}
            fill={this._ifPressed("12LLF")}
            d="M67.7,227.8c-4.6-5.3-9.3-10.3-14.2-15.1c1.6,19-2.6,43.4-4.8,76.4c-0.1,1-0.1,2-0.2,3c2.8-0.8,5.7-1.4,8.6-1.6
          	c0.4,0,0.7,0,1,0c-0.6-13.2-1.5-57.3,15.9-55.1c-1.4-1.8-2.9-3.5-4.4-5.2L67.7,227.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "13LLF")}
            fill={this._ifPressed("13LLF")}
            d="M40.9,42.7C45.1,53,48.5,63.6,51,74.4c0.4-3.8,0.8-7.6,1.5-11.4C56.2,41.4,63.3,17.2,78.2,0H50.6
          	c-0.4,1-0.7,2-1.1,2.9C45.9,13.6,43.1,24.6,40.9,42.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14LLF")}
            fill={this._ifPressed("14LLF")}
            d="M63.1,146.8c3.6,12.2,7.9,24.2,12.8,36c0.3,0.2,0.4,0.6,0.5,0.9c0,0.2,0.1,0.4,0.1,0.6
          	c5,11.9,10.7,23.4,17.3,34.5c1.2,2,2.6,4.2,4.2,6.6c3.1-40.1,11.7-80.4,18.6-119.9c-5.8-16.7-12.4-33.2-17.4-50.2
          	C93.9,37.1,88.8,18.6,85.2,0h-1.7C68.1,16,60.3,39.8,56.7,61.1C51.8,90.5,54.5,118.3,63.1,146.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "15LLF")}
            fill={this._ifPressed("15LLF")}
            d="M146.5,0h-15.7c8.3,10.9,16.1,22.2,23.7,33.5C152,22.3,149.3,11.1,146.5,0z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "16LLF")}
            fill={this._ifPressed("16LLF")}
            d="M72.7,523.7c0-1.8,0-3.6,0.1-5.5c-11.5-13.3-17.2-31.4-21.3-48.1c-5.7-23-8.8-46.6-10.7-70.2
          	c-1.7-20.3-2.7-40.7-3-61.1c-4.5,13.5-7.3,27.4-8.3,41.6c-3.2,41.1,9.9,95.9,14.5,139.2L72.7,523.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17LLF")}
            fill={this._ifPressed("17LLF")}
            d="M99.8,301.1c5.5,3,10.8,6.4,15.8,10c1-3.3,2.2-6.5,3.8-9.6c-5.5-9-11.1-18.2-17-27.2
          	C104.4,283.5,104.7,293.6,99.8,301.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18LLF")}
            fill={this._ifPressed("18LLF")}
            d="M95.6,303c-12.1-6.3-25.3-10.4-38.6-8.8c-3.1,0.4-6.1,1-9,2c-1.1,10.5-3.2,20.9-6.4,31
          	c-0.1,22.2,0.8,44.4,2.5,66.5c1.8,24,4.5,48.1,10.1,71.6c3.8,16,8.6,33.5,18.7,47c0.4-6.7,1.5-13.4,3.4-19.8c0,0,0,0,0-0.1
          	c-7-39.7-3.9-81,13.1-117.9c5.8-12.5,12.9-25.4,22-36.1c0.4-7.9,1.4-15.7,3.2-23.4c-5.6-4.1-11.5-7.8-17.6-11.2L95.6,303z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "19LLF")}
            fill={this._ifPressed("19LLF")}
            d="M194.1,107.3c2-3.6,4-7.3,6.1-10.9V26.6c-5.9,9.1-11.3,18.5-16.3,28.1C186.4,60.4,190.2,82,194.1,107.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20LLF")}
            fill={this._ifPressed("20LLF")}
            d="M95.5,264.2L95.5,264.2C95.5,264.1,95.5,264.4,95.5,264.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "21LLF")}
            fill={this._ifPressed("21LLF")}
            d="M78.2,240.4c-17.3-9.1-16.8,36.9-16.3,49.8c12.1,0,23.7,3.6,34.5,9.1c6.7-9.4,2.7-25.6-0.8-35.2
          	c0,0.2-0.1,0-0.1-0.1C90,256.1,84.3,248.2,78.2,240.4C78.2,240.5,77.9,240.4,78.2,240.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "22LLF")}
            fill={this._ifPressed("22LLF")}
            d="M95.5,264.1L95.5,264.1C95.5,264.1,95.5,264.1,95.5,264.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "23LLF")}
            fill={this._ifPressed("23LLF")}
            d="M78.2,240.5L78.2,240.5C77.9,240.4,78.2,240.5,78.2,240.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "24LLF")}
            fill={this._ifPressed("24LLF")}
            d="M78.2,240.4L78.2,240.4C78.3,240.5,78.3,240.5,78.2,240.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "25LLF")}
            fill={this._ifPressed("25LLF")}
            d="M119.2,112.8c-6.9,38.7-15.1,78.1-17.7,117.2c8.5,10.9,20.4,21.6,32.5,17c1.4-11.5,4.3-21.5,7.5-37
          	c-4.6-27.8-10.1-55.6-17.7-82.6C122.4,122.6,120.8,117.7,119.2,112.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "26LLF")}
            fill={this._ifPressed("26LLF")}
            d="M155.6,115.6c3.6-27,7.1-51.9,8.9-59.8c-2.4-3.8-4.9-7.5-7.4-11.4c-0.4-0.2-0.6-0.6-0.7-1
          	C146.8,28.8,136.8,14,126,0H97.2c9.2,16.9,18.6,33.7,27.3,50.9C135.1,72.3,145.5,93.9,155.6,115.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "27LLF")}
            fill={this._ifPressed("27LLF")}
            d="M128.6,130.7c6,22.8,10.8,45.9,14.9,69.1c0.6-3.1,1.1-6.3,1.7-9.8c2.3-13.9,5.9-41,9.4-67.4
          	c-11.5-25-23.4-50-35.9-74.5c-8.3-16.3-17.5-32-26.1-48.1H89c4.1,21.3,10.2,42.3,16.6,62.9C112.8,85.7,122.5,107.6,128.6,130.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "28LLF")}
            fill={this._ifPressed("28LLF")}
            d="M78.8,484.3c9.2-27.8,26.1-57.7,28.9-71c3.8-18.1,2.4-41.4,3.3-68.1c0-0.1,0-0.2,0-0.3
          	c-6.9,9.3-12.8,19.3-17.5,29.9C77.5,409.2,73.4,447,78.8,484.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "29LLF")}
            fill={this._ifPressed("29LLF")}
            d="M44.5,523.5c0.1,1,0.2,2.1,0.3,3.1C48.6,570.8,0.5,608,0,620.3c-0.3,8.3,16,15.8,30,20.5
          	c3.7-3.5,7.3-7.1,10.8-10.7c6.4-6.6,15.7-14.2,17.8-23.5c3.5-15.9,2.3-33.4,1-49.5c-0.2-2.5,3.6-2.4,3.8,0c1.3,16.5,3.5,36-1.5,52
          	c-2.7,8.8-10.5,15.7-16.8,22.1c-3.6,3.7-7.3,7.4-11,11c5.2,1.6,9.7,2.7,12.6,3.3c11,2.3,24.3-28,26.2-50.8
          	c1.6-19.3-0.2-41.3-0.2-67.1L44.5,523.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "30LLF")}
            fill={this._ifPressed("30LLF")}
            d="M98.2,232.5c-0.2-0.2-0.4-0.4-0.5-0.7l-0.2-0.3c-7.3-10.6-13.7-21.7-19.1-33.4c0.6,10.3-0.6,21-6,29.3
          	c18.6,21.7,34.6,46.3,49.1,70.2c0.7-1.2,1.5-2.4,2.3-3.5c7.6-10.5,8.1-21.9,9.5-40.9c0.1-0.9,0.1-1.7,0.2-2.5
          	C120.4,253.9,106.2,243.3,98.2,232.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "31LLF")}
            fill={this._ifPressed("31LLF")}
            d="M166.6,52.1c3.2-2.1,9.3-1.1,14.1,0.5c2-3.9,4.1-7.8,6.3-11.6c-0.1-10.6,3.4-21.8,6-31.9c0.8-3,1.6-6,2.5-9.1
          	h-44.6c3.4,13.9,6.5,27.9,9.1,41.9C162.2,45.3,164.4,48.7,166.6,52.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "32LLF")}
            fill={this._ifPressed("32LLF")}
            d="M191.2,33.7c2.9-4.8,5.8-9.5,8.9-14.1V0h-0.8c-0.9,3.3-1.8,6.7-2.7,10.1C194.8,17.6,192.2,25.7,191.2,33.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "33LLF")}
            fill={this._ifPressed("33LLF")}
            d="M195,113.4c1.8,11.7,3.5,24,5.1,35.6v-44.8C198.5,107.3,196.8,110.3,195,113.4z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default LeftLowerFrontSVG;

///--------------------------------------------------------
