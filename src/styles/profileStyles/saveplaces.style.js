import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  text: {
    fontSize: 25,
    marginLeft: 60
  },
  secondContainer: {
    marginTop: 10,
    maxHeight: "90%"
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3
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
  homeText: {
    fontSize: 20,
    marginLeft: 10
  },
  placeText: {
    fontSize: 14,
    marginLeft: 10
  },
  borderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3
  },
  saveButton: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    marginBottom: 20
  },
  saveText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  },
  addPlace: {
    backgroundColor: "#F0FFFF",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    position: "absolute",
    bottom: (width / 10 ) / 2
  },
  addPlaceText: {
    color: "blue",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  },
  inputSavePlace: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    position: "absolute",
    top: 50
  }
});

export default styles;
