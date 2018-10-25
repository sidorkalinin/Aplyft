import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class RightUpperFrontSVG extends PureComponent {
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
            onPress={this._onItemSelect.bind(this, "1RUF")}
            fill={this._ifPressed("1RUF")}
            d="M135,242.1c0,0,0-0.1,0-0.1c14.8-20.2,28.7-40.7,37.6-64.3c-1.2,17.5-0.8,35.2,1.2,52.6
          	C161.4,227.9,146.8,234.9,135,242.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "2RUF")}
            fill={this._ifPressed("2RUF")}
            d="M101.9,396.4l0.3-8.3c12-16.6,31.6-29.1,49.7-40.1c0.2,13.1,0.7,27.4,1.5,41.6c-15,12.7-32.5,24-51.7,26.6
          	C102.5,409.8,101.7,402.4,101.9,396.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "3RUF")}
            fill={this._ifPressed("3RUF")}
            d="M199.8,645.6H188c2.4-10.9,5.6-21.6,9.4-32.1C198.3,622.7,199.1,633.2,199.8,645.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "4RUF")}
            fill={this._ifPressed("4RUF")}
            d="M102.5,380.2l0.9-25c10.5-18.5,30.5-32.6,49.7-44c-0.9,10.4-1.3,20.9-1.2,31.3
          	C134.6,353,115.6,364.9,102.5,380.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "5RUF")}
            fill={this._ifPressed("5RUF")}
            d="M174.7,237.7c1,7.4,2.1,14.8,3.4,22.1c0.3,1.4-0.4,2.8-1.6,3.4c-4.7,2.4-8.6,15.9-18.8,29.8
          	c-1.6,2.1-2.7,5.9-3.6,10.9c-0.2,0.9-0.7,1.8-1.5,2.3c-18,10.6-36.9,23.6-48.8,40.1l0.1-3.9l0.8-22.3c0-0.1,0-0.2,0-0.3l0.9-26.3
          	c0.1-3.7,0.3-7.4,0.4-11.1c0.1-0.1,0.2-0.3,0.3-0.4c1.1-1.6,2.2-3.3,3.3-4.9c5.5-7.9,11.2-15.7,16.9-23.4c0.2-0.3,0.5-0.5,0.8-0.7
          	c11.5-7.9,30.1-20.3,45-18C173.5,235.1,174.6,236.3,174.7,237.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6RUF")}
            fill={this._ifPressed("6RUF")}
            d="M160,482.7c3.8,31.6,18.6,51.3,25.6,72c4.5,13.1,7.9,26.6,10.6,48.8c-5.2,12.6-9.4,25.7-12.4,39
          	c-0.4-4.6-1-9.3-1.8-14c-5-29.9-15.4-63.7-38.7-84.7c1.2-6.9,2.3-13.8,3.1-20.7c0-0.1,0-0.1,0-0.2c4.3-11.3,6.5-23.3,6.5-35.3
          	C155.3,485.9,157.6,484.2,160,482.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7RUF")}
            fill={this._ifPressed("7RUF")}
            d="M124.2,249.2L124.2,249.2C124.2,249.2,124.2,249.2,124.2,249.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8RUF")}
            fill={this._ifPressed("8RUF")}
            d="M127.3,245.4l-2.8,3.6l-0.3,0.2l0,0l0,0c0.3-0.2-1,1.4-1,1.4c-6.1,7.8-12.1,15.7-17.7,23.8
          	c-1.3-10.5-6.5-19.5-13.7-26.9C103.3,249.5,115.9,247.9,127.3,245.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "9RUF")}
            fill={this._ifPressed("9RUF")}
            d="M146.3,219.5c-4.6,6.9-9.5,13.5-14.6,20.1c-14.9,3.6-33,6.6-47.7,1.1c-3.7-2.8-7.7-5.4-11.8-7.6
          	c-8.7-4.7-17.8-8.6-27.2-11.6c-2.2-0.7-5.5-2.3-8.5-2.8v-62.1c6-18.9,12.3-37.8,18.9-56.5c11.6-10.5,35.1-10,49.6-10.8
          	c10.8-0.6,21.5-0.8,32.3-0.6c8,26.1,19.9,50.8,35.4,73.4C167.1,182.5,158.2,201.9,146.3,219.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "10LUF")}
            fill={this._ifPressed("10LUF")}
            d="M35.9,27.5C50.9,24.7,65,16.2,77.5,6.1c-0.2,4.4-0.2,9.2-0.1,14.5c0.1,2.8,0.3,5.4,0.6,8
          	C67.8,50,60.2,73,52.4,95.1l-0.9,2.6c-0.1,0.2-0.1,0.3-0.2,0.5c-5.9,16.7-11.5,33.5-17,50.4c-5.4-17-11.3-33.9-17.8-50.5
          	c0-0.1-0.1-0.2-0.1-0.3c-0.4-1.2-0.9-2.3-1.3-3.5C10.4,82.4,5.7,69.7,0,57.4V18.5C11.4,25.5,23.8,29.8,35.9,27.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11RUF")}
            fill={this._ifPressed("11RUF")}
            d="M142.4,549.3c20,19.7,30,49.9,34.5,76.8c1.1,6.5,1.9,13,2.4,19.5h-63.4c3.1-8.8,6.1-17.7,8.8-26.7
          	C131.5,596.1,137.9,572.8,142.4,549.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12RUF")}
            fill={this._ifPressed("12RUF")}
            d="M101.2,281.6c0,0.3,0,0.6,0.2,0.9c-0.7,3.4-0.4,7-0.6,10.8l-0.7,21.2c-16.6-15.3-40.6-34.7-63.4-35.4v-55.6
          	c9.9,0.9,22,7.5,29.4,11.4C84.4,244.6,102.2,259.1,101.2,281.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "13RUF")}
            fill={this._ifPressed("13RUF")}
            d="M100.9,420.6c12.1-1.3,23.8-5.4,34.1-11.9c6.5-4,12.8-8.4,18.8-13.2c1.9,33.2,4.7,65.3,5.7,80.4
          	c0,0.6,0.1,1.1,0.1,1.7c-6.9,3.8-13.3,9.6-17.9,13.5c-33.3,28.2-60.2,64.6-84.7,101.3c6.6-31.2,15.3-62,23.3-92.8
          	C87,473.1,93.9,446.9,100.9,420.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14RUF")}
            fill={this._ifPressed("14RUF")}
            d="M98.2,370.2l-0.6,16.4c-0.1,0.4-0.1,0.8,0,1.2l-0.3,8.5c-0.2,5.5,0.2,15-0.4,20.4c-5.3,0.3-10.6,0-15.9-1.1
          	c-13.2-2.7-25.8-7.9-37.1-15.2c-2.5-1.6-4.9-3.2-7.3-5v-43.1c11.7,0.6,24,5.5,34.7,8.9C80.3,364.1,89.3,367.1,98.2,370.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "15RUF")}
            fill={this._ifPressed("15RUF")}
            d="M99.1,342.3l-0.8,23.1c-9.3-3.4-18.8-6.5-28.3-9.4c-10.2-3.1-22.2-8-33.4-8.4v-63.4
          	c23.5,1.8,46.8,21.2,63.2,36.6L99.1,342.3z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "16RUF")}
            fill={this._ifPressed("16RUF")}
            d="M14.4,645.6H0v-62.9c7.5,11.6,14.4,23.5,20.8,35.8C19,622.2,16.8,632.2,14.4,645.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17RUF")}
            fill={this._ifPressed("17RUF")}
            d="M53.7,605.7c0.4-0.3,0.7-0.8,0.8-1.3c25.4-38.8,53.2-78.1,88.2-108.2c1.6-1.3,3.4-3,5.5-4.7
          	c-0.9,18.1-6.5,33.1-15.3,49.4c-13.1,24.2-26.7,48.1-39,72.7c-5.3,10.6-10.6,21.3-15.7,32H49c-1.8-12-3.3-21.3-4.4-25.9
          	C47.6,615,50.6,610.4,53.7,605.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18RUF")}
            fill={this._ifPressed("18RUF")}
            d="M139.7,537.9c-0.3,2-0.7,3.9-1,5.9c-0.2,0.4-0.3,0.8-0.2,1.2c-5.1,28.2-13,56.1-21.6,83.3
          	c-1.8,5.8-3.8,11.5-5.8,17.2H83.2c5.8-11.8,11.6-23.6,17.6-35.4C113.1,585.8,127.4,562.3,139.7,537.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "19RUF")}
            fill={this._ifPressed("19RUF")}
            d="M58.2,92.6c6.5-18.6,13-37.8,21.2-55.9c5.6,24.4,22.8,38.7,45.9,47.2c-9.2,0.1-18.5,0.4-27.7,1.2
          	C85.7,86,69.7,86.5,58.2,92.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20RUF")}
            fill={this._ifPressed("20RUF")}
            d="M267.4,363.7c0.8,16.7,5.9,32.9,13.6,48.8c19,39.7,44.4,77,71.7,111.6l-16.6,11.3c-5.8-21.5-35.8-59.3-46.4-73
          	c-11.7-15.2-42.1-21.6-61.4-57.9c-15.5-29.2-18.9-51.9-22.1-68.2c3.9,2.7,7.8,5.3,11.8,7.8C232.5,353.1,249.8,363.7,267.4,363.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "21RUF")}
            fill={this._ifPressed("21RUF")}
            d="M342.3,603.8c0.9,14.8,0.1,31.4,0.8,41.7h7.9c2.6-15.1,3.6-41.3,7.3-38.2c2.6,2.2,9.6,21.2,16.5,38.2h14.7
          	c-4.5-18.4-12.5-38.9-10.6-39.6s14.9,22,26.5,39.6H420c-7.7-20.5-24.7-47.9-22.7-49.3c2.7-2,47,57.1,46.5,44.2
          	c-0.6-13.7-27.9-45.3-32-55.9c-1.9-4.8-2.8-8.3-2.9-10.5l-0.2-0.1c-18.1-10.6-41.5-5-54.5-25c-1.6-2.5,2.4-4.9,4-2.4
          	c12.6,19.3,40.3,15.1,58.3,26.7c8.2,5.4,16.1,11.3,23.7,17.6c0-0.3,0-0.5,0-0.8c-1.4-9.3-33.8-43.5-45.1-50.5
          	c-10.6-6.5-18.4-9.7-24.1-22.2l-33.8,23c0,0.5,0.1,1,0.1,1.5C336.8,574.6,340.9,581.1,342.3,603.8z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "22RUF")}
            fill="white"
            d="M356,596.5c13.5,0.7,27.3-3.8,38.5-11.4c2.5-1.7,4.8,2.3,2.4,4c-11.8,8-26.6,12.7-40.8,12
          	C353,601,353,596.3,356,596.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "23RUF")}
            fill={this._ifPressed("23RUF")}
            d="M240.7,222.5c-10.4-7-20.2-14.9-29.4-23.4c-32.9-30.6-56-69-69.2-111.4c19.8,2.3,43.8,1,70.1,20.6
          	c33.5,24.9,28.4,102.1,28.4,112.6C240.6,221.4,240.7,222,240.7,222.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "24RUF")}
            fill={this._ifPressed("24RUF")}
            d="M179,234.9l-0.3-2.7c-2.4-21-3.1-42.3-0.6-62.9c8.9,12,18.9,23,29.9,33.1c10.6,9.8,22,18.7,34.1,26.6
          	c2.5,7.1,8,14.2,14.5,26.1c9,16.4,13.6,40.5,17.5,58.4c0.5,2.1,1.1,4.2,2,6.2c-1.9,4-3.5,8.2-4.8,12.5c-2.6,8.6-4,17.6-4,26.7
          	c-17.5,0-35-11.1-49.1-20.3c-4.5-2.9-9-5.9-13.4-9c-0.3-1.4-0.7-2.7-1-4c-3.8-13.3-12.2-42.3-19-55.6
          	C182.5,258.5,180.5,246.8,179,234.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "25RUF")}
            fill={this._ifPressed("25RUF")}
            d="M32,223.8v55.6c-11,1-21.7,4.8-32,10.2v-55c9.9-5,20.3-8.6,31.1-10.7C31.4,223.8,31.7,223.8,32,223.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "26LUF")}
            fill={this._ifPressed("26LUF")}
            d="M0,12.9V0h77.8C65.6,10.6,51.6,19.8,37.1,22.5C24.3,25,11.5,20.3,0,12.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "27LUF")}
            fill={this._ifPressed("27LUF")}
            d="M38.4,402.4c7.9,5.4,16.5,9.9,25.5,13.2c10.2,3.8,21.1,5.6,32,5.4c-16,60.2-34.2,120.5-45.8,181.7
          	c-2.7,4.2-5.4,8.3-8.1,12.4c-4-2.6-11.4-1.4-17.4,0.6c-2.5-4.8-5-9.6-7.7-14.3c0.2-13-4.2-26.7-7.4-39.2c-3-11.4-6.2-22.7-9.5-34
          	V413.7c11.6-3.9,22.9-8.7,33.8-14.3C35.3,400.5,36.8,401.5,38.4,402.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "28RUF")}
            fill={this._ifPressed("28RUF")}
            d="M275,336.1c1.1-3.7,2.4-7.3,3.9-10.8c7.1,11.8,19.6,22.2,30.6,41.3c14.4,24.9,15.2,33.5,19.5,59.2
          	c4.1,24.9,32.6,70.8,39.8,87.2l-12.4,8.4c-24.6-31-47.6-64.4-65.7-99.6C277.1,395.1,265.8,366.4,275,336.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "29RUF")}
            fill={this._ifPressed("29RUF")}
            d="M13.4,103c6.7,17.7,13,35.5,18.5,53.6V219c-11,2.3-21.8,5.9-32,10.6V93.2c4.9,1.6,9.2,3.7,12.3,6.8L13.4,103z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "30RUF")}
            fill={this._ifPressed("30RUF")}
            d="M0,88.5V68.2c3.4,8,6.5,16.1,9.4,24C6.4,90.7,3.3,89.4,0,88.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "31RUF")}
            fill={this._ifPressed("31RUF")}
            d="M11.7,592.5C8,586.2,4.1,580.1,0,574v-29c1.7,6.1,3.4,12.3,5,18.5C7.4,572.8,10.5,582.7,11.7,592.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "32RUF")}
            fill={this._ifPressed("32RUF")}
            d="M32,347.7h-0.4c-10.7,1.2-21.3,3.3-31.6,6.3v-59.5c10.5-5.9,21.4-10.1,32-10.4V347.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "33RUF")}
            fill={this._ifPressed("33RUF")}
            d="M32,352.3v42.8c-10.3,5.3-21,9.9-32,13.8v-50.5c10.6-3,21.2-5.4,31.6-6L32,352.3z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default RightUpperFrontSVG;

///--------------------------------------------------------
