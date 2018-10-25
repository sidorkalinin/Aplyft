import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";
import { viewportWidth } from "../../../variables";

const padding = 40;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  ScrollContainer: {
    flex: 1
  },
  inputStyle: {
    padding: 20
  },
  rowStyle: {
    borderTopWidth: 1,
    borderColor: "#eeeeee"
  },
  injuryContainer: {
    padding: 20
  },

  radioButtonRightContainer: {
    flex: 2,
    alignItems: "center"
  },

  radioButtonLeftContainer: {
    flex: 2,
    alignItems: "center"
  },
  radioButtonContainer: {
    borderTopWidth: 1,
    borderColor: "#eeeeee",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%"
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 30
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
  }
});
