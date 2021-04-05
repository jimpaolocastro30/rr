import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 100
  },
  signInText: {
    fontSize: 36,
    fontWeight: "bold"
  },
  inputContainer: {
    marginTop: 20,
    marginLeft: 10
  },
  item: {
    marginTop: 10,
    width: width / 1.3,
    alignSelf: "center"
  },
  itemPass: {
    marginTop: 20,
    width: width / 1.3,
    alignSelf: "center"
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
  loginButton: {
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 10,
    width: width / 1.3,
    alignSelf: "center",
    backgroundColor: "#09afff",
    height: 40
  },
  loginText: {
    color: "#fff",
    alignSelf: "center"
  },
  midContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  line: {
    height: 1,
    backgroundColor: "black",
    width: width / 6,
    marginTop: 20
  },
  signInLabel: {
    alignSelf: "center",
    paddingHorizontal: 30,
    marginTop: 15,
    fontSize: 14
  },
  bottomContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 50,
    justifyContent: "space-between",
    width: width / 2.5
  },
  noAccountLabel: {
    color: "#09afff",
    marginLeft: 25,
    padding: 5,
    fontSize: 14
  },
  registerText: {
    marginTop: 40
  }
});

export default styles;
