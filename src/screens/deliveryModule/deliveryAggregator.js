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
import { FilterPageStyle as styles } from "../../styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CHECK_QUOTE_SERVICE_PROVIDERS_QUERY } from "../../graphql/queries-externalAPI/serviceProviderQuoteQuery"
import { TouchableOpacity } from "react-native-gesture-handler";
import externalAPI from "../../graphql/queries-externalAPI/externalAPIClient"
import Geocoder from 'react-native-geocoding';
import { API_KEY } from "../../assets/googleAPI_KEY/GoogleAPI_key"

export default function DeliveryAggregator({navigation, route}) {
  const { details } = route.params
  const { pickUp, destination } = details;
  const [state, setState] = useState({
    displayConfirmation: false,
    selected: "Category",
    selectedSort: ""
  });

  Geocoder.init(API_KEY);

  async function getLocationAsync() {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error('Location permission not granted');
    }
  }

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

  const [swipedUp, setSwipedUp] = useState(false)
  function onSwipeUp() {
    setSwipedUp(true)
  }

  const [sortedPlaces, setSortedPlaces] = useState([])

  function sortHandler(sortBy) {
    const newSort = [...sortedPlaces].sort(function(a,b) { return a[sortBy] - b[sortBy] })
    setSortedPlaces(newSort)
    setState({...state, "selectedSort": sortBy})
  }

  function sortFilter(filter) {
    // const newSort = sortedPlaces.filter(place => places.category === filter) 
    // setSortedPlaces(newSort) 
    setState({...state, "selected": filter})
  }

  const { loading, error, data } = useQuery(CHECK_QUOTE_SERVICE_PROVIDERS_QUERY, {
    variables: { origin: pickUp.name, destination: destination.name, size: "small" },
    client: externalAPI
  });

  if (loading) {
    return null;
  }

  if (sortedPlaces.length <= 0) {
    setSortedPlaces(data.getDeliveryQuote.quoteResponse.fees)
  }

  const quoteList = data.getDeliveryQuote.quoteResponse.fees
  const quoteListDuration = data.getDeliveryQuote.quoteResponse.duration

  
  
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
            <Button style={{ borderRadius: 10, backgroundColor: state.selectedSort === "fee" ? "#0061FF" : "#D3D3D3" }} onPress={() => sortHandler("fee")}>
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
              dataArray={sortedPlaces}
              vertical={true}
              style={swipedUp ? { height: 500, marginRight: 30, marginLeft: 10 } : styles.listBody}
              renderRow={quoteList => (
                <ListItem 
                key={quoteList.provider} 
                // onPress={() => confirmationModalOpen()}
                // onPress={() => navigation.navigate("FoodConfirmationScreen", { details: details, bookingInfo: place })}
                >
                  <Container style={styles.listContainer}>
                    <View style={styles.listItems}>
                      <View style={styles.leftContainer}>
                        <Thumbnail
                          square
                          style={styles.thumbnail}
                          source={{
                            uri: quoteList.provider === "MrSpeedy" ? 
                            "https://media-exp1.licdn.com/dms/image/C4D0BAQH5Sk1Fr2Qqjw/company-logo_200_200/0?e=2159024400&v=beta&t=SfLTdJVoT5YNpdEAYDs1lmhpjlB5XLzGlznam7eOJRM"
                            :
                            quoteList.provider === "Lalamove" ?
                            "https://image.winudf.com/v2/image1/aGsuZWFzeXZhbi5hcHAuY2xpZW50X2ljb25fMTU1Mjg4ODAyM18wOTE/icon.png?w=170&fakeurl=1"
                            :
                            quoteList.provider === "Transportify" ?
                            "https://lh3.googleusercontent.com/VX05CBjey7y8wiKrqJyuj_XUwqHerRjnCwNOVLph1PB8MuIQ9ADGacL0THc1IBQelOw"
                            :
                            quoteList.provider === "Grab" ?
                            "https://lh3.googleusercontent.com/fWXojoO5RNgOz-lOsT2RCwQcaR2CNDyJK5EZ8da8uxAY0lQYko5TTLq7pyCxRcja-0YZohO0iGqrI90U_GOE"
                            :
                            "https://image.winudf.com/v2/image1/bXkuaGFwcHkubW92ZV9pY29uXzE1NTQ4ODc4NjhfMDU2/icon.png?w=170&fakeurl=1"
                          }}
                        />
                        <View style={styles.rightContainer}>
                          <Text>{quoteList.provider}</Text>
                        <Text style={styles.eta}>{quoteListDuration}</Text>
                        </View>
                      </View>
                      <View>
                        <Text>&#8369;{quoteList.fee}</Text>
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
