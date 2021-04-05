import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    marginTop: 20,
    // justifyContent: "space-between"
  },
  firstContainer: {
    marginLeft: 30,
    marginRight: 30
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    marginLeft: 60
  },
  rtContainer: {
    borderWidth: 3,
    borderColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5
  },
  rt: {
    fontSize: 24,
    alignSelf: "center",
    marginTop: 6,
    color: "blue"
  },
  tokenContainer: {
    alignItems: "center",
    marginTop: 10
  },
  tokenText: {
    marginTop: 10,
    fontSize: 20
  },
  borderLine: {
    borderWidth: 0.2,
    borderColor: "grey",
    marginTop: 20
  },
  buyRide: {
    fontSize: 20,
    marginLeft: 40,
    marginTop: 20
  },
  boxToken: {
    height: 40,
    width: width / 2.7,
    backgroundColor: "#F0FFFF",
    borderColor: "grey",
    borderWidth: 1,
  },
  boxTokenSelected: {
    height: 40,
    width: width / 2.7,
    backgroundColor: "#F0FFFF",
    borderColor: "blue",
    borderWidth: 1,
  },
  priceText: {
    alignSelf: "center",
    fontSize: 24
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  paymentMethodContainer: {
    alignItems: "center"
  },
  paymentCard: {
    width: 350
  },
  paymentTypesContainer: {
    flexDirection: "row",
  },
  paymentTypeLogo: {
    marginLeft: 5
  },
  paymentTypeSelected: {
    borderWidth: 1,
    borderColor: "blue"
  },
  paymentMethodText: {
    fontSize: 20,
    marginLeft: 40,
    marginTop: 20
  },
  saveButton: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    marginBottom: 10,
    marginTop: 20
  },
  saveText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  },
  cancelButton: {
    backgroundColor: "red",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.3,
    marginBottom: 30,
  },
});

export default styles;
