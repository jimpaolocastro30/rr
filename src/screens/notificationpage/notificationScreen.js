import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Text, List, Thumbnail } from "native-base";
import { NotificationPageStyle as styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const notifications = [
  {
    title: "Covid Reminder",
    shortMessages: "3 ways to Stop Covid 19",
    longMessage: "Stay at home if you begin to feel unwell, even with mild symptoms such as headache and slight runny nose, until you recover. Why? Avoiding contact with others and visits to medical facilities will allow these facilities to operate more effectively and help protect you and others from possible COVID-19 and other viruses. ",
  },
  {
    title: "Last day to claim",
    shortMessages: "New Year Voucher",
    longMessage: "Claim your New Year Voucher now!"
  },
  {
    title: "Ride on at 90% off",
    shortMessages: "Ride Radar Promotion",
    longMessage: "Go enjoy your holidays with RideRadar's 90% OFF Promotion on Dates December 24-25, 2020"
  },
  {
    title: "Enjoy your variety",
    shortMessages: "Reminder",
    longMessage: "Enjoy a ton of variety of different things!"
  },
  {
    title: "Covid Reminder",
    shortMessages: "3 ways to Stop Covid 19",
    longMessage: "Stay at home if you begin to feel unwell, even with mild symptoms such as headache and slight runny nose, until you recover. Why? Avoiding contact with others and visits to medical facilities will allow these facilities to operate more effectively and help protect you and others from possible COVID-19 and other viruses. ",
  },
  {
    title: "Last day to claim",
    shortMessages: "New Year Voucher",
    longMessage: "Claim your New Year Voucher now!"
  },
  {
    title: "Ride on at 90% off",
    shortMessages: "Ride Radar Promotion",
    longMessage: "Go enjoy your holidays with RideRadar's 90% OFF Promotion on Dates December 24-25, 2020"
  },
  {
    title: "Enjoy your variety",
    shortMessages: "Reminder",
    longMessage: "Enjoy a ton of variety of different things!"
  },
  {
    title: "Covid Reminder",
    shortMessages: "3 ways to Stop Covid 19",
    longMessage: "Stay at home if you begin to feel unwell, even with mild symptoms such as headache and slight runny nose, until you recover. Why? Avoiding contact with others and visits to medical facilities will allow these facilities to operate more effectively and help protect you and others from possible COVID-19 and other viruses. ",
  },
  {
    title: "Last day to claim",
    shortMessages: "New Year Voucher",
    longMessage: "Claim your New Year Voucher now!"
  },
  {
    title: "Ride on at 90% off",
    shortMessages: "Ride Radar Promotion",
    longMessage: "Go enjoy your holidays with RideRadar's 90% OFF Promotion on Dates December 24-25, 2020"
  },
  {
    title: "Enjoy your variety",
    shortMessages: "Reminder",
    longMessage: "Enjoy a ton of variety of different things!"
  },
  {
    title: "Covid Reminder",
    shortMessages: "3 ways to Stop Covid 19",
    longMessage: "Stay at home if you begin to feel unwell, even with mild symptoms such as headache and slight runny nose, until you recover. Why? Avoiding contact with others and visits to medical facilities will allow these facilities to operate more effectively and help protect you and others from possible COVID-19 and other viruses. ",
  },
  {
    title: "Last day to claim",
    shortMessages: "New Year Voucher",
    longMessage: "Claim your New Year Voucher now!"
  },
  {
    title: "Ride on at 90% off",
    shortMessages: "Ride Radar Promotion",
    longMessage: "Go enjoy your holidays with RideRadar's 90% OFF Promotion on Dates December 24-25, 2020"
  },
  {
    title: "Enjoy your variety",
    shortMessages: "Reminder",
    longMessage: "Enjoy a ton of variety of different things!"
  },
];

export default function NotificationPage({ navigation }) {
  return (
    <Container style={styles.container}>
      <View style={styles.body}>
        <List>
          <List
            showsVerticalScrollIndicator={false}
            dataArray={notifications}
            vertical={true}
            style={styles.listBody}
            renderRow={(notification) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreenDetails", { notification: notification })}
              >
                <Container style={styles.listContainer}>
                  <View style={styles.blueDotContainer}>
                    <View style={styles.blueDot} />
                    <View style={styles.listItems}>
                      <View style={styles.rightContainer}>
                        <Text>{notification.title}</Text>
                        <Text style={styles.date}>{notification.shortMessages}</Text>
                      </View>
                    </View>
                  </View>
                </Container>
              </TouchableOpacity>
            )}
          />
        </List>
      </View>
    </Container>
  );
}
