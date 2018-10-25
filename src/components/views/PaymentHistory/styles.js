import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";
import { viewportWidth } from "../../../variables";

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  emptyComponentContainer: {
    padding: 20
  },
  seperatorStyle: {
    height: 6,
    width: "100%",
    backgroundColor: "#eeeeee"
  },
  itemContainer: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row"
  },
  itemRightContainer: {
    //padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  itemLeftContainer: {
    flex: 1
  }
});
