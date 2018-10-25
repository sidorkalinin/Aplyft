import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: "white" //colors.backgroundGray
  },
  seperatorStyle: {
    flex: 1,
    height: 2,
    width: "100%",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#eeeeee"
  },
  searchContainer: {
    borderWidth: 0,
    width: "100%",
    backgroundColor: "#eeeeee",
    marginBottom: 5
  },
  inputStyle: {
    padding: 20
  },
  viewmoreStyle: {
    color: "red",
    textDecorationLine: "underline"
  },
  performanceTypeText: {
    fontWeight: "900"
  },

  itemContainer: {
    height: 70,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10
  },
  expertcontainerStyle: {
    flexDirection: "column",
    flex: 1
  }
});
