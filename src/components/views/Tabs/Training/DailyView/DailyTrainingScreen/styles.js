import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/theme";
import { viewportWidth } from "../../../../../../variables";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.backgroundGray,
    
  },
  fetchingContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    padding: 20,
    alignItems: "center"
  },
  fetchingTextStyle: {
    color: "#bebebe",
    paddingTop: 5
  },
  seperatorStyle: {
    height: 6,
    width: "100%",
    backgroundColor: "#eeeeee"
  },

  container: {
    alignItems: "center",
    backgroundColor: "#ede3f2",
    padding: 100
  },
  modal: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  text: {
    color: "#3f2949",
    marginTop: 10
  }
});
