import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, ScrollView, PermissionsAndroid, Picker } from "react-native";
import {
  Container,
  Text,
  Label,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Button
} from "native-base";
import { SearchPlaceStyle as styles } from "../../styles";
import { API_KEY } from "../../assets/googleAPI_KEY/GoogleAPI_key"
import { EvilIcons } from "@expo/vector-icons";
import { ADD_SAVED_PLACE } from "../../graphql/mutations/profile/savedPlace/savedPlaces";
import { useMutation } from "@apollo/react-hooks";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


export default function SearchPlaceScreen({ navigation, route }) {
  const { savedPlaceInfo, userdetailsId, render, setRender, typeOfplaces } = route.params
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

  const [savedPlace, setSavedPlace] = useState("");
  const [selectedValue, setSelectedValue] = useState("home");

  const requestGeoLocationPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  }

  const [mapWidth, setMapWidth] = useState("99%")
  function updateMapStyling() {
    setMapWidth("100%")
  }

  async function onChangeHandler(event, name) {
    event.persist();
    const { text } = event.nativeEvent
    setSavedPlace(text)
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${text}&location=${state.region.latitude}, ${state.region.longitude}&radius=2000`;
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

  async function onDetailsChange(place) {
    let queryString = ""
    place.terms.map((area, index) => queryString += index > 0 ? `,%20${area.value.split(" ")[0]}` : area.value.split(" ")[0]);
    const geocoder = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAmcwnhpNU8QvtOhktIrvCXUQSXlRK6HJk&address=${queryString}&sensor=false`
    try {
      const result = await fetch(geocoder);
      const json = await result.json();
      const { lat, lng } = json.results[0].geometry.location
      setState({ ...state, autoComplete: null, region: { ...state.region, latitude: lat, longitude: lng } })
    } catch (err) {
      console.error(err);
    }
    setSavedPlace(place.description)
  }

  const [addSavedPlace] = useMutation(ADD_SAVED_PLACE);

  async function AddSavedPlace(event) {
    event.preventDefault();
    const res = await addSavedPlace({
      variables: {
        userdetail_id: userdetailsId,
        address: savedPlace,
        longitude: state.region.longitude,
        latitude: state.region.latitude,
        placeType: selectedValue
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        return error.message;
      });
    });

    if (res.data.addSavedplace) {
      setRender(!render)
      navigation.navigate("SavePlaceScreen");
    }
  }

  useEffect(() => {
    if (savedPlaceInfo) {
      setSavedPlace(savedPlaceInfo.address)
      setState({ ...state, region: { ...state.region, latitude: savedPlaceInfo.latitude, longitude: savedPlaceInfo.longitude } })
    } else {
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
            { enabledHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        }
      )
    }

  }, [])

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          region={state.region}
          showUserLocation={true}
          showsMyLocationButton={true}
          userLocationAnnotationTitle={"You are here."}
          followsUserLocation={true}
          showCompass={true}
          rotateEnabled={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
          annotations={state.region}
          onMapReady={() => {
            requestGeoLocationPermission()
            updateMapStyling()
          }}
        />
        <View style={{
          top: 20,
          minHeight: 80,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
          zIndex: 2
        }}>
          <View style={{
            backgroundColor: "#E8E9EC", width: "90%", justifyContent: "center",
            alignItems: "center", borderRadius: 10, paddingTop: 16, paddingBottom: 16
          }}>
            <View style={{
              backgroundColor: "#fff", width: "85%", flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10
            }}>
              <EvilIcons
                name="location"
                color="red"
                size={30}
                style={styles.pinLocation}
              />
              <TextInput
                placeholder="Where are you often"
                style={{ flex: 1, margin: 8 }}
                value={savedPlace.length > 35 ? `${savedPlace.substring(0, 35)}...` : savedPlace}
                onChange={event => onChangeHandler(event, "savedPlace")}
              />
            </View>
            <View style={{ height: state.autoComplete ? 200 : 10, paddingLeft: 40, paddingRight: 40, paddingTop: 8 }}>
              <ScrollView style={{ height: state.autoComplete ? 200 : 10, backgroundColor: "white" }}>
                <List>
                  {
                    state.autoComplete ?
                      state.autoComplete.map((o, idx) => <ListItem>
                        <TouchableOpacity onPress={() => onDetailsChange(o)} >
                          <Text style={{ fontSize: 14 }}>{o.description}</Text>
                        </TouchableOpacity>
                      </ListItem>
                      )
                      :
                      null
                  }
                </List>
              </ScrollView>
            </View>
            <View style={{
              backgroundColor: "#fff", width: "85%", flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
              borderRadius: 10
            }}>
              <Picker
                selectedValue={selectedValue}
                style={{ flex: 1, margin: 8, height: 28 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                {
                  typeOfplaces.map(type => <Picker.Item label={type.label} value={type.value} />)
                }
              </Picker>
            </View>
          </View>

        </View>
        <View style={{ position: "absolute", bottom: 50, justifyContent: "center", alignItems: "center", width: "100%", zIndex: 1 }}>
          <Button onPress={event => AddSavedPlace(event)}><Text>Add Saved Place</Text></Button>
        </View>
      </View>
    </Container>
  );
}
