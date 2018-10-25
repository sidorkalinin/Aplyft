import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white", //colors.backgroundGray,
    flexDirection: "column"
  },

  inputStyle: {
    padding: 20
  },

  resetButtonContainer: {
    padding: 20
  },

  inputContainer: {
    flex: 2,
    width: "100%"
  },

  searchContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    marginBottom: 5,
    borderRadius: 10,
    borderColor: "#eeeeee",
    borderWidth: 3
  },
  comparisonTitle: {
    color: "#181f31",
    fontSize: 18
  },
  comparisonDataText: {
    color: "#181f31",
    fontSize: 16,
    fontWeight: "900"
  }
});
