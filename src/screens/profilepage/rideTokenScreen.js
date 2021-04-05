import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Label, Icon, Card, CardItem, Body, Thumbnail } from "native-base";
import { RideTokenStyle as styles } from "../../styles";
import { Col, Row, Grid } from "react-native-easy-grid";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const PaymentTypeData = [
  {
    paymentTypeLogo: "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
    name: "Paypal"
  },
  {
    paymentTypeLogo: "https://stripe.com/img/v3/home/twitter.png",
    name: "Stripe"
  },
  {
    paymentTypeLogo: "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/jbq0lgzulyz2kgkuibrf",
    name: "Paymongo"
  },
  {
    paymentTypeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BDO_Unibank_%28logo%29.svg/1200px-BDO_Unibank_%28logo%29.svg.png",
    name: "Bank"
  },
  {
    paymentTypeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/7-eleven_logo_transparent.svg/1200px-7-eleven_logo_transparent.svg.png",
    name: "7-Eleven"
  },
]

export default function RideToken({ navigation }) {
  const [state, setState] = useState({
    denomination: "",
    paymentMethod: "",
  })

  function onPressHandler(event, name, value) {
    event.persist();
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <Container style={styles.mainContainer}>
      <ScrollView >
        <View>
          <View style={styles.firstContainer}>
            <View style={styles.tokenContainer}>
              {/* <MaterialCommunityIcons name="coin" color="blue" size={50} /> */}
              <View style={styles.rtContainer}>
                <Text style={styles.rt}>RT</Text>
              </View>
              <Text style={styles.tokenText}>125 Tokens</Text>
            </View>
          </View>
          <View style={styles.borderLine} />
          <Text style={styles.buyRide}>Buy Ride Token</Text>
          <View style={styles.priceContainer}>
            <TouchableOpacity 
              style={state.denomination === 50 ? styles.boxTokenSelected : styles.boxToken} 
              onPress={(event) => onPressHandler(event, "denomination", 50)}
            >
              <Text style={styles.priceText}>50</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={state.denomination === 100 ? styles.boxTokenSelected : styles.boxToken}  
              onPress={(event) => onPressHandler(event, "denomination", 100)}
            >
              <Text style={styles.priceText}>100</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <TouchableOpacity 
              style={state.denomination === 200 ? styles.boxTokenSelected : styles.boxToken} 
              onPress={(event) => onPressHandler(event, "denomination", 200)}
            >
              <Text style={styles.priceText}>200</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={state.denomination === 500 ? styles.boxTokenSelected : styles.boxToken} 
              onPress={(event) => onPressHandler(event, "denomination", 500)}
            >
              <Text style={styles.priceText}>500</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <TextInput keyboardType='numeric' placeholder="Input your Desired Amount" style={{ width: 335, height: 50, borderWidth: 1, padding: 5 }} />
        </View>

        <View>
          <View style={styles.borderLine} />
          <Text style={styles.paymentMethodText}>Payment Method</Text>
          <View style={styles.priceContainer}>
            {
              PaymentTypeData.map((o) => 
                <TouchableOpacity 
                  style={o.name === state.paymentMethod ? styles.paymentTypeSelected : null}
                  onPress={(event) => onPressHandler(event, "paymentMethod", o.name)}
                >
                  <Thumbnail
                    style={styles.paymentTypeLogo}
                    source={{
                      uri: o.paymentTypeLogo
                    }}
                  />
                </TouchableOpacity>
              )
            }
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.saveText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}
