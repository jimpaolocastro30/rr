import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  },
  midContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginLeft: 15,
    marginRight: 15
  },
  picker: {
    marginLeft: 10,
    backgroundColor: "#F0FFFF",
    height: 45,
  },
  borderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5
  },
  listBody: {
    maxHeight: 200,
    marginRight: 30,
    marginLeft: 10
  },
  listContainer: {
    maxHeight: 40,
    marginTop: 5
  },
  listItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -10
  },
  thumbnail: {
    borderRadius: 10
  },
  leftContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  rightContainer: {
    marginLeft: 20
  },
  eta: {
    fontSize: 12,
    marginTop: 5,
    color: "grey"
  }
});

export default styles;
