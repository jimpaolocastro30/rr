import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    justifyContent: "space-between",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  nameContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
  },
  nameInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    paddingHorizontal: 7,
    width: width / 2.8,
  },
  nameInputBorderless: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    paddingHorizontal: 7,
    width: width / 2.8,
    borderColor: "white"
  },
  lastNameInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    marginLeft: 20,
    paddingHorizontal: 7,
    width: width / 2.8,
  },
  lastNameInputBorderless: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    marginLeft: 20,
    paddingHorizontal: 7,
    width: width / 2.8,
    
    borderColor: "white"
  },
  lastName: {
    marginLeft: 20,
  },
  text: {
    fontSize: 25,
    marginLeft: 50,
  },
  firstContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    paddingHorizontal: 7,
    alignSelf: "center",
    width: "100%",
  },
  textInputBorderless: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderWidth: 0.1,
    marginTop: 5,
    paddingHorizontal: 7,
    alignSelf: "center",
    width: "100%",
    borderColor: "white"
  },
  saveButton: {
    backgroundColor: "#20639B",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    marginBottom: 40,
  },
  cancelButton: {
    backgroundColor: "#C70039",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    marginBottom: 10,
  },
  saveText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10,
  },
});

export default styles;
