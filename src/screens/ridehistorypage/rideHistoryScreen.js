import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Text, List, Thumbnail } from "native-base";
import { RideHistoryPageStyle as styles } from "../../styles";

const histories = [
  { 
    ride: "Ride to SM Aura", 
    provider: "Angkas", 
    providerIcon: "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg",
    pickUp: "SM North", 
    destination: "SM Aura",
    carType: "MotorBike",
    driverName: "Angkas Driver Name",
    carPlateNumber: "TWF 5312",
    rideRadarId: "00013321342",
    dateTime: "April 30, 2020, 4:30PM",
    providerCost: "₱123",
    convenienceFee: "₱15",
    totalCost: "₱138"
  },
  { 
    ride: "Ride to SM Megamall", 
    provider: "MiCab", 
    providerIcon: "https://www.micab.co/wp-content/uploads/2018/07/micab-final-logo-798x1024.png",
    pickUp: "SM North", 
    destination: "SM Megamall",
    carType: "Sedan",
    driverName: "MiCab Driver Name",
    carPlateNumber: "ABC 1234",
    rideRadarId: "00013321342",
    dateTime: "April 25, 2020, 7:30PM",
    providerCost: "₱140",
    convenienceFee: "₱15",
    totalCost: "₱155"
  },
  { 
    ride: "Ride to Balintawak", 
    provider: "Owto", 
    providerIcon: "https://www.bworldonline.com/wp-content/uploads/2018/06/OWTO-Logo-062518.jpg",
    pickUp: "Makati", 
    destination: "Balintawak",
    carType: "6 Seater",
    driverName: "Owto Driver Name",
    carPlateNumber: "SFE 5312",
    rideRadarId: "00013321342",
    dateTime: "April 23, 2020, 5:30PM",
    providerCost: "₱200",
    convenienceFee: "₱15",
    totalCost: "₱215"
  },
  { 
    ride: "Ride to Magallanes", 
    provider: "MoveIt", 
    providerIcon: "https://lh3.googleusercontent.com/x2sorDDL5hBlVlBeKS5ddWlGjILjczhgRNdsMyb9vN-CbbQRWPHnTlbjipfFn7U4-tU=s180-rw",
    pickUp: "Balintawak", 
    destination: "Magallanes",
    carType: "6 Seater",
    driverName: "MoveIt Driver Name",
    carPlateNumber: "POW 5412",
    rideRadarId: "00013321342",
    dateTime: "April 21, 2020, 5:30PM",
    providerCost: "₱300",
    convenienceFee: "₱15",
    totalCost: "₱315"
  },
  { 
    ride: "Ride to SM Aura", 
    provider: "Angkas", 
    providerIcon: "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg",
    pickUp: "SM North", 
    destination: "SM Aura",
    carType: "MotorBike",
    driverName: "Angkas Driver Name",
    carPlateNumber: "TWF 5312",
    rideRadarId: "00013321342",
    dateTime: "April 12, 2020, 4:30PM",
    providerCost: "₱123",
    convenienceFee: "₱15",
    totalCost: "₱138"
  },
  { 
    ride: "Ride to SM Megamall", 
    provider: "MiCab", 
    providerIcon: "https://www.micab.co/wp-content/uploads/2018/07/micab-final-logo-798x1024.png",
    pickUp: "SM North", 
    destination: "SM Megamall",
    carType: "Sedan",
    driverName: "MiCab Driver Name",
    carPlateNumber: "ABC 1234",
    rideRadarId: "00013321342",
    dateTime: "April 6, 2020, 7:30PM",
    providerCost: "₱140",
    convenienceFee: "₱15",
    totalCost: "₱155"
  },
  { 
    ride: "Ride to Balintawak", 
    provider: "Owto", 
    providerIcon: "https://www.bworldonline.com/wp-content/uploads/2018/06/OWTO-Logo-062518.jpg",
    pickUp: "Makati", 
    destination: "Balintawak",
    carType: "6 Seater",
    driverName: "Owto Driver Name",
    carPlateNumber: "SFE 5312",
    rideRadarId: "00013321342",
    dateTime: "April 3, 2020, 5:30PM",
    providerCost: "₱200",
    convenienceFee: "₱15",
    totalCost: "₱215"
  },
  { 
    ride: "Ride to Magallanes", 
    provider: "MoveIt", 
    providerIcon: "https://lh3.googleusercontent.com/x2sorDDL5hBlVlBeKS5ddWlGjILjczhgRNdsMyb9vN-CbbQRWPHnTlbjipfFn7U4-tU=s180-rw",
    pickUp: "Balintawak", 
    destination: "Magallanes",
    carType: "6 Seater",
    driverName: "MoveIt Driver Name",
    carPlateNumber: "POW 5412",
    rideRadarId: "00013321342",
    dateTime: "March 31, 2020, 5:30PM",
    providerCost: "₱300",
    convenienceFee: "₱15",
    totalCost: "₱315"
  },
  { 
    ride: "Ride to SM Aura", 
    provider: "Angkas", 
    providerIcon: "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg",
    pickUp: "SM North", 
    destination: "SM Aura",
    carType: "MotorBike",
    driverName: "Angkas Driver Name",
    carPlateNumber: "TWF 5312",
    rideRadarId: "00013321342",
    dateTime: "March 30, 2020, 4:30PM",
    providerCost: "₱123",
    convenienceFee: "₱15",
    totalCost: "₱138"
  },
  { 
    ride: "Ride to SM Megamall", 
    provider: "MiCab", 
    providerIcon: "https://www.micab.co/wp-content/uploads/2018/07/micab-final-logo-798x1024.png",
    pickUp: "SM North", 
    destination: "SM Megamall",
    carType: "Sedan",
    driverName: "MiCab Driver Name",
    carPlateNumber: "ABC 1234",
    rideRadarId: "00013321342",
    dateTime: "March 25, 2020, 7:30PM",
    providerCost: "₱140",
    convenienceFee: "₱15",
    totalCost: "₱155"
  },
  { 
    ride: "Ride to Balintawak", 
    provider: "Owto", 
    providerIcon: "https://www.bworldonline.com/wp-content/uploads/2018/06/OWTO-Logo-062518.jpg",
    pickUp: "Makati", 
    destination: "Balintawak",
    carType: "6 Seater",
    driverName: "Owto Driver Name",
    carPlateNumber: "SFE 5312",
    rideRadarId: "00013321342",
    dateTime: "March 23, 2020, 5:30PM",
    providerCost: "₱200",
    convenienceFee: "₱15",
    totalCost: "₱215"
  },
  { 
    ride: "Ride to Magallanes", 
    provider: "MoveIt", 
    providerIcon: "https://lh3.googleusercontent.com/x2sorDDL5hBlVlBeKS5ddWlGjILjczhgRNdsMyb9vN-CbbQRWPHnTlbjipfFn7U4-tU=s180-rw",
    pickUp: "Balintawak", 
    destination: "Magallanes",
    carType: "6 Seater",
    driverName: "MoveIt Driver Name",
    carPlateNumber: "POW 5412",
    rideRadarId: "00013321342",
    dateTime: "March 21, 2020, 5:30PM",
    providerCost: "₱300",
    convenienceFee: "₱15",
    totalCost: "₱315"
  },
];

export default function RideHistoryPage({ navigation }) {
  return (
    <Container style={styles.container}>
      <View style={styles.body}>
        <List
          showsVerticalScrollIndicator={false}
          dataArray={histories}
          vertical={true}
          style={styles.listBody}
          renderRow={history => (
            <Container style={styles.listContainer} key={history.ride}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RideHistoryScreenDetails", {
                    params: history
                  })
                }
              >
                <View style={styles.listItems}>
                  <Thumbnail
                    square
                    style={styles.thumbnail}
                    source={{
                      uri: history.providerIcon
                    }}
                  />
                  <View style={styles.rightContainer}>
                    <Text>{history.ride}</Text>
                    <Text style={styles.date}>
                      {history.provider} - {history.dateTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.borderLine} />
              </TouchableOpacity>
            </Container>
          )}
        />
      </View>
    </Container>
  );
}
