import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50
  },
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  message: {
    marginTop: 20
  }
});

export default styles;
