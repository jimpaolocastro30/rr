import React, { useState } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";

const places = [
  {
    provider: "Angkas",
    price: "₱ 105",
    eta: "5mins ",
    priceSort: 105,
    etaSort: 300,
    urlLogo: "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg",
  },
  {
    provider: "Grab",
    price: "₱ 201",
    eta: "14mins ",
    priceSort: 201,
    etaSort: 840,
    urlLogo: "https://i.pinimg.com/originals/75/a6/a5/75a6a51ba091ec212aa034e611db63a3.png",
  },
  {
    provider: "Owto",
    price: "₱ 105",
    eta: "45mins ",
    priceSort: 105,
    etaSort: 2700,
    urlLogo: "https://www.bworldonline.com/wp-content/uploads/2018/06/OWTO-Logo-062518.jpg",
  },
  {
    provider: "Angkas",
    price: "₱ 201",
    eta: "4 seats, 5mins ",
    priceSort: 201,
    etaSort: 300,
    urlLogo: "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg",
  },
  {
    provider: "Owto",
    price: "₱ 50",
    eta: "6 seats, 7mins ",
    priceSort: 50,
    etaSort: 420,
    urlLogo: "https://www.bworldonline.com/wp-content/uploads/2018/06/OWTO-Logo-062518.jpg",
  },
  {
    provider: "MiCab",
    price: "₱ 105",
    eta: "15mins ",
    priceSort: 105,
    etaSort: 900,
    urlLogo: "https://www.micab.co/wp-content/uploads/2018/07/micab-final-logo-798x1024.png",
  },
  {
    provider: "Grab",
    price: "₱ 3153",
    eta: "2h 21mins ",
    priceSort: 3153,
    etaSort: 1260,
    urlLogo: "https://i.pinimg.com/originals/75/a6/a5/75a6a51ba091ec212aa034e611db63a3.png",
  },
  {
    provider: "MoveIt",
    price: "₱ 85",
    eta: "55mins ",
    priceSort: 85,
    etaSort: 3300,
    urlLogo: "https://lh3.googleusercontent.com/x2sorDDL5hBlVlBeKS5ddWlGjILjczhgRNdsMyb9vN-CbbQRWPHnTlbjipfFn7U4-tU=s180-rw",
  }
];

export default function FilterPage() {
  const [state, setState] = useState({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.922,
      longitudeDelta: 0.0421
    },
    displayConfirmation: false,
    selected: "Category",
    selectedSort: ""
  });
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
        initialRegion={state.region}
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
              <Picker.Item label="Private Car" value="car" />
              <Picker.Item label="Motorbike" value="bike" />
              <Picker.Item label="Taxi" value="taxi" />
            </Picker>
          </View>
          <View style={styles.borderLine} />
          <List>
            <List
              showsVerticalScrollIndicator={false}
              dataArray={sortedPlaces}
              vertical={true}
              style={swipedUp ? { maxHeight: 500, marginRight: 30, marginLeft: 10 } : styles.listBody}
              renderRow={place => (
                <ListItem key={place.price} onPress={() => confirmationModalOpen()}>
                  <Container style={styles.listContainer}>
                    <View style={styles.listItems}>
                      <View style={styles.leftContainer}>
                        <Thumbnail
                          square
                          style={styles.thumbnail}
                          source={{
                            uri: place.urlLogo
                          }}
                        />
                        <View style={styles.rightContainer}>
                          <Text>{place.provider}</Text>
                          <Text style={styles.eta}>{place.eta}</Text>
                        </View>
                      </View>
                      <View>
                        <Text>{place.price}</Text>
                      </View>
                    </View>
                  </Container>
                </ListItem>
              )}
            ></List>
          </List>
        </View>
      </TouchableOpacity>
      <ModalConfirmation
        display={openConfirmation}
        close={confirmationModalOpen}
      />
    </Container>
  );
}
