import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15
  }
});

export default styles;
