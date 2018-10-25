import { StyleSheet } from "react-native";
import { colors } from "../../../../../../../styles/theme";
//import { viewportWidth } from "../../../../../../variables";
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
  rightButtonImage: {
    width: 20,
    height: 20,
    padding: 10
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
    height: 50,
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
  ItemTitleColumnTitle: {
    width: 100,
    padding: 10,
    paddingTop: 14,
    paddingBottom: 10,
    fontSize: 16
  },
  ItemTitleColumnRequired: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16
  },
  ItemTitleColumnAchivedContainer: {
    width: 100,
    backgroundColor: "#eeeeee",
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "flex-end"
  },
  ItemTitleColumnAchivedInputContainer: {
    backgroundColor: "white",
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "red",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 40
  },
  ItemTitleColumnAchivedText: {
    color: "#cccccc",
    fontSize: 12,
    fontWeight: "400"
  },
  ItemInputStyle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    height: "100%",
    width: "100%",
    textAlign: "right"
  },

  InfoContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#cccccc"
  },
  NameAndValueContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  MealtitleStyle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    height: "100%",
    width: "100%",
    textAlign: "left",
    paddingLeft: 10
  },
  MacroText: {
    color: "#777777",
    fontWeight: "900",
    fontSize: 16
  },
  MacroValues: {
    color: "#777777",
    fontWeight: "200",
    fontSize: 16
  }
});
