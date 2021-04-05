import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  input: {
    marginTop: 15,
    backgroundColor: "#f5f5f5",
    height: 40,
    paddingLeft: 20,
    width: width / 1.2,
    alignSelf: "center"
  },
  mainBorderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3,
    marginTop: 30
  },
  borderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3,
    marginTop: 10
  },
  listContainer: {
    height: "100%"
  },
  listItems: {
    marginTop: 10
  },

  date: {
    fontSize: 12,
    color: "grey"
  },
  listBody: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: -10
  }
});

export default styles;
