import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/theme";
import { viewportWidth } from "../../../../../../variables";
import { Platform } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  seperatorStyle: {
    height: 6,
    width: "100%",
    backgroundColor: "#eeeeee"
  },
  headerContainer: {
    padding: 20
  },
  headerTitle: {
    fontWeight: "bold",
    paddingBottom: 15
  },
  headerDescription: {
    paddingBottom: 5
  },
  headerTextInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15
  },
  emptyComponentContainer: {
    padding: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: Platform.OS === "ios" ? 30 : 38,
    // height: ((Platform.OS === 'ios') ? 30 : 38),
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: "#eaebed",
    borderRadius: 2,
    ...Platform.select({
      android: {
        paddingBottom: 9
      }
    })
    //fontFamily:'Zetta Serif'
  },
  sections: {
    marginTop: 55,
    borderBottomWidth: 0,
    padding: 5,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#eeeeee",
    position: "relative"
    //borderWidth: 2,
  },

  Cancelsection: {
    marginTop: 25,
    //alignSelf: "baseline",
    borderBottomWidth: 0,
    padding: 5,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#eeeeee",
    position: "relative"
  },
  ListmainContainer: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 10,
    backgroundColor: "white"
  },

  descriptionContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    paddingBottom: 25,
    justifyContent: "flex-end"
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.darkBlueColor
  },
  descriptionStyle: {
    fontSize: 14,
    paddingTop: 10,
    color: colors.darkBlueColor
  },
  HeaderRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "white",
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#e2e2e2"
  },
  HeaderInside_RowContainer: {
    flex: 2,
    flexDirection: "row"
  },
  HeaderTitleContainer: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    alignItems: "center"
  },
  HeaderRowValues: {
    color: "#777777"
  },
  recomendedStyle: {
    fontSize: 12,
    color: "#cccccc"
  },
  acc_caloriesStyle: {
    color: "red"
  }
});
