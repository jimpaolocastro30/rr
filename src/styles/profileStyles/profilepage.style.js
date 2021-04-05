import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  profileText: {
    fontSize: 30,
    marginLeft: 20
  },
  personIcon: {
    marginLeft: -3
  },
  firstContainer: {
    marginTop: 10
  },
  secondContainer: {
    marginTop: 30
  },
  inputContainer: {
    marginTop: 20,
    marginLeft: 10
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    paddingHorizontal: 7,
    alignSelf: "center",
    width: "100%"
  },
  borderLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3
  },
  touchContainer: {
    backgroundColor: "#fff",
    height: 70
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  leftText: {
    marginTop: 3,
    marginLeft: 10
  },
  iconSettings: {
    marginRight: 5
  },
  leftContainer: {
    alignItems: "center",
    flexDirection: "row"
  }
});

export default styles;
