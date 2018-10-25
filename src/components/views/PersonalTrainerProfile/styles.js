import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";
import { viewportWidth } from "../../../variables";

const padding = 40;

export default StyleSheet.create({
  mainContainer: {
    paddingVertical: null,
    flexDirection: "column",
    backgroundColor: "#fff",
    flex: 1
    /*flex: 1,
		backgroundColor:'white',
		paddingTop:10,*/
  },
  trainerContainerStyle: {
    height: 1000
  },
  underlineStyle: {
    //  height: 1,
    backgroundColor: "#ea1e39"
  },
  tabBarTextStyle: {
    color: "#ea1e39"
  },

  contentContainer: {},

  trainerContainerStyle: {
    //flexDirection: 'row',
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 5
  },
  trainerImageContainer: {
    flex: 1
    //borderWidth:2,
  },
  trainerImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
    //borderWidth:2,
    marginTop: 5
  },
  trainerLocationStyle: {
    color: "#cccccc"
  },
  trainerDescriptionStyle: {
    color: "#181f31",
    alignSelf: "flex-end",
    textAlign: 'right',
    paddingTop:3,
    paddingBottom: 3,
  },
  trainerDetailStyle: {
    color: "#cccccc"
  },

  trainerNameStyle: {
    color: "#181f31",
    fontSize: 18,
    fontWeight: "bold"
  },

  profileDetailSection: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
