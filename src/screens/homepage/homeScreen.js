import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, ImageBackground, Alert } from "react-native";
import { Container, Card, Text, Item, Input, CardItem, Body,
  Content, Form, List, ListItem, Icon, Thumbnail
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
import BackgroundImage from "../../assets/images/backgroundPNG.png"
import RideIcon from "../../assets/images/ride.png"
import FoodIcon from "../../assets/images/food.png"
import DeliveryIcon from "../../assets/images/delivery.png"
import PromoImage from "../../assets/images/Promo.jpeg"
import AnnounceImage from "../../assets/images/Announcement.jpeg"

const PromoImagesData = [
  {
    promoImage: PromoImage
  },
]

const AnnouncementImagesData = [
  {
    promoImage: AnnounceImage
  },
]

const services = [
  {
    name: "Rides",
    icon: RideIcon,
    available: "Coming Soon"
  },
  {
    name: "Food",
    icon: FoodIcon,
    available: "Coming Soon"
  },
  {
    name: "Delivery",
    icon: DeliveryIcon,
    available: ""
  }
]

export default function HomePage({ navigation }) {
  const [styles] = useTheme(styleSheet, "light")
  const [userId, setUserId] = useState('')

  async function GetUserID() {
    const id = await SecureStore.getItemAsync("UserId")
    if(id) {
      setUserId(id)
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
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={BackgroundImage} style={{ position: "absolute", width: 500, height: 300 }}/>
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 30 }}>
          <View style={{ paddingLeft: 15, paddingTop: 15 }}>
            <Text style={styles.name}>Hi {userDetails.firstName}!</Text>
            <View style={styles.tokenText}>
              {/* <MaterialCommunityIcons name="coin" size={30} color="blue" /> */}
              <View style={styles.rtContainer}>
                <Text style={styles.rt}>RT</Text>
              </View>
              <Text style={{ color: "#ffff", fontSize: 20, fontWeight: "bold" }}>125 Tokens</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("RideTokenScreen")}
          >
            <Text style={styles.buyTokenText}>Buy Token</Text>
          </TouchableOpacity>
          <Card style={styles.cardContainer}>
            <Grid>
              {
                services.map((o) => 
                <Col style={{ alignItems: "center", padding: 15 }} key={o.name}>
                  <Row>
                    <TouchableOpacity onPress={o.name === "Delivery" ? () => navigation.navigate("RequestDelivery") : () => Alert.alert("This feature is currently unavailable.")}>
                      <Card style={{ borderRadius: 20, padding: 10 }}>
                        <Thumbnail
                          square
                          source={o.icon}
                        />
                      </Card>
                    </TouchableOpacity>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{o.name}</Text>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: 14, color: "red" }}>{o.available}</Text>
                  </Row>
                </Col>
                )
              }
            </Grid>
          </Card>

          <View style={{ alignItems:"center" }}>
            <Text style={styles.promotionText}>Promotions</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.scrollView}
          >
            {
              PromoImagesData.map((o) => 
                <TouchableOpacity style={styles.promo} key={o.promoImage} onPress={() => navigation.navigate("ReferralScreen")}>
                  <Image
                    source={o.promoImage}
                    style={styles.promoImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )
            }
          </ScrollView>

          <View style={{ alignItems:"center" }}>
            <Text style={styles.promotionText}>Announcements</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.scrollViewAnnouncement}
          >
            {
              AnnouncementImagesData.map((o) => 
                <TouchableOpacity style={styles.promo} key={o.promoImage}>
                  <Image
                    source={o.promoImage}
                    style={styles.promoImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )
            }
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  );
}