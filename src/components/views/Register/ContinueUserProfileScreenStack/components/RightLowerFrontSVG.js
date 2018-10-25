import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class RightLowerFrontSVG extends PureComponent {
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
            onPress={this._onItemSelect.bind(this, "1RLF")}
            fill={this._ifPressed("1RLF")}
            d="M149.7,197.6c-1,2.9-1.7,5.9-2.2,9c-6,5.6-11.7,11.6-17.1,17.9c-6.4-11-5.5-26.3-3.1-38.5
          	c4.2-10.1,7.9-20.4,11.2-30.6c7-21.9,11.4-43.6,11.4-65.9c0.2-0.2,0.3-0.5,0.3-0.8c2.2-12.9,5.5-25.6,10-37.9
          	c1.1,11.3,2.1,25.1,2.8,42.6C165.4,146.7,156.8,176.7,149.7,197.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "2RLF")}
            fill={this._ifPressed("2RLF")}
            d="M121.9,240.5C121.9,240.5,121.9,240.5,121.9,240.5c17.4-9.2,16.9,36.8,16.4,49.7c-12.1,0-23.7,3.6-34.6,9.1
          	c-6.7-9.4-2.7-25.6,0.8-35.2c0-0.1,0.1-0.1,0.1-0.1C110.2,256.1,115.9,248.2,121.9,240.5L121.9,240.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "3RLF")}
            fill={this._ifPressed("3RLF")}
            d="M126.2,235.2c1.4-1.8,2.9-3.5,4.4-5.2l1.9-2.2c4.6-5.3,9.3-10.3,14.2-15.1c-1.6,19,2.6,43.4,4.8,76.4
          	c0.1,1,0.1,2,0.2,3c-2.8-0.8-5.7-1.4-8.6-1.6c-0.4,0-0.7,0-1,0C142.8,277.2,143.6,233,126.2,235.2L126.2,235.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "4RLF")}
            fill={this._ifPressed("4RLF")}
            d="M156.1,519.6l-28.6,4.1c0-1.8,0-3.6-0.1-5.5c11.4-13.3,17.2-31.4,21.3-48.1c5.7-23,8.8-46.6,10.7-70.2
          	c1.7-20.3,2.7-40.7,3-61.1c4.5,13.5,7.3,27.4,8.2,41.6C173.8,421.5,160.7,476.3,156.1,519.6L156.1,519.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "5RLF")}
            fill={this._ifPressed("5RLF")}
            d="M127.5,527.5l28.2-4.1c-0.1,1-0.2,2.1-0.3,3.1c-3.8,44.3,44.3,81.4,44.8,93.8c0.3,8.3-16,15.8-30,20.5
          	c-3.7-3.5-7.3-7.1-10.8-10.7c-6.4-6.6-15.7-14.2-17.8-23.5c-3.5-15.9-2.3-33.4-1-49.5c0.2-2.5-3.6-2.4-3.8,0
          	c-1.3,16.5-3.5,36,1.5,52c2.7,8.8,10.6,15.7,16.8,22.1c3.6,3.7,7.3,7.4,11,11c-5.2,1.6-9.7,2.7-12.6,3.3
          	c-10.9,2.3-24.3-28-26.2-50.8C125.7,575.4,127.5,553.4,127.5,527.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6RLF")}
            fill={this._ifPressed("6RLF")}
            d="M89.2,344.9c6.9,9.3,12.8,19.3,17.6,29.9c15.9,34.4,20,72.3,14.6,109.5c-9.2-27.8-26.1-57.7-28.8-71
          	c-3.8-18.1-2.4-41.4-3.3-68.1C89.2,345.1,89.2,345,89.2,344.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7RLF")}
            fill={this._ifPressed("7RLF")}
            d="M85.6,315c5.6-4.1,11.5-7.8,17.6-11.2l1.4-0.8c12.1-6.3,25.3-10.4,38.6-8.8c3.1,0.4,6.1,1,9,2
          	c1.1,10.5,3.2,20.9,6.4,31c0.1,22.2-0.8,44.4-2.5,66.5c-1.8,24-4.5,48.1-10.1,71.6c-3.8,16-8.6,33.5-18.7,47
          	c-0.4-6.7-1.5-13.4-3.4-19.8c0,0,0,0,0-0.1c7-39.7,3.9-81-13.1-117.9c-5.8-12.5-12.9-25.4-22-36.1C88.4,330.5,87.4,322.7,85.6,315z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8RLF")}
            fill={this._ifPressed("8RLF")}
            d="M80.8,301.6c5.5-9,11.1-18.2,17-27.2c-2,9.1-2.3,19.2,2.6,26.8c-5.5,3-10.8,6.4-15.8,10
          	C83.6,307.8,82.3,304.6,80.8,301.6L80.8,301.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "9RLF")}
            fill={this._ifPressed("9RLF")}
            d="M66.6,250.8c13.2,3.1,27.4-7.5,35.3-18.3c0.2-0.2,0.4-0.4,0.5-0.7l0.2-0.3c7.3-10.6,13.7-21.7,19.1-33.4
          	c-0.7,10.3,0.6,21,6,29.3c-18.6,21.7-34.6,46.3-49.1,70.2c-0.7-1.2-1.5-2.4-2.3-3.5c-7.6-10.5-8.1-21.9-9.5-40.9
          	C66.8,252.5,66.7,251.6,66.6,250.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "10RLF")}
            fill={this._ifPressed("10RLF")}
            d="M58.7,210.1c4.6-27.8,10.1-55.6,17.7-82.6c1.4-5,3-9.8,4.6-14.7c6.9,38.7,15.1,78.1,17.7,117.2
          	c-8.5,10.9-20.4,21.6-32.4,17C64.8,235.6,61.9,225.6,58.7,210.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11RLF")}
            fill={this._ifPressed("11RLF")}
            d="M147.5,206.6c-6,5.6-11.7,11.6-17.1,17.9c-6.4-11-5.5-26.3-3.1-38.5c4.2-10.1,7.9-20.4,11.2-30.6
          	c7-21.9,11.4-43.6,11.4-65.9c0.2-0.2,0.3-0.5,0.3-0.8c2.2-12.9,5.5-25.6,10-37.9c1.1,11.3,2.1,25.1,2.8,42.6
          	c2.4,53.3-6.2,83.3-13.3,104.2C148.7,200.6,147.9,203.6,147.5,206.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12RLF")}
            fill={this._ifPressed("12RLF")}
            d="M132.5,227.8c4.6-5.3,9.3-10.3,14.2-15.1c-1.6,19,2.6,43.4,4.8,76.4c0.1,1,0.1,2,0.2,3
          	c-2.8-0.8-5.7-1.4-8.6-1.6c-0.4,0-0.7,0-1,0c0.6-13.2,1.5-57.3-15.9-55.1c1.4-1.8,2.9-3.5,4.4-5.2L132.5,227.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "13RLF")}
            fill={this._ifPressed("13RLF")}
            d="M159.3,42.7c-4.3,10.3-7.6,20.9-10.1,31.8c-0.4-3.8-0.8-7.6-1.5-11.4C144,41.4,136.9,17.2,121.9,0h27.6
          	c0.4,1,0.7,2,1.1,2.9C154.3,13.6,157.1,24.6,159.3,42.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14RLF")}
            fill={this._ifPressed("14RLF")}
            d="M137.1,146.8c-3.6,12.2-7.9,24.2-12.8,36c-0.3,0.2-0.4,0.6-0.5,0.9c0,0.2-0.1,0.4-0.1,0.6
          	c-5,11.9-10.7,23.4-17.3,34.5c-1.2,2-2.6,4.2-4.2,6.6c-3.1-40.1-11.7-80.4-18.6-120c5.8-16.7,12.4-33.2,17.4-50.2
          	C106.3,37.1,111.4,18.6,115,0h1.7c15.4,16,23.2,39.8,26.7,61.1C148.4,90.5,145.6,118.3,137.1,146.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "15RLF")}
            fill={this._ifPressed("15RLF")}
            d="M53.7,0h15.7c-8.3,10.9-16.1,22.2-23.7,33.5C48.1,22.3,50.8,11.1,53.7,0z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "16RLF")}
            fill={this._ifPressed("16RLF")}
            d="M127.5,523.7c0-1.8,0-3.6-0.1-5.5c11.5-13.3,17.2-31.4,21.3-48.1c5.7-23,8.8-46.6,10.7-70.2
          	c1.7-20.3,2.7-40.7,3-61.1c4.5,13.5,7.3,27.4,8.2,41.6c3.2,41.1-9.9,95.9-14.6,139.2L127.5,523.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17RLF")}
            fill={this._ifPressed("17RLF")}
            d="M100.4,301.1c-5.5,3-10.8,6.4-15.8,10c-1-3.3-2.2-6.5-3.8-9.6c5.5-9,11.1-18.2,17-27.2
          	C95.8,283.5,95.5,293.6,100.4,301.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18RLF")}
            fill={this._ifPressed("18RLF")}
            d="M104.6,303c12.1-6.3,25.3-10.4,38.6-8.8c3.1,0.4,6.1,1,9,2c1.1,10.5,3.2,20.9,6.4,31
          	c0.1,22.2-0.8,44.4-2.5,66.5c-1.8,24-4.5,48.1-10.1,71.6c-3.8,16-8.6,33.5-18.7,47c-0.4-6.7-1.5-13.4-3.4-19.8c0,0,0,0,0-0.1
          	c7-39.7,3.9-81-13.1-117.9c-5.8-12.5-12.9-25.4-22-36.1c-0.4-7.9-1.4-15.7-3.2-23.4c5.6-4.1,11.5-7.8,17.6-11.2L104.6,303z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "19RLF")}
            fill={this._ifPressed("19RLF")}
            d="M6.1,107.3C4,103.7,2,100,0,96.4V26.6c5.9,9.1,11.3,18.5,16.3,28.1C13.7,60.4,9.9,82,6.1,107.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20RLF")}
            fill={this._ifPressed("20RLF")}
            d="M104.6,264.2L104.6,264.2C104.7,264.1,104.7,264.4,104.6,264.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "21RLF")}
            fill={this._ifPressed("21RLF")}
            d="M122,240.4c17.3-9.1,16.8,36.9,16.3,49.8c-12.1,0-23.7,3.6-34.6,9.1c-6.7-9.4-2.7-25.6,0.8-35.2
          	c0,0.2,0.1,0,0.1-0.1C110.2,256.1,115.9,248.2,122,240.4C122,240.5,122.2,240.4,122,240.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "22RLF")}
            fill={this._ifPressed("22RLF")}
            d="M104.7,264.1L104.7,264.1C104.7,264.1,104.7,264.1,104.7,264.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "23RLF")}
            fill={this._ifPressed("23RLF")}
            d="M121.9,240.5L121.9,240.5C122.2,240.4,122,240.5,121.9,240.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "24RLF")}
            fill={this._ifPressed("24RLF")}
            d="M122,240.4L122,240.4C121.9,240.5,121.9,240.5,122,240.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "25RLF")}
            fill={this._ifPressed("25RLF")}
            d="M80.9,112.8c6.9,38.7,15.1,78.1,17.7,117.2c-8.5,10.9-20.4,21.6-32.4,17c-1.4-11.5-4.3-21.5-7.5-37
          	c4.6-27.8,10.1-55.6,17.7-82.6C77.8,122.6,79.3,117.7,80.9,112.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "26RLF")}
            fill={this._ifPressed("26RLF")}
            d="M44.6,115.6c-3.6-27-7.1-51.9-8.9-59.8c2.4-3.8,4.9-7.5,7.4-11.4c0.4-0.2,0.6-0.6,0.7-1
          	C53.3,28.8,63.4,14,74.2,0H103c-9.2,16.9-18.6,33.7-27.2,50.9C65,72.3,54.7,93.9,44.6,115.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "27RLF")}
            fill={this._ifPressed("27RLF")}
            d="M71.6,130.7c-6,22.8-10.8,45.9-14.9,69.1c-0.6-3.1-1.2-6.3-1.7-9.8c-2.3-13.9-5.8-41-9.4-67.4
          	c11.5-25,23.4-50,35.9-74.5c8.3-16.3,17.5-32,26.1-48.1h3.7c-4.1,21.3-10.2,42.3-16.6,62.9C87.4,85.7,77.7,107.6,71.6,130.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "28RLF")}
            fill={this._ifPressed("28RLF")}
            d="M121.4,484.3c-9.2-27.8-26.1-57.7-28.8-71c-3.8-18.1-2.4-41.4-3.3-68.1c0-0.1,0-0.2,0-0.3
          	c6.9,9.3,12.8,19.3,17.5,29.9C122.6,409.2,126.7,447,121.4,484.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "29RLF")}
            fill={this._ifPressed("29RLF")}
            d="M155.7,523.5c-0.1,1-0.2,2.1-0.3,3.1c-3.8,44.3,44.3,81.4,44.8,93.8c0.3,8.3-16,15.8-30,20.5
          	c-3.7-3.5-7.3-7.1-10.8-10.7c-6.4-6.6-15.7-14.2-17.8-23.5c-3.5-15.9-2.3-33.4-1-49.5c0.2-2.5-3.6-2.4-3.8,0
          	c-1.3,16.5-3.5,36,1.5,52c2.7,8.8,10.6,15.7,16.8,22.1c3.6,3.7,7.3,7.4,11,11c-5.2,1.6-9.7,2.7-12.6,3.3
          	c-10.9,2.3-24.3-28-26.2-50.8c-1.6-19.3,0.2-41.3,0.2-67.1L155.7,523.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "30RLF")}
            fill={this._ifPressed("30RLF")}
            d="M101.9,232.5c0.2-0.2,0.4-0.4,0.5-0.7l0.2-0.3c7.3-10.6,13.7-21.7,19.1-33.4c-0.7,10.3,0.6,21,6,29.3
          	c-18.6,21.7-34.6,46.3-49.1,70.2c-0.7-1.2-1.5-2.4-2.3-3.5c-7.6-10.5-8.1-21.9-9.5-40.9c-0.1-0.9-0.1-1.7-0.2-2.5
          	C79.8,253.9,94,243.3,101.9,232.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "31RLF")}
            fill={this._ifPressed("31RLF")}
            d="M33.6,52.1c-3.2-2.1-9.3-1.1-14.1,0.5c-2-3.9-4.1-7.8-6.3-11.6c0.1-10.6-3.4-21.8-6-31.9C6.3,6,5.5,3,4.7,0
          	h44.6c-3.3,13.9-6.5,27.9-9.1,41.9C38,45.3,35.8,48.7,33.6,52.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "32RLF")}
            fill={this._ifPressed("32RLF")}
            d="M8.9,33.7C6.1,28.9,3.1,24.2,0,19.5V0h0.8c0.9,3.3,1.8,6.7,2.7,10.1C5.4,17.6,7.9,25.7,8.9,33.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "33RLF")}
            fill={this._ifPressed("33RLF")}
            d="M5.1,113.4c-1.8,11.7-3.5,24-5.1,35.6v-44.8C1.7,107.3,3.4,110.3,5.1,113.4z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default RightLowerFrontSVG;

///--------------------------------------------------------
