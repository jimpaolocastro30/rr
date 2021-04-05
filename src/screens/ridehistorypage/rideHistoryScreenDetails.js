import React, { useState, Fragment } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Text, Card, CardItem, Body, Button } from "native-base";
import { RideHistoryDetailsPageStyle as styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RideHistoryDetailsPage({ navigation, route }) {
  const rideDetail = route.params.params

  const DetailData = [
    {
      title: "Service Provider",
      text: rideDetail.provider
    },
    {
      title: "PickUp",
      text: rideDetail.pickUp
    },
    {
      title: "Destination",
      text: rideDetail.destination
    },
    {
      title: "Service Type",
      text: rideDetail.carType
    },
    {
      title: "Driver's Name",
      text: rideDetail.driverName
    },
    {
      title: "Plate Number",
      text: rideDetail.carPlateNumber
    },
    {
      title: "RideRadar ID",
      text: rideDetail.rideRadarId
    },
    {
      title: "Date & Time",
      text: rideDetail.dateTime
    },
    {
      title: "Service Provider Cost",
      text: rideDetail.providerCost
    },
    {
      title: "Convenience Fee",
      text: rideDetail.convenienceFee
    },
    {
      title: "Total Cost",
      text: rideDetail.totalCost
    },
  ]

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <CardItem header style={{ borderBottomWidth: 1 }}>
            <Text style={styles.title}>{rideDetail.ride}</Text>
          </CardItem>
          <CardItem>
            <Body>
              {
                DetailData.map((detail) => <Fragment>
                  <Text style={styles.title}>{detail.title}</Text>
                  <Text>{detail.text}</Text>
                  </Fragment>
                )
              }
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
    </Container>
  );
}
