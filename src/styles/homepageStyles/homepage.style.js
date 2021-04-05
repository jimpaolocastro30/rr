import { Dimensions } from "react-native";
import { styleSheetFactory } from "../../theme"

const { width } = Dimensions.get("window");

export const styles = styleSheetFactory(theme => ({
  container: {
    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: 50,
    backgroundColor: theme.backgroundColor,
  },
  containerConfirmation: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 50,
    backgroundColor: theme.backgroundColor,
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: theme.cardBackgroundColor
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff"
  },
  rtContainer: {
    borderWidth: 2,
    borderColor: "#ffff",
    borderRadius: 15,
    marginRight: 5
  },
  rt: {
    fontSize: 20,
    color: "#ffff",
    padding: 3
  },
  buyTokenText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 55,
    color: "#ffff",
    fontSize: 20,
  },
  requestRide: {
    backgroundColor: "blue",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20
  },
  requestRideView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  requestRideText: {
    color: "white",
    fontSize: 25
  },
  requestFoodRide: {
    backgroundColor: "#32CD32",
    height: 100,
    width: 180,
    borderBottomLeftRadius: 10
  },
  requestFoodRideText: {
    color: "white",
    fontSize: 22
  },
  requestParcelRide: {
    backgroundColor: "red",
    height: 100,
    width: 180,
    borderBottomRightRadius: 10
  },
  requestParcelRideText: {
    color: "white",
    fontSize: 20
  },
  motor: {
    marginTop: 10
  },
  scrollView: {
    alignSelf: "center",
    marginBottom: 10
  },
  scrollViewAnnouncement: {
    alignSelf: "center",
    marginBottom: 50
  },
  tokenText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    color: "#ffff"
  },
  ad: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 10,
    marginTop: 10
  },
  promo: {
    backgroundColor: "grey",
    height: 210,
    borderRadius: 20,
    marginTop: 10,
    width: width / 1.8,
    marginRight: 20,
  },
  promoImage: {
    height: 210,
    borderRadius: 20,
    width: width / 1.8,
    marginRight: 10,
    overflow: "hidden"
  },
  promoText: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginTop: 40
  },
  promotionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  adTextMain: {
    color: "white",
    fontSize: 27,
    alignSelf: "center",
    marginTop: 30
  },
  adText: {
    color: "white",
    fontSize: 24,
    alignSelf: "center",
    marginTop: 30
  },
  smallAds: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  smallAdTouch: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 10,
    width: width / 2.25,
    fontSize: 12
  },
  mapView: {
    flex: 1
  },
  keyboard: {
    flex: 0.7
  },
  midContainer: {
    alignItems: "center",
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10
  },
  inputContainer1: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10
  },
  inputLocation: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5
  },
  pinLocation: {
    marginLeft: 10
  },
  requestButton: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.2,
    marginTop: 20
  },
  requestText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  },
  cancelButton: {
    backgroundColor: "#F0FFFF",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.2,
    marginTop: 20
  },
  cancelText: {
    color: "blue",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  },
  form: {
    padding: 30,
    backgroundColor: "#F5F5F5"
  },
  arrow: {
    position: "absolute",
    right: 5,
    color: "blue",
    marginTop: 5,
    fontSize: 24
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1
  },
  item: {
    marginTop: 20
  },
  borderLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  borderLinePickUpComponent: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5
  },
  listBody: {
    backgroundColor: "#F5F5F5"
  },
  text: {
    color: "blue"
  },
  listItem: {
    maxHeight: 40,
    backgroundColor: "#F5F5F5"
  },
  place: {
    fontSize: 18
  },
  address: {
    fontSize: 12,
    marginTop: 5,
    color: "grey"
  },
  bottom: {
    marginBottom: 10
  },
  confirmButton: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.2,
  },
  cancelConfirmButton: {
    backgroundColor: "#F0FFFF",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.2,
    marginTop: 10,
    marginBottom: 30
  },
}));

export default styles;
