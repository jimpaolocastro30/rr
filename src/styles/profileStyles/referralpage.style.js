import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  textInvite: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ED553B"
  },
  textDivider: {
    fontSize: 20
  },
  textShare: {
    fontSize: 30,
    fontWeight: "bold"
  },
  textCode: {
    fontSize: 30
  },
  inviteRow: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  inviteDivider: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  inviteCode: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  iconFb: {
    marginLeft: 16,
    marginRight: 16,
    color: "#3b5998"
  },
  iconTw: {
    marginLeft: 16,
    marginRight: 16,
    color: "#1DA1F2"
  },
  iconWh: {
    marginLeft: 16,
    marginRight: 16,
    color: "#4FCE5D"
  },
  firstRow: {
    height: "35%"
  },
  secondRow: { 
    height: "40%",
    margin: 8
  },
  col: {
    height: "100%",
    padding: 8
  },
  card: {
    borderRadius: 10,
    height: "100%"
  },
  cardInvite: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  cardHeader: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleEarnings: {
    color: "#3CAEA3",
    fontWeight: "bold"
  },
  iconEarnings: {
    color: "#3CAEA3"
  },
  titleNumber: {
    color: "#F6D55C",
    fontWeight: "bold"
  },
  iconNumber: {
    color: "#F6D55C"
  },
  line: {
    height: 2,
    backgroundColor: "#ED553B",
    width: "20%",
    marginLeft: 16,
    marginRight: 16
  },
});

export default styles;
