import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert
} from "react-native";
import * as Permissions from 'expo-permissions'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { API_KEY } from "../../assets/googleAPI_KEY/GoogleAPI_key"
import { EvilIcons } from "@expo/vector-icons";
import {
  Container, Card, Text, Item, Input, CardItem,
  Body, Content, Form, List, ListItem, Button, Icon, Label
} from "native-base";
import { HomePageStyle as styleSheet } from "../../styles";
import { useTheme } from "react-native-themed-styles";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_RIDE_DETAIL } from "../../graphql/mutations/rides/rideDetailMutation";
import { ScrollView } from "react-native-gesture-handler";

export default function HomePage({ navigation }) {
  const [styles] = useTheme(styleSheet, "light")
  const [state, setState] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    },
    autoComplete: null,
    errorMessage: ""
  });

  const [currentInput, setCurrentInput] = useState("")

  const [details, setDetails] = useState({
    pickUp: "",
    destination: ""
  });

  // async function getLocationAsync() {
  //   const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status === 'granted') {
  //     return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  //   } else {
  //     throw new Error('Location permission not granted');
  //   }
  // }

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

  async function onChangeHandler(event, name) {
    event.persist();
    setCurrentInput(name)
    setDetails({
      ...details,
      [name]: event.nativeEvent.text
    });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${details[name]}&location=${state.region.latitude}, ${state.region.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      setState({
        ...state,
        autoComplete: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  function onDetailsChange(description) {
    setDetails({
      ...details,
      [currentInput]: description
    })
    setState({
      ...state,
      autoComplete: null
    })
  }

  const [createRideDetail] = useMutation(CREATE_RIDE_DETAIL);

  async function RideDetailHandler(event) {
    event.preventDefault();
    const res = await createRideDetail({
      variables: {
        pickUp: details.pickUp,
        destination: details.destination,
        pickUpDate: "2020-03-25T06:47:31Z",
        dropOffDate: "2020-03-26T06:47:31Z",
        serviceProviderFee: 200,
        convenienceFee: 20,
        rideStatus: false
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        console.log(error.message);
        return error.message;
      });
    });

    if (res.data.createRideDetail.ok) {
      navigation.navigate("FilterScreen");
    }
  }

  // For now force Rerendering the map to show the userLocation for Android
  const [mapWidth, setMapWidth] = useState("99%")
  function updateMapStyling(){
    setMapWidth("100%")
  }

  const requestGeoLocationPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  }

  function NotAvailableAlert() {
    Alert.alert(
      "Ride Feature",
      "This Ride feature is not yet available due to the Enhanced Community Quarantine.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]
    )
  }

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={state.region}
        showUserLocation={true}
        showsMyLocationButton={true}
        userLocationAnnotationTitle={"You are here."}
        followsUserLocation={true}
        showCompass={true}
        rotateEnabled={false}
        style={{flex: 1, width: mapWidth}}
        annotations={state.region}
        onMapReady={() => {
          requestGeoLocationPermission()
          updateMapStyling()
        }}
      />
      <View style={styles.midContainer}>
        <View style={styles.inputContainer}>
          <EvilIcons name="location" size={30} style={styles.pinLocation} />
          <TextInput 
            placeholder="Your Origin" 
            value={details.pickUp}
            style={styles.inputLocation} 
            onChange={event => onChangeHandler(event, "pickUp")} 
          />
        </View>
        <View style={styles.inputContainer1}>
          <EvilIcons
            name="location"
            color="red"
            size={30}
            style={styles.pinLocation}
          />
          <TextInput
            placeholder="Your Destination"
            value={details.destination}
            style={styles.inputLocation}
            onChange={event => onChangeHandler(event, "destination")}
          />
        </View>
        <ScrollView style={{ height: state.autoComplete ? 200 : 10 }}>
          <List>
            {
              state.autoComplete ? 
              state.autoComplete.map((o, idx) => <ListItem>
                <TouchableOpacity onPress={() => onDetailsChange(o.description)} >
                  <Text>{o.description}</Text>
                </TouchableOpacity>
              </ListItem>
              )
              :
              null
            }
          </List>
        </ScrollView>
        <View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("FilterScreen")}
            onPress={NotAvailableAlert}
            style={styles.requestButton}
          >
            <Text style={styles.requestText}>Request Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
