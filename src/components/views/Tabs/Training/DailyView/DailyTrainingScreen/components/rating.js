import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { colors } from "../../../../../../styles/theme";
import ColoredImg from "../../../../../../../assets/images/rating-star-filled-icon.png";
import unColoredImg from "../../../../../../../assets/images/rating-star-empty-icon.png";
import { Button } from "common_cmp/";
const rating = [1, 2, 3, 4, 5];
class ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesSelectedCount: this.props.ratingStars || 0
    };
  }
  componentDidMount() {
    // console.log("did load");

    this.setState({
      text: this.props.text,
      date: this.props.date
    });
  }

  state = {
    text: ""
  };

  _onPressSubmit = () => {
    if (this.state.imagesSelectedCount == 0) {
      Alert.alert(
        "Are you sure?",
        "This will log your day of training, and the trainer will get notified about your workout",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    if (this.props.onPressSubmit)
      this.props.onPressSubmit({
        text: this.state.text,
        stars: this.state.imagesSelectedCount
      });
  };

  _onPressCancel = () => {
    if (this.props.onPressCancel) this.props.onPressCancel();
  };
  onPressRating = key => {
    this.setState({
      imagesSelectedCount: key
    });
  };
  _getRatings = () => {
    return rating.map((res, key) => {
      let imageCount = this.state.imagesSelectedCount;
      if (res <= imageCount) {
        return (
          <TouchableOpacity onPress={this.onPressRating.bind(this, res)}>
            <Image style={{ width: 30, height: 30 }} source={ColoredImg} />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={this.onPressRating.bind(this, res)}>
            <Image style={{ width: 30, height: 30 }} source={unColoredImg} />
          </TouchableOpacity>
        );
      }
    });
  };
  render() {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>{this.props.review_txt_title}</Text>
        </View>

        <View style={Styles.textInputContainer}>
          <TextInput
            style={Styles.textInputStyle}
            placeholder={"The experience was..."}
            placeholderTextColor="#cccccc"
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 40,
            marginBottom: 20
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Text style={Styles.descriptionText}>Rate your coach</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
              // marginTop: 10
            }}
          >
            {this._getRatings()}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              marginLeft: 10
            }}
          >
            <Text style={Styles.descriptionText}>
              {this.state.imagesSelectedCount}/5
            </Text>
          </View>
        </View>
        <View style={Styles.buttonContainer}>
          {/* <TouchableOpacity onPress={this._onPressCancel.bind(this)}>
            <Text style={Styles.buttons}>No, thanks</Text>
          </TouchableOpacity> */}
          <Button
            style={{ flex: 1, width: "100%" }}
            onPress={this._onPressSubmit.bind(this)}
          >
            <Text>{this.props.review_btn_title}</Text>
          </Button>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={this._onPressCancel.bind(this)}
          >
            <Text style={Styles.buttons}>cancel</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this._onPressSubmit.bind(this)}>
            <Text style={Styles.buttons}>Done</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const Styles = {
  mainContainer: {
    width: "100%",
    height: "80%",
    padding: 30,
    borderRadius: 20,
    marginTop: 40,
    alingItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },

  titleContainer: {
    alignItems: "flex-start",
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 18
  },

  acheivedText: {
    fontSize: 60
  },
  descriptionTextcontainer: {
    padding: 5,
    alignItems: "center"
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textInputStyle: {
    borderWidth: 2,
    height: "100%",
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 5,
    fontSize: 18
  },
  textInputContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 2
  },
  buttonContainer: {
    flex: 1,

    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%"
    // height: "auto"
  },
  buttons: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#cccccc",
    fontWeight: "bold"
  },
  optionalText: {
    color: "#aeaeae"
  }
};

export default connect(
  mapStateToProps,
  {}
)(ratings);
