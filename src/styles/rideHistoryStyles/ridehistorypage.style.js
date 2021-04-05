import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  body: {
    marginTop: 10,
    marginBottom: 8
  },
  listContainer: {
    height: "100%"
  },
  listItems: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  thumbnail: {
    borderRadius: 10
  },
  rightContainer: {
    marginLeft: 20
  },
  date: {
    fontSize: 12,
    marginTop: 5,
    color: "grey"
  },
  listBody: {
    marginBottom: -10
  },
  borderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});

export default styles;
