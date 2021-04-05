import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  topContainer: {
    maxHeight: 100,
    flex: 1
  },
  topLabel: {
    flexDirection: "row",
    padding: 30
  },
  semiContainer: {
    maxHeight: 40
  },
  thumbnailContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  thumbnail: {
    borderRadius: 10
  },
  provider: {
    marginLeft: 20
  },
  details: {
    fontSize: 12,
    marginTop: 5,
    color: "grey"
  },
  borderLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  leftImage: {
    width: 150,
    height: 200
  },
  destinationContainer: {
    marginTop: 100,
    marginBottom: 50
  },
  fareContainer: {
    flexDirection: "row"
  },
  fareText: {
    color: "grey"
  },
  fareFlex: {
    flex: 1
  },
  bottomContainer: {
    padding: 5
  },
  confirmButton: {
    borderRadius: 10
  },
  cancelButton: {
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0a9fff",
    width: width / 1.03,
    alignSelf: "center",
    backgroundColor: "#fff",
    height: 50
  },
  cancelText: {
    alignSelf: "center",
    color: "#0a9fff"
  }
});

export default styles;
