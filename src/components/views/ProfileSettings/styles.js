import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";
import { viewportWidth } from "../../../variables";

const padding = 40;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  headConatiner: {
    padding: 20,
    alignItems: "center"
  },
  ScrollContainer: {
    flex: 1
  },
  imageContainer:{
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
  },
  imageStyle: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  plusIconStyle: {
    alignItems:'center',
    justifyContent:'center',
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "red"
  },
  plusTextStyle: {
    // paddingLeft: 5,
    marginTop: -4,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  nameContainer: {
    padding: 10
  },
  nameStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkBlueColor
  },
  rightButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  rightButtonImage: {
    width: 20,
    height: 20
  },
  separator: {
    flex: 1,

    height: StyleSheet.hairlineWidth,

    backgroundColor: "#8E8E8E"
  },

  container: {
    flex: 1,

    padding: 2,
    //marginTop:10,
    // alignItems: 'center',

    backgroundColor: "#fff"
  }
});
