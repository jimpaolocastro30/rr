import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import MapView from "react-native-maps";
import {
  Container, Card, Text, Item, Input,
  CardItem, Body, Content, Form, List, ListItem,
  Button, Picker, Icon, Thumbnail
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import TrackingGIF from "../../assets/lottieFiles/Gif.gif"
import { ScrollView } from "react-native-gesture-handler";
import { MONITOR_QUERY } from "../../graphql/queries/DeliveryModule/monitorQuery";

import { useQuery } from "@apollo/react-hooks";

export default function TrackingScreen({ navigation, route }) {
  const { confirmedBooking } = route.params
  const [state, setState] = useState({
    orderId: ""
  });
  const [eta, setEta] = useState();
  const [courierInfo, setCourierInfo] = useState({ name: "", surname: "", vehicle: "" });

  const checkCourier = () => {
    fetch(`https://robot.mrspeedy.ph/api/business/1.1/courier?order_id=${confirmedBooking.orderId}`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json', 'X-DV-Auth-Token': 'C33E8AAF63CB5C0FDEFD00144F5C3CF92E1C73CF'
      })
    })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.courier) {
          const { name, surname, latitude, longitude } = responseJson.courier;
          // setCourierInfo({ ...courierInfo, name: name, surname: surname, latitude: latitude, longitude: longitude });
          // fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${confirmedBooking.pickupLatitude},${confirmedBooking.pickupLongitude}&destinations=${latitude},${longitude}&key=AIzaSyAmcwnhpNU8QvtOhktIrvCXUQSXlRK6HJk`)
          fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${courierInfo.latitude},${courierInfo.longitude}&destinations=${confirmedBooking.dropoffLatitude},${confirmedBooking.dropoffLongitude}&key=AIzaSyAmcwnhpNU8QvtOhktIrvCXUQSXlRK6HJk`)
            .then(response => response.json())
            .then((responseGoogle) => {
              setEta(responseGoogle.rows[0].elements[0].duration.text);
            })
            .catch(error => console.log(error)) //to catch the errors if any
        }
        //WIP : destination is supposed to be from courier info 
      })
      .catch(error => console.log(error)) //to catch the errors if any
  };
  console.log(confirmedBooking, "asd")
  useEffect(() => {
    const interval = setInterval(() => {
      checkCourier();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { loading, data } = useQuery(MONITOR_QUERY, {
    variables: {
      orderId: confirmedBooking.orderId.toString(),
      spId: confirmedBooking.serviceProvider.id.toString()
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        let courier = JSON.parse(data.monitorRide)
        console.log(courier)
        if(!courier.courier) {
          setCourierInfo({ 
            ...courierInfo, 
            name: courier.courier ? courier.courier.name : "", 
            surname: courier.courier ? courier.courier.surname : "", 
            latitude: courier.courier ? courier.courier.latitude : "",  
            longitude: courier.courier ? courier.courier.longitude : ""
          })
        }
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      if (data) {
        let courier = JSON.parse(data.monitorRide)
        if(!courier.courier) {
          Alert.alert("It's taking a long time to find a driver, you should try to book again.")
        }
      }
    }, 60000);
    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white"}}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Grid>
          <Col style={{ alignItems: "center", paddingTop: 50 }}>
            <Row style={{ marginTop: 20 }}>
              <View style={{ maxWidth: 500, height: 230 }}>
                <Image
                  source={TrackingGIF}
                  style={{ maxWidth: "100%", height: "150%" }}
                  resizeMode="contain"
                />
              </View>
            </Row>
            <Row style={{ flexDirection: "column", alignItems: "center", paddingTop: 100, marginTop: 80 }}>
              <Card style={{ marginTop: 10, width: 350, marginBottom: 20 }}>
                {eta ? <CardItem style={{ backgroundColor: "blue" }}>
                  <Body>
                    <View style={{ flexDirection: "column", padding: 10 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Driver Name:</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{courierInfo.name ? courierInfo.name : "-"}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>ETA</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{eta ? eta : "-"}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Type of Vehicle - Plate #</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{courierInfo.vehicle ? courierInfo.vehicle : "-"}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Pick Up Address:</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{confirmedBooking.pickupAddress}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Delivery Address:</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{confirmedBooking.recipientAddress}</Text>
                      </View>
                      <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 10 }} />
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", fontWeight: "bold", fontSize: 20 }}>Total Price</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 20, fontWeight: "bold" }}>&#8369; {confirmedBooking.serviceProviderFee}</Text>
                      </View>
                    </View>
                  </Body>
                </CardItem>
                  :
                  <CardItem style={{textAlign: "center"}}>
                  <Body>
                    <View style={{ flexDirection: "column", padding: 10 }}>
                      <Text style={{ width: 300, fontSize: 24, fontWeight: "bold", textAlignVertical: "center", textAlign: "center"}}>Waiting for driver to pick up your parcel...</Text>
                    </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>ETA</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{eta ? eta : "-"}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Type of Vehicle</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{courierInfo.vehicle ? courierInfo.vehicle : "Waiting for Driver"}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Pick Up Address:</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{confirmedBooking.pickupAddress}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Delivery Address:</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 16, fontWeight: "bold" }}>{confirmedBooking.recipientAddress}</Text>
                      </View>
                      <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 10 }} />
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ width: "50%", fontWeight: "bold", fontSize: 20 }}>Total Price</Text>
                        <Text style={{ textAlign: "left", width: "50%", fontSize: 20, fontWeight: "bold" }}>&#8369; {confirmedBooking.serviceProviderFee}</Text>
                      </View>
                  </Body>
                  </CardItem>
                }
              </Card>
              {/* <Button onPress={() => checkCourier()} style={{ width: 200, marginTop: 20, marginBottom: 20 }}><Text>Refresh</Text></Button> */}
            </Row>
          </Col>
        </Grid>
      </View>
    </ScrollView>
  );
}
