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
    marginLeft: 40
  },
  secondContainer: {
    marginTop: 15
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  touchContainer: {
    height: 70
  },
  account: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 30,
    marginTop: 7
  },
  checkContainer: {
    backgroundColor: "lightgreen",
    borderRadius: 40,
    width: 25,
    height: 25,
    marginLeft: 10
  },
  check: {
    marginTop: 5,
    alignSelf: "center"
  },
  thumbnail: {
    borderRadius: 10
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
