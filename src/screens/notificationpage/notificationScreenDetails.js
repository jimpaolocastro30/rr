import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Text, List, Thumbnail } from "native-base";
import { NotificationDetailsPageStyle as styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NotificationPage({ navigation, route }) {
  const notificationDetail = route.params.notification
  return (
    <Container style={styles.container}>
      <View>
        <Text style={styles.title}>{notificationDetail.title}</Text>
        <Text style={styles.message}>{notificationDetail.longMessage}</Text>
      </View>
    </Container>
  );
}
