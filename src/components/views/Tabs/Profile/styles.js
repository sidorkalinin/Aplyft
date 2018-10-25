import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: null,
    backgroundColor: "#fff",
    position: "relative"
  },

  HeaderStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#eeeeee",
    marginTop: 0,
    height: 130
  },

  headerinfoStyle: {
    // flexDirection: 'column',
    alignItems: "center",
    // borderWidth:1,
    flex: 1
  },

  forwardicon: {
    width: 18,
    height: 18,
    alignSelf: "center"
  },

  HeaderprofileStyle: {
    height: 90,
    width: 90,
    borderRadius: 45
  },
  mainContainerImage: {
    overflow: "hidden",
    borderRadius: 65
  },

  settingsStyle: {
    height: 25,
    width: 25,
    marginBottom: 120
  },

  usernameStyle: {
    // width: '90%',
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkBlueColor
    // borderWidth:1,
  },

  headertextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    marginTop: 5
  },

  expertcontainerStyle: {
    flexDirection: "column",
    flex: 1
  },

  buttonStyle: {
    backgroundColor: "#181f31",
    borderRadius: 3,
    borderWidth: 0,
    borderColor: "#181f31",
    marginLeft: 0,
    marginRight: 0,
    width: 180,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  ReviewbuttonStyle: {
    backgroundColor: "red",
    borderRadius: 3,
    borderWidth: 0,
    borderColor: "red",
    marginLeft: 0,
    marginRight: 0,
    width: 180,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonWrapper: {
    paddingTop: 5,
    paddingBottom: 5
  },
  ReviewbuttonWrapper: {
    paddingTop: 5,
    paddingBottom: 5
  },

  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 3,
    paddingBottom: 0
  },

  viewmoreStyle: {
    textDecorationLine: "underline",
    color: "red",
    fontSize: 12,
    fontWeight: "bold"
  },

  optoutStyle: {
    textDecorationLine: "underline",
    color: "#ddd",
    fontSize: 14
  },

  expertdetail: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10
  },

  experticonStyle: {
    width: 70,
    height: 70,
    borderRadius: 35
  },

  expertNameStyle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  fitnessexpertStyle: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10
  },
  mainPaymentContainer: {
    padding: 20,
    backgroundColor: "#eeeeee"
  },
  paymentAmountStyle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  paymentDescriptionStyle: {
    paddingTop: 5,
    paddingBottom: 5
  },

  plusIconStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "red"
  },
  plusTextStyle: {
    paddingLeft: 3,
    marginTop: -4,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  modal: {
    flex: 1,
    alignItems: "center",
    padding: 30
  }
});
