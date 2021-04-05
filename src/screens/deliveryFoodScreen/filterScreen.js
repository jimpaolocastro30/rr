import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import {
  Container,
  Card,
  Text,
  Item,
  Input,
  CardItem,
  Body,
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
import ModalConfirmation from "./modalConfirmation/modal-confirmation";
import { FilterPageStyle as styles } from "../../styles";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as SecureStore from "expo-secure-store";
import { CHECK_PRICE, CONFIRM_BOOKING, CANCEL_BOOKING } from "../../graphql/mutations/delivery/deliveryMutations";
import { useMutation } from "@apollo/react-hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

const places = [
  {
    provider: "MrSpeedy",
    price: "₱ 105",
    eta: "5mins ",
    priceSort: 105,
    etaSort: 300,
    urlLogo: "https://media-exp1.licdn.com/dms/image/C4D0BAQH5Sk1Fr2Qqjw/company-logo_200_200/0?e=2159024400&v=beta&t=SfLTdJVoT5YNpdEAYDs1lmhpjlB5XLzGlznam7eOJRM",
  },
  {
    provider: "MrSpeedy",
    price: "₱ 105",
    eta: "5mins ",
    priceSort: 105,
    etaSort: 300,
    urlLogo: "https://media-exp1.licdn.com/dms/image/C4D0BAQH5Sk1Fr2Qqjw/company-logo_200_200/0?e=2159024400&v=beta&t=SfLTdJVoT5YNpdEAYDs1lmhpjlB5XLzGlznam7eOJRM",
  },
  {
    provider: "MrSpeedy",
    price: "₱ 105",
    eta: "5mins ",
    priceSort: 105,
    etaSort: 300,
    urlLogo: "https://media-exp1.licdn.com/dms/image/C4D0BAQH5Sk1Fr2Qqjw/company-logo_200_200/0?e=2159024400&v=beta&t=SfLTdJVoT5YNpdEAYDs1lmhpjlB5XLzGlznam7eOJRM",
  },
  
];

export default function FilterPage({navigation, route}) {
  const { details } = route.params
  const [state, setState] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    },
    displayConfirmation: false,
    selected: "Category",
    selectedSort: ""
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setState({
          ...state,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010
          }
        }),
        error => setState({
          ...state,
          errorMessage: error.message
        }),
        { enabledHighAccuracy: true, maximumAge: 2000, timeout: 20000}
      }
    )
  }, [])

  const [checkPrice] = useMutation(CHECK_PRICE);
  const id = SecureStore.getItemAsync("UserId")
  const [bookings, setBookings] = useState([]);

  async function CheckPriceHandler() {
    const { pickUp, destination } = details;
    const res = await checkPrice({
      variables: {
        userId: id,
        pickup: pickUp,
        destination: destination,
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        return error.message;
      });
    });
    if(JSON.parse(res.data.checkPrice.calculateOrder).length > 0) {
      setBookings(JSON.parse(res.data.checkPrice.calculateOrder))
    }
  }

  useEffect(() => {
    if (details) {
      CheckPriceHandler()
    }
  }, [])
  
  const [swipedUp, setSwipedUp] = useState(false)

  const [openConfirmation, setOpenConfirmation] = useState(false);

  function confirmationModalOpen() {
    setOpenConfirmation(!openConfirmation);
  }

  function onSwipeUp() {
    setSwipedUp(true)
  }

  const [sortedPlaces, setSortedPlaces] = useState(places)

  function sortHandler(sortBy) {
    const newSort = [...sortedPlaces].sort(function(a,b) { return a[sortBy] - b[sortBy] })
    setSortedPlaces(newSort)
    setState({...state, "selectedSort": sortBy})
  }

  function sortFilter(filter) {
    const newSort = sortedPlaces.filter(place => places.category === filter) 
    // setSortedPlaces(newSort) 
    setState({...state, "selected": filter})
  }
  
  return (
    <Container>
      <MapView
        region={state.region}
        showUserLocation={true}
        showCompass={true}
        rotateEnabled={false}
        style={styles.mapView}
      />
      <TouchableOpacity
        onPress={onSwipeUp}
        activeOpacity={1}
      >
        <View>
          <View style={styles.midContainer}>
            <Button style={{ borderRadius: 10, backgroundColor: state.selectedSort === "priceSort" ? "#0061FF" : "#D3D3D3" }} onPress={() => sortHandler("priceSort")}>
              <Text uppercase={false}>Cheapest</Text>
            </Button>
            <Button style={{ borderRadius: 10, marginLeft: 10, backgroundColor: state.selectedSort === "etaSort" ? "#0061FF" : "#D3D3D3" }} onPress={() => sortHandler("etaSort")}>
              <Text uppercase={false}>Fastest</Text>
            </Button>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" style={{ color: '#000', position: 'absolute', right: 0 }} />}
              placeholder="Category"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="black"
              style={styles.picker}
              selectedValue={state.selected}
              onValueChange={(itemValue) => sortFilter(itemValue)}
            >
              {/* {
                state.selected === "Category" ? 
                <Picker.Item label="Category" value=""/>
                :
                null
              } */}
              <Picker.Item label="Category" value="category"/>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Sedan" value="car" />
              <Picker.Item label="Motorbike" value="bike" />
              <Picker.Item label="L300 Van" value="taxi" />
            </Picker>
          </View>
          <View style={styles.borderLine} />
          <List>
            <List
              showsVerticalScrollIndicator={false}
              dataArray={bookings}
              vertical={true}
              style={swipedUp ? { height: 500, marginRight: 30, marginLeft: 10 } : styles.listBody}
              renderRow={place => (
                <ListItem 
                key={place.sp} 
                // onPress={() => confirmationModalOpen()}
                onPress={() => navigation.navigate("FoodConfirmationScreen", { details: details, bookingInfo: place })}
                >
                  <Container style={styles.listContainer}>
                    <View style={styles.listItems}>
                      <View style={styles.leftContainer}>
                        <Thumbnail
                          square
                          style={styles.thumbnail}
                          source={{
                            uri: "https://media-exp1.licdn.com/dms/image/C4D0BAQH5Sk1Fr2Qqjw/company-logo_200_200/0?e=2159024400&v=beta&t=SfLTdJVoT5YNpdEAYDs1lmhpjlB5XLzGlznam7eOJRM"
                          }}
                        />
                        <View style={styles.rightContainer}>
                          <Text>{place.sp}</Text>
                          <Text style={styles.eta}>5 mins</Text>
                        </View>
                      </View>
                      <View>
                        <Text>{place.fee}</Text>
                      </View>
                    </View>
                  </Container>
                </ListItem>
              )}
            ></List>
          </List>
        </View>
      </TouchableOpacity>
      {/* <ModalConfirmation
        display={openConfirmation}
        close={confirmationModalOpen}
      /> */}
    </Container>
  );
}
