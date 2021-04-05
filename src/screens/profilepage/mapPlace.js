import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text
} from "react-native";
import { Container, Content } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import MapView from "react-native-maps";
import { MapPlaceStyle as styles } from "../../styles";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

export default function mapPlace({ navigation }) {
  const [state, setState] = useState({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.922,
      longitudeDelta: 0.0421
    }
  });

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied.");
    }

    let location = await Location.getCurrentPositionAsync({
      enabledHighAccuracy: true
    });
    let region = {
      latitude: location.coords.latitude,
      longitute: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    };
    setState({
      region: region
    });
  };
  return (
    <Container>
      <MapView
        initialRegion={state.region}
        showUserLocation={true}
        showCompass={true}
        rotateEnabled={false}
        style={styles.mapView}
      />
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.touchContainer}
          >
            <View style={styles.arrowContainer}>
              <AntDesign name="arrowleft" size={30} style={styles.arrow} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
