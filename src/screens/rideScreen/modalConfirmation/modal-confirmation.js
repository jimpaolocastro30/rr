import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking
} from "react-native";
import MapView from "react-native-maps";
import {
  Container,
  Card,
  Text,
  Item,
  Input,
  CardItem,
  Body,
  Left,
  Content,
  Form,
  List,
  ListItem,
  Button,
  Picker,
  Icon,
  Thumbnail
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./modalConfirmation.style";

export default function DisplayModalConfirmation({ display, close }) {
  return (
    <Modal
      visible={display}
      animationType="slide"
      onRequestClose={() => close()}
      onBackdropPress={() => close()}
    >
      <View style={styles.topContainer}>
        <View style={styles.topLabel}>
          <Container style={styles.semiContainer}>
            <View style={styles.thumbnailContainer}>
              <Thumbnail
                square
                style={styles.thumbnail}
                source={{
                  uri:
                    "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg"
                }}
              />
              <View style={styles.provider}>
                <Text>Angkas</Text>
                <Text style={styles.details}>1 seat, 5 mins</Text>
              </View>
            </View>
          </Container>
        </View>
        <View style={styles.borderLine} />
        <Card>
          <CardItem header bordered>
            <Text>Trip</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Image
                style={styles.leftImage}
                source={{
                  uri:
                    "https://grabpassengerhelp.zendesk.com/hc/article_attachments/360027575391/SMR_1-1.jpg"
                }}
              />
            </Left>
            <Body flexDirection="column">
              <Text>Pick up</Text>
              <Text note>SM Aura</Text>
              <View style={styles.destinationContainer}>
                <Text>Destination</Text>
                <Text note>Impact Hub Manila</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>Fare</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <CardItem>
                <View style={styles.fareContainer}>
                  <Text style={styles.fareText}>Snappy Fare</Text>
                  <View style={styles.fareFlex} />
                  <Text>&#8369; 229</Text>
                </View>
              </CardItem>

              <CardItem bordered>
                <View style={styles.fareContainer}>
                  <Text style={styles.fareText}>Fees</Text>
                  <View style={styles.fareFlex} />
                  <Text>No Fee</Text>
                </View>
              </CardItem>

              <CardItem>
                <View style={styles.fareContainer}>
                  <Text style={styles.fareText}>Total Price</Text>
                  <View style={styles.fareFlex} />
                  <Text>229</Text>
                </View>
              </CardItem>
            </Body>
          </CardItem>
        </Card>
        <View style={styles.bottomContainer}>
          <Button
            block
            info
            style={styles.confirmButton}
            // onPress={
            //     () => Linking.openURL("fb://page/2071208729806750")
            // }
            onPress={() =>
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.aztech.snappycab.passenger"
              )
            }
          >
            <Text>Confirm</Text>
          </Button>
          <TouchableOpacity onPress={close} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
