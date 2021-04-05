import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  text: {
    fontSize: 25,
    marginLeft: 80
  },
  secondContainer: {
    marginTop: 10
  },
  touchContainer: {
    height: 70
  },
  account: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 30,
    marginTop: 20
  },

  grabText: {
    fontSize: 20,
    marginLeft: 10
  },
  borderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3
  }
});

export default styles;
