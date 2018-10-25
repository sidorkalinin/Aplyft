import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";
import { viewportWidth } from "../../../variables";

const padding = 40;

export default StyleSheet.create({
  scrollContainer:{
    flex:1,
    backgroundColor: "white",
    // backgroundColor: "#171d2a",
    
  },
  mainConatiner: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  descriptionStyle: {
    //flex: 1,
    fontSize: 15
  },
  amountStyle: {
    fontWeight: "900",
    fontSize: 15,
    alignSelf: "center",
    color: "#171f30"
  },

  blueHeader: {
    width: "100%",
    height: 450, // workaround
    marginTop: -310,
    backgroundColor: "#171d2a"
  },
  avatarAllContainer: {
    padding: 10,
    marginTop: -55,
    alignItems: "center",
    paddingBottom: 30,
    borderRadius: 45, 
    overflow: "hidden",
  },
  avatarContainer: {
    alignItems: "center",
    borderRadius: 45, 
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white"
  },
  imageStyle: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  fullNameStyle: {
    color: colors.darkBlueColor,
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 10
  },
  paypalBtnStyle: {
    width: 200,
    height: 50
  },
  paymentContainer: {
    padding: 20
  },
  inputStyle: {
    paddingLeft: 10,
    color: "#181f31",

    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
});
