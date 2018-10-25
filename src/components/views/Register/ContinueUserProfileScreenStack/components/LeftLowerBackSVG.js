import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class LeftLowerBackSVG extends PureComponent {
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
    this.setState({ selected: [...this.props.dataArray, key] }, () => {});
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
    console.log("in the render of the component ", this.props.dataArray);
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
            onPress={this._onItemSelect.bind(this, "1LLB")}
            fill={this._ifPressed("1LLB")}
            d="M51.9,28.1c6.5,9.6,10.8,21.2,13.7,31.9c9.8,36.5,1.3,74.9-13.3,109.1c-0.1-10.1-0.4-20.4-1-30.6
          	C49.1,101.8,49.3,64.9,51.9,28.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "2LLB")}
            fill={this._ifPressed("2LLB")}
            d="M52.2,179c15.5-33.4,25.3-70.3,19.9-106.9c17.1,0.5,34.3-0.3,51.2-2.5l0.7-0.1c-3.9,31.4-8.2,63-14.7,94.1
          	c-0.2,0.2-0.3,0.5-0.4,0.8c-0.3,1.5-0.5,3.1-0.8,4.6c-2.9,13.5-6.3,26.9-10.3,40.1c-5.1,16.9-11,34.2-23.7,47
          	c-7.3,7.2-16.3,12.7-26.1,15.9C49.1,249,52,215.2,52.2,179z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "3LLB")}
            fill={this._ifPressed("3LLB")}
            d="M99.9,279.9c-1-0.9-2.2-1.6-3.4-2.3c-5-2.6-8.9-0.8-11.8,2.6c-0.4-3.7-2.4-7.1-5.5-9.3
          	c-3.9-2.7-8.7-3.3-13.7-2.8c2.1-1.3,4.1-2.7,6-4.3c14.7-11.9,21.8-28.1,27.7-45.6l0.1-0.3c-1.1,6.6-2.1,13.2-2.9,19.8
          	C94.9,251.9,96,266.2,99.9,279.9L99.9,279.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "4LLB")}
            fill={this._ifPressed("4LLB")}
            d="M16.9,357.7c9.4-35.1,30.3-47.9,31-78.2c0-0.5,0-1.1,0-1.6c12.8-5.8,32.7-11.4,32.4,6.8c0,1.2-0.1,2.5-0.4,3.7
          	l-0.1,0.2c-0.1,0.3-0.2,0.6-0.1,0.9c-1.2,6.1-4.1,12.2-6.4,17.8c-4.1,10.1-8.3,20.3-12.1,30.5c-7.5,20.4-14.6,45.8-12.3,67.8
          	c-0.1,0.1-0.2,0.2-0.3,0.3c-7.6,13.8-25,20.5-40.6,23.4C10.3,398.8,13.2,371.3,16.9,357.7L16.9,357.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "5LLB")}
            fill={this._ifPressed("5LLB")}
            d="M35.7,594.4c-0.3-18.4,2.7-38.6,10.2-56.5c2.9,8.9,19.5,33.7,13.4,57.8c-6.1,24.3-25,52.6-45.9,46.5
          	S2,591,2.7,555.3c0.4-19.5,1.7-66,4.4-110c2.8,4.2,5.1,12.1,5.8,15.2c3.5,14.4,4,29.4,4.4,44.1c0.7,28.8-1.3,57.6-3.7,86.2
          	c-0.2,2.6,3.8,2.6,4,0c2.5-30.1,4.4-60.4,3.6-90.6c-0.4-14.6-1.4-29.5-5.1-43.7c-1-3.9-3.8-13.5-8.6-16.8c0.1-2.1,0.3-4.2,0.4-6.3
          	c15.6-2.9,32.9-9.1,42.1-21.9c3.1,15.7,11.8,29,29.9,36.5c-11.6,27-24.4,56.5-30.5,74.3c-12.9,21.2-18,48-17.6,72
          	C31.7,597,35.8,597,35.7,594.4L35.7,594.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6LLB")}
            fill={this._ifPressed("6LLB")}
            d="M107.7,319.8c-3.5,10.1,1.5,57.2-12,90.5c-3.9,9.6-8.9,21.5-14.3,34.1c-52-21.2-22-92.1-6.5-130
          	c2.4-5.9,7.8-16.5,9.5-26.1c2.5-5.8,6.6-10.5,12.7-5.5c2.3,1.9,4.2,4.1,5.8,6.6c2.5,7.1,5.7,13.9,9.3,20.5
          	C110.5,313.1,109,316.4,107.7,319.8L107.7,319.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7LLB")}
            fill={this._ifPressed("7LLB")}
            d="M178.6,108.9c-4.5,34.9-28.3,79.9-30.9,91s-8.1,43.5-15.7,66.3c-1.9,5.8-4.2,11.4-6.6,16.7
          	c1.3-17.3,3.5-34.5,6.6-51.6c8.2-46.7,23.2-92.8,47.9-133.4C179.5,101.6,179,105.3,178.6,108.9L178.6,108.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8LLB")}
            fill={this._ifPressed("8LLB")}
            d="M181.3,88.3c-27.4,42.1-43.5,90.3-52.7,139.4c-4,21.3-7,43.1-7.7,64.9c-2.3,4.6-4.5,9-6.5,12.9
          	c-2.8-5.3-5.2-10.7-7.3-16.3c0-0.4-0.1-0.8-0.3-1.1l-0.3-0.4c-5.9-16.2-7.9-33.5-6-50.7c2.4-20.1,6.6-40.1,10.2-60
          	c8.2-35.5,12.9-72.2,17.3-108c20.7-2.8,43.5-7.8,60.2-20.7C185.6,58.8,183.3,73.4,181.3,88.3L181.3,88.3z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "9LLB")}
            fill={this._ifPressed("9LLB")}
            d="M69.9,60.7c0.6,2.4,1.1,4.8,1.5,7.3c15.1,0.5,30.2-0.1,45.2-1.7c24.9-2.7,54.8-7.3,73.9-25.3
          	c1.6-4.3,3.3-7.3,5.2-8.7c0-4.8,0-9.6,0-14.3c0-6,0-12,0-17.9H64.2c-3.5,7.8-7,15.6-10.7,23.3C61.6,34.2,67,48.1,69.9,60.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "10LLB")}
            fill={this._ifPressed("10LLB")}
            d="M59.8,0h-5.1c-0.6,4.8-1.1,9.7-1.6,14.7C55.3,9.8,57.6,4.9,59.8,0z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11LLB")}
            fill={this._ifPressed("11LLB")}
            d="M99.3,217.9l-0.1,0.3c-5.9,17.4-13,33.7-27.7,45.6c-1.9,1.5-3.9,3-6,4.3c5-0.5,9.8,0.2,13.7,2.8
          	c3.1,2.1,5.1,5.5,5.5,9.3c2.9-3.4,6.9-5.2,11.8-2.6c1.2,0.6,2.3,1.4,3.4,2.3c-3.9-13.7-5-28-3.4-42.1
          	C97.2,231.1,98.2,224.5,99.3,217.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12LLB")}
            fill={this._ifPressed("12LLB")}
            d="M110.8,177c-3.7,19.9-7.8,39.9-10.2,60c-1.9,17.1,0.1,34.5,6,50.7l0.3,0.4c0.2,0.3,0.3,0.7,0.3,1.1
          	c2.1,5.6,4.5,11.1,7.3,16.3c2-3.9,4.2-8.2,6.5-12.9c0.7-21.7,3.8-43.6,7.7-64.9c9.2-49.1,25.3-97.3,52.6-139.4
          	c2-14.9,4.3-29.4,7.1-40.1c-16.8,12.9-39.5,17.9-60.2,20.7C123.6,104.8,119,141.4,110.8,177z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "13LLB")}
            fill={this._ifPressed("13LLB")}
            d="M205.1,41.3c8.2,8.4,18.5,14.5,29.7,18.9V0h-35.1c0,10.7,0,21.4,0,32.1C201.7,33.4,203.5,36.7,205.1,41.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14LLB")}
            fill={this._ifPressed("14LLB")}
            d="M48.8,405.9c0.1-0.1,0.2-0.2,0.3-0.3c-2.3-22,4.8-47.4,12.3-67.8c3.8-10.3,8-20.4,12.1-30.5
          	c2.2-5.6,5.2-11.7,6.4-17.8c0-0.3,0-0.6,0.1-0.9l0.1-0.2c0.2-1.2,0.3-2.4,0.4-3.7c0.2-18.2-19.6-12.6-32.4-6.8c0,0.5,0,1.1,0,1.6
          	c-0.7,30.4-21.6,43.2-31,78.2c-3.7,13.6-6.5,41.1-8.7,71.6C23.8,426.4,41.3,419.7,48.8,405.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "15LLB")}
            fill={this._ifPressed("15LLB")}
            d="M207.3,48.8c3.3,13.2,5.5,31.6,6.6,47.4c7.8,13.9,14.8,28.3,20.9,43V64.4C224.8,60.9,215.5,55.6,207.3,48.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "16LLB")}
            fill={this._ifPressed("16LLB")}
            d="M97.9,209.1c4-13.2,7.3-26.6,10.3-40.1c0.3-1.5,0.5-3.1,0.8-4.6c0-0.3,0.2-0.6,0.4-0.8
          	c6.5-31.1,10.8-62.7,14.7-94.1l-0.7,0.1c-17,2.2-34.1,3-51.2,2.5c5.4,36.7-4.4,73.5-19.9,106.9c-0.3,36.2-3.2,70-4.1,93.1
          	c9.8-3.2,18.7-8.7,26.1-15.9C86.8,243.4,92.8,226,97.9,209.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17LLB")}
            fill={this._ifPressed("17LLB")}
            d="M52.2,169.1C66.9,134.9,75.4,96.5,65.6,60c-2.9-10.7-7.2-22.3-13.7-31.9c-2.6,36.7-2.8,73.6-0.7,110.4
          	C51.9,148.7,52.2,159,52.2,169.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18LLB")}
            fill={this._ifPressed("18LLB")}
            d="M97.1,282.8c-6.2-4.9-10.2-0.3-12.7,5.5c-1.6,9.6-7,20.2-9.5,26.1c-15.5,37.9-45.5,108.8,6.5,130
          	c5.4-12.6,10.5-24.5,14.4-34.1c13.4-33.3,8.4-80.4,12-90.5c1.3-3.4,2.8-6.7,4.4-9.9c-3.6-6.6-6.8-13.4-9.3-20.5
          	C101.4,286.9,99.4,284.7,97.1,282.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "19LLB")}
            fill={this._ifPressed("19LLB")}
            d="M125.4,282.9c2.4-5.4,4.7-11,6.6-16.7c7.6-22.8,13.1-55.1,15.7-66.3s26.3-56.1,30.9-91c0.5-3.6,0.9-7.3,1.4-11
          	c-24.7,40.6-39.7,86.7-47.9,133.4C128.9,248.4,126.7,265.6,125.4,282.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20LLB")}
            fill={this._ifPressed("20LLB")}
            d="M79.8,448.1c-18-7.5-26.8-20.8-29.9-36.5c-9.2,12.8-26.5,19-42.1,21.9c-0.1,2.1-0.3,4.2-0.4,6.3
          	c4.9,3.3,7.6,12.9,8.6,16.8c3.8,14.2,4.7,29.1,5.1,43.7c0.9,30.2-1,60.5-3.6,90.6c-0.2,2.6-4.3,2.6-4,0c2.4-28.6,4.4-57.5,3.7-86.2
          	c-0.3-14.7-0.9-29.8-4.4-44.1c-0.8-3.1-3-11-5.8-15.2c-2.7,44-4.1,90.5-4.4,110C2,591-7.4,636.2,13.5,642.3s39.8-22.2,45.9-46.5
          	c6-24.1-10.5-48.9-13.4-57.8c-7.5,17.9-10.4,38.1-10.2,56.5c0,2.6-4,2.6-4,0c-0.3-24,4.8-50.8,17.6-72
          	C55.4,504.6,68.2,475,79.8,448.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "21LLB")}
            fill={this._ifPressed("21LLB")}
            d="M214.4,106.8c0.7,20.8,12,55.2,20.4,80.8v-37.8c-6-15.1-12.8-29.9-20.4-44.3C214.4,106,214.4,106.4,214.4,106.8
          	z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default LeftLowerBackSVG;

///--------------------------------------------------------
