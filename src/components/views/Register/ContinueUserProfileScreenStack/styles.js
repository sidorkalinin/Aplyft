import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";
import { viewportWidth } from "../../../../variables";

const padding = 40;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  seperatorStyle: {
    height: 1,
    width: "100%",
    backgroundColor: "#eeeeee"
  },
  ScrollContainer: {
    flex: 1
  },
  imageStyle: {},
  submitContainer: {
    padding: 20,
    paddingBottom: 5,
    height: 70
  },
  skipBottomContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  skipBottomStyle: {
    textAlign: "center",
    textDecorationLine: "underline"
  },
  injuryContainer: {
    padding: 20
  },
  injuryTextInputStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#eeeeee",
    minHeight: 100,
    width: "100%",
    padding: 8,
    textAlignVertical: "top",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 14
  },
  radioButtonContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 20,
    borderColor: "green",
    width: "100%"
  },
  radioButtonRightContainer: {
    flex: 2,
    alignItems: "center"
  },
  radioButtonLeftContainer: {
    flex: 2,
    alignItems: "center"
  }
});
