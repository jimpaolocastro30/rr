import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, ImageBackground, TextInput, Linking, Alert } from "react-native";
import { Container, Card, Text, Item, Input, CardItem, Body,
  Content, Form, List, ListItem, Icon, Thumbnail, Button, Radio
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { HomePageStyle as styleSheet } from "../../styles";
import LoadingGIF from "../../assets/images/LoadingGIF.gif";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
import { useQuery } from "@apollo/react-hooks";
import { PERSONAL_INFO } from "../../graphql/queries/personalInfo";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "react-native-themed-styles";
import RideConfirmationPNG from "../../assets/images/RideConfirmation.png"
import { CONFIRM_BOOKING } from "../../graphql/mutations/delivery/deliveryMutations";
import { useMutation } from "@apollo/react-hooks";

export default function HomePage({ navigation, route }) {
  const { details, bookingInfo } = route.params
  const [styles] = useTheme(styleSheet, "light")
  const [rideDetail, setRideDetail] = useState();
  const [userId, setUserId] = useState('')
  const [state, setState] = useState({
    radioButtonSelected: ""
  })

  function onPressHandler(method) {
    setState({
      ...state,
      "radioButtonSelected": method
    })
  }

  async function GetUserID() {
    const id = await SecureStore.getItemAsync("UserId")
    if(id) {
      setUserId(id)
    }
  }

  const [confirmBooking] = useMutation(CONFIRM_BOOKING);

  async function confirmBook() {
    const { pickUp, destination } = details;
    const res = await confirmBooking({
      variables: {
        userId: userId,
        serviceProviderId: bookingInfo.id,
        pickup: pickUp,
        destination: destination,
        pickUpDate: "2020-05-04T09:28:30+00:00",
        dropOffDate: "2020-05-04T09:28:30+00:00",
        recipientAddress: destination.name,
        recipientMobileNumber: "123",
        pickupAddress: pickUp.name,
        pickupMobileNumber:"456"
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        return error.message;
      });
    });

    if(res.data.createRideDetail) {
      // console.log(res.data.createRideDetail.rideDetail);
      navigation.navigate("TrackingDeliveryScreen", {confirmedBooking: res.data.createRideDetail.rideDetail})
    }
  }

  useEffect(() => {
    GetUserID()
  }, [])

  const { loading, error, data } = useQuery(PERSONAL_INFO, {
    variables: { id: userId },
  });

  if (loading) {
    return null;
  }

  const userDetails = data.getUser.userdetailsSet[0];

  return (
    <Container style={styles.containerConfirmation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Thumbnail
            large
            square
            source={{
              uri: "https://media-exp1.licdn.com/dms/image/C4D0BAQH5Sk1Fr2Qqjw/company-logo_200_200/0?e=2159024400&v=beta&t=SfLTdJVoT5YNpdEAYDs1lmhpjlB5XLzGlznam7eOJRM"
            }}
            style={{
              borderWidth: 0.5,
              borderColor: "black",
              borderRadius: 20
            }}
          />
          <View style={{ marginBottom: 15, marginLeft: 10 }}>
            <Text>Snappy</Text>
            <Text>12 min</Text>
          </View>
        </View>

        <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 10 }} />
        
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Delivery Details</Text>
            <Card style={{ marginTop: 10 }}>
              <CardItem>
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", marginBottom: 10 }}>
                      <Image
                        source={RideConfirmationPNG}
                        style={{
                          width: 100,
                          height: 200,
                          
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>Pick Up</Text>
                        <Text style={{ color: "grey", fontSize: 16, width: 200 }}>{details.pickUp.name}</Text>
                      </View>

                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 50 }}>Destination</Text>
                        <Text style={{ color: "grey", fontSize: 16, width: 200 }}>{details.destination.name}</Text>
                      </View>
                    </View>
                  </View>
                </Body>
              </CardItem>
            </Card>
        </View>
        <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Fare</Text>
            <Card style={{ marginTop: 10 }}>
              <CardItem>
                <Body>
                  <View style={{ flexDirection: "column", padding: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Snappy Fare</Text>
                      <Text style={{ textAlign: "right", width: "50%", fontSize: 16, fontWeight: "bold" }}>&#8369; {bookingInfo.fee}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                      <Text style={{ width: "50%", color: "grey", fontSize: 16 }}>Convenience Fee</Text>
                      <Text style={{ textAlign: "right", width: "50%", fontSize: 16, fontWeight: "bold" }}>No Fee</Text>
                    </View>
                    <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 10 }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                      <Text style={{ width: "50%", fontWeight: "bold", fontSize: 20 }}>Total Price</Text>
                      <Text style={{ textAlign: "right", width: "50%", fontSize: 20, fontWeight: "bold" }}>&#8369; {Number(bookingInfo.fee + 0) /* 0 to be changed to conv fee*/}</Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
            </Card>
        </View>

        <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Promotional Code</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput style={{ marginTop: 10, width: "70%", height: 40, borderColor: "gray", borderWidth: 0.8, borderRadius: 5 }}/>
              <Button transparent style={{ width: "25%", marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold", color: "blue", fontSize: 16 }}>Apply</Text>
              </Button>
            </View>
        </View>

        <View style={{ flexDirection: "column", padding: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Radio selected={state.radioButtonSelected === "rideRadar"} onPress={() => onPressHandler("rideRadar")}/>
            <Text style={{ marginLeft: 20, fontWeight: "bold" }}>Continue with RideRadar</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Radio selected={state.radioButtonSelected === "serviceProvider"} onPress={() => onPressHandler("serviceProvider")}/>
            <Text style={{ marginLeft: 20, fontWeight: "bold" }}>Continue with Service Provider's App</Text>
          </View>
        </View>

        <TextInput 
          placeholder="Note to Driver"
          multiline={true}
          style={{ 
            textAlignVertical: "top",
            fontSize: 16,
            marginTop: 10, 
            marginBottom: 20,
            width: "100%", 
            minHeight: 100, 
            borderColor: "gray", 
            borderWidth: 0.8, 
            borderRadius: 5,
            padding: 10
          }}
        />

        <View>
          <TouchableOpacity
            onPress={
              state.radioButtonSelected === "rideRadar" ? 
              () => confirmBook() 
              : 
              state.radioButtonSelected === "serviceProvider" ?
              () =>
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=mr.speedy.express.delivery&hl=en"
              )
              :
              () => Alert.alert("Please Choose a Method.")
            }
            style={styles.confirmButton}
          >
            <Text style={styles.requestText}>Confirm Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelConfirmButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </Container>
  );
}