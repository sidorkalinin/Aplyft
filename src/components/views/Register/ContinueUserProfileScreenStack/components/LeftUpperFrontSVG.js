import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class LeftUpperFrontSVG extends PureComponent {
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
            onPress={this._onItemSelect.bind(this, "1LUF")}
            fill={this._ifPressed("1LUF")}
            d="M308.8,242.1c0,0,0-0.1,0-0.1c-14.8-20.2-28.7-40.7-37.6-64.3c1.2,17.5,0.8,35.2-1.2,52.6
          	C282.3,227.9,296.9,234.9,308.8,242.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "2LUF")}
            fill={this._ifPressed("2LUF")}
            d="M341.8,396.4l-0.3-8.3c-12-16.6-31.6-29.1-49.7-40.1c-0.2,13.1-0.7,27.4-1.5,41.6c15,12.7,32.5,24,51.7,26.6
          	C341.2,409.8,342,402.4,341.8,396.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "3LUF")}
            fill={this._ifPressed("3LUF")}
            d="M243.9,645.6h11.8c-2.4-10.9-5.6-21.6-9.4-32.1C245.4,622.7,244.6,633.2,243.9,645.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "4LUF")}
            fill={this._ifPressed("4LUF")}
            d="M341.2,380.2l-0.9-25c-10.5-18.5-30.5-32.6-49.7-44c0.9,10.4,1.3,20.9,1.2,31.3
          	C309.2,353,328.1,364.9,341.2,380.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "5LUF")}
            fill={this._ifPressed("5LUF")}
            d="M269,237.7c-1,7.4-2.1,14.8-3.4,22.1c-0.3,1.4,0.4,2.8,1.6,3.4c4.7,2.4,8.6,15.9,18.8,29.8
          	c1.5,2.1,2.7,5.9,3.6,10.9c0.2,0.9,0.7,1.8,1.5,2.3c18,10.6,36.9,23.6,48.8,40.1l-0.1-3.9l-0.8-22.3c0-0.1,0-0.2,0-0.3l-0.9-26.3
          	c-0.1-3.7-0.3-7.4-0.4-11.1c-0.1-0.1-0.2-0.3-0.3-0.4c-1.1-1.6-2.2-3.3-3.3-4.9c-5.5-7.9-11.2-15.7-16.9-23.4
          	c-0.2-0.3-0.5-0.5-0.8-0.7c-11.5-7.9-30.1-20.3-45-18C270.2,235.1,269.2,236.3,269,237.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6LUF")}
            fill={this._ifPressed("6LUF")}
            d="M283.7,482.7c-3.8,31.6-18.6,51.3-25.6,72c-4.5,13.1-7.9,26.6-10.6,48.8c5.2,12.6,9.4,25.7,12.4,39
          	c0.4-4.6,1-9.3,1.8-14c5-29.9,15.4-63.7,38.7-84.7c-1.2-6.9-2.3-13.8-3.1-20.7c0-0.1,0-0.1,0-0.2c-4.3-11.3-6.5-23.3-6.5-35.3
          	C288.5,485.9,286.1,484.2,283.7,482.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7LUF")}
            fill={this._ifPressed("7LUF")}
            d="M319.5,249.2L319.5,249.2C319.5,249.2,319.5,249.2,319.5,249.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8LUF")}
            fill={this._ifPressed("8LUF")}
            d="M316.4,245.4l2.8,3.6l0.3,0.2l0,0l0,0c-0.3-0.2,1,1.4,1,1.4c6.1,7.8,12.1,15.7,17.7,23.8
          	c1.3-10.5,6.5-19.5,13.8-26.9C340.4,249.5,327.8,247.9,316.4,245.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "9LUF")}
            fill={this._ifPressed("9LUF")}
            d="M297.4,219.5c4.6,6.9,9.5,13.5,14.6,20.1c14.9,3.6,33,6.6,47.7,1.1c3.7-2.8,7.7-5.4,11.8-7.6
          	c8.7-4.7,17.8-8.6,27.2-11.6c2.2-0.7,5.5-2.3,8.5-2.8v-62.1c-6-18.9-12.3-37.8-18.9-56.5c-11.6-10.5-35.1-10-49.6-10.8
          	c-10.8-0.6-21.5-0.8-32.3-0.6c-8,26.1-19.9,50.8-35.4,73.4C276.6,182.5,285.5,201.9,297.4,219.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "10LUF")}
            fill={this._ifPressed("10LUF")}
            d="M407.8,27.5c-14.9-2.8-29-11.2-41.5-21.4c0.2,4.4,0.2,9.2,0.1,14.5c-0.1,2.8-0.3,5.4-0.6,8
          	C376,50,383.6,73,391.3,95.1l0.9,2.6c0.1,0.2,0.1,0.3,0.2,0.5c5.9,16.7,11.5,33.5,17,50.4c5.4-17,11.3-33.9,17.8-50.5
          	c0-0.1,0.1-0.2,0.1-0.3c0.5-1.2,0.9-2.3,1.3-3.5c4.6-11.8,9.4-24.6,15-36.8V18.5C432.3,25.5,419.9,29.8,407.8,27.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11LUF")}
            fill={this._ifPressed("11LUF")}
            d="M301.3,549.3c-20,19.7-30,49.9-34.5,76.8c-1.1,6.5-1.9,13-2.4,19.5h63.5c-3.1-8.8-6.1-17.7-8.8-26.7
          	C312.3,596.1,305.8,572.8,301.3,549.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12LUF")}
            fill={this._ifPressed("12LUF")}
            d="M342.5,281.6c0,0.3,0,0.6-0.1,0.9c0.7,3.4,0.4,7,0.6,10.8l0.7,21.2c16.6-15.3,40.6-34.7,63.4-35.4v-55.6
          	c-9.9,0.9-22,7.5-29.4,11.4C359.3,244.6,341.5,259.1,342.5,281.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "13LUF")}
            fill={this._ifPressed("13LUF")}
            d="M342.9,420.6c-12.1-1.3-23.8-5.4-34.1-11.9c-6.5-4-12.8-8.4-18.8-13.2c-1.9,33.2-4.7,65.3-5.7,80.4
          	c0,0.6-0.1,1.1-0.1,1.7c6.9,3.8,13.3,9.6,17.9,13.5c33.3,28.2,60.2,64.6,84.6,101.3c-6.6-31.2-15.3-62-23.3-92.8
          	C356.7,473.1,349.8,446.9,342.9,420.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14LUF")}
            fill={this._ifPressed("14LUF")}
            d="M345.6,370.2l0.6,16.4c0.1,0.4,0.1,0.8,0,1.2l0.3,8.5c0.2,5.5-0.2,15,0.4,20.4c5.3,0.3,10.6,0,15.9-1.1
          	c13.2-2.7,25.8-7.9,37.1-15.2c2.5-1.6,4.9-3.2,7.3-5v-43.1c-11.7,0.6-24,5.5-34.7,8.9C363.4,364.1,354.4,367.1,345.6,370.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "15LUF")}
            fill={this._ifPressed("15LUF")}
            d="M344.6,342.3l0.8,23.1c9.4-3.3,18.8-6.5,28.3-9.4c10.2-3.1,22.2-8,33.4-8.4v-63.4
          	c-23.5,1.9-46.8,21.2-63.2,36.6L344.6,342.3z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "16LUF")}
            fill={this._ifPressed("16LUF")}
            d="M429.4,645.6h14.4v-62.9c-7.5,11.6-14.4,23.5-20.8,35.8C424.7,622.2,426.9,632.2,429.4,645.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17LUF")}
            fill={this._ifPressed("17LUF")}
            d="M390.1,605.7c-0.4-0.3-0.7-0.8-0.8-1.3c-25.4-38.8-53.2-78.1-88.2-108.2c-1.6-1.3-3.4-3-5.5-4.7
          	c0.9,18.1,6.5,33.1,15.3,49.4c13.1,24.2,26.7,48.1,39,72.7c5.3,10.6,10.6,21.3,15.7,32h29.1c1.8-12,3.3-21.3,4.4-25.9
          	C396.1,615,393.1,610.4,390.1,605.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18LUF")}
            fill={this._ifPressed("18LUF")}
            d="M304,537.9c0.3,2,0.7,3.9,1,5.9c0.2,0.4,0.3,0.8,0.2,1.2c5.1,28.2,13,56.1,21.6,83.3c1.8,5.8,3.8,11.5,5.8,17.2
          	h27.9c-5.8-11.8-11.6-23.6-17.6-35.4C330.6,585.8,316.3,562.3,304,537.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "19LUF")}
            fill={this._ifPressed("19LUF")}
            d="M385.5,92.6c-6.5-18.6-13-37.8-21.2-55.9c-5.6,24.4-22.8,38.7-46,47.2c9.2,0.1,18.5,0.4,27.6,1.2
          	C358,86,374.1,86.5,385.5,92.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20LUF")}
            fill={this._ifPressed("20LUF")}
            d="M176.3,363.7c-0.8,16.7-5.9,32.9-13.6,48.8c-19,39.7-44.4,77-71.7,111.6l16.6,11.3c5.8-21.5,35.8-59.3,46.3-73
          	c11.7-15.2,42.1-21.6,61.4-57.9c15.5-29.2,18.9-51.9,22.1-68.2c-3.9,2.7-7.8,5.3-11.8,7.8C211.3,353.1,193.9,363.7,176.3,363.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "21LUF")}
            fill={this._ifPressed("21LUF")}
            d="M106.7,541.9c0-0.5,0-1,0.1-1.5l-33.8-23c-5.8,12.5-13.6,15.6-24.2,22.2c-11.3,7-43.7,41.2-45.1,50.5
          	c0,0.3-0.1,0.5-0.1,0.8c7.6-6.3,15.5-12.2,23.7-17.6c18-11.6,45.7-7.3,58.3-26.7c1.6-2.5,5.7-0.2,4,2.4c-13,20-36.4,14.4-54.5,25
          	l-0.2,0.1c-0.1,2.2-1,5.7-2.9,10.5c-4.1,10.6-31.4,42.2-32,55.9c-0.5,12.8,43.7-46.2,46.5-44.2c1.9,1.4-15,28.9-22.7,49.3h14.6
          	C49.8,628,63,605.3,64.8,606c1.8,0.7-6,21.2-10.6,39.6h14.7c6.9-17,13.9-36,16.5-38.2c3.7-3.1,4.7,23.2,7.3,38.2h7.8
          	c0.7-10.3-0.1-26.9,0.8-41.7C102.8,581.1,107,574.6,106.7,541.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "22LUF")}
            fill="white"
            d="M87.7,601.2c-14.2,0.7-29-4-40.8-12c-2.5-1.7-0.1-5.7,2.4-4c11.2,7.6,25,12.1,38.5,11.4
          	C90.7,596.3,90.7,601,87.7,601.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "23LUF")}
            fill={this._ifPressed("23LUF")}
            d="M203,222.5c10.4-7,20.2-14.9,29.4-23.4c32.9-30.6,56-69,69.2-111.4c-19.8,2.3-43.8,1-70.1,20.6
          	c-33.5,24.9-28.4,102.1-28.4,112.6C203.1,221.4,203.1,222,203,222.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "24LUF")}
            fill={this._ifPressed("24LUF")}
            d="M264.7,234.9l0.3-2.7c2.4-21,3.1-42.3,0.6-62.9c-8.9,12-18.9,23-29.9,33.1c-10.6,9.8-22,18.7-34.1,26.6
          	c-2.5,7.1-8,14.2-14.5,26.1c-9,16.4-13.6,40.5-17.5,58.4c-0.5,2.1-1.1,4.2-2,6.2c1.9,4,3.5,8.2,4.8,12.5c2.6,8.6,4,17.6,4,26.7
          	c17.5,0,35-11.1,49.1-20.3c4.5-2.9,9-5.9,13.4-9c0.3-1.4,0.7-2.7,1-4c3.8-13.3,12.2-42.3,19-55.6
          	C261.2,258.5,263.2,246.8,264.7,234.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "25LUF")}
            fill={this._ifPressed("25LUF")}
            d="M411.7,223.8v55.6c11,1,21.7,4.8,32,10.2v-55c-9.9-5-20.3-8.6-31.1-10.7C412.3,223.8,412,223.8,411.7,223.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "26LUF")}
            fill={this._ifPressed("26LUF")}
            d="M443.7,12.9V0H366c12.2,10.6,26.2,19.8,40.7,22.5C419.4,25,432.2,20.3,443.7,12.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "27LUF")}
            fill={this._ifPressed("27LUF")}
            d="M405.4,402.4c-7.9,5.4-16.5,9.9-25.5,13.2c-10.2,3.8-21.1,5.6-32,5.4c16,60.2,34.2,120.5,45.8,181.7
          	c2.7,4.2,5.4,8.3,8.1,12.4c4-2.6,11.4-1.4,17.4,0.6c2.5-4.8,5-9.6,7.7-14.3c-0.2-13,4.2-26.7,7.4-39.2c3-11.4,6.2-22.7,9.5-34V413.7
          	c-11.6-3.9-22.9-8.7-33.8-14.3C408.4,400.5,406.9,401.5,405.4,402.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "28LUF")}
            fill={this._ifPressed("28LUF")}
            d="M168.7,336.1c-1.1-3.7-2.4-7.3-3.9-10.8c-7.1,11.8-19.6,22.2-30.6,41.3c-14.4,24.9-15.2,33.5-19.5,59.2
          	c-4.1,24.9-32.7,70.8-39.8,87.2l12.4,8.4c24.6-31,47.6-64.4,65.7-99.6C166.6,395.1,177.9,366.4,168.7,336.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "29LUF")}
            fill={this._ifPressed("29LUF")}
            d="M430.3,103c-6.7,17.7-13,35.5-18.5,53.6V219c11,2.3,21.8,5.9,32,10.7V93.2c-4.9,1.6-9.2,3.7-12.3,6.8L430.3,103
          	z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "30LUF")}
            fill={this._ifPressed("30LUF")}
            d="M443.7,88.5V68.2c-3.4,8-6.5,16.1-9.4,24C437.3,90.7,440.4,89.4,443.7,88.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "31LUF")}
            fill={this._ifPressed("31LUF")}
            d="M432,592.5c3.7-6.3,7.7-12.4,11.7-18.5v-29c-1.7,6.1-3.4,12.3-5,18.5C436.3,572.8,433.2,582.7,432,592.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "32LUF")}
            fill={this._ifPressed("32LUF")}
            d="M411.7,347.7h0.4c10.7,1.2,21.3,3.3,31.6,6.3v-59.5c-10.5-5.9-21.4-10.1-32-10.4V347.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "33LUF")}
            fill={this._ifPressed("33LUF")}
            d="M411.7,352.3v42.8c10.3,5.3,21,9.9,32,13.8v-50.5c-10.5-3-21.2-5.4-31.6-6L411.7,352.3z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default LeftUpperFrontSVG;

///--------------------------------------------------------
