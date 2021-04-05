import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    justifyContent: "space-between"
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    marginLeft: 30
  },
  firstContainer: {
    marginTop: 10
  },
  inputContainer: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
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
  saveButton: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    marginBottom: 40
  },
  saveText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  }
});

export default styles;
