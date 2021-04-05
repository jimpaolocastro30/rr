import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  },
  container: {
    position: "absolute",
    marginLeft: 30,
    marginTop: 40,
    height: "100%",
    justifyContent: "space-between"
  },
  touchContainer: {
    width: width / 6
  },
  saveButton: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.2,
    alignContent: "flex-end",
    marginBottom: 60
  },
  saveText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  },
  arrowContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "blue"
  },
  arrow: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 10
  }
});

export default styles;
