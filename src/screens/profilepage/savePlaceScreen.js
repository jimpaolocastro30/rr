import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Button, Icon, Thumbnail } from "native-base";
import { SavePlaceStyle as styles } from "../../styles";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/react-hooks";
import { PERSONAL_INFO } from "../../graphql/queries/personalInfo";

export default function SavePlace({ navigation }) {
  const [userId, setUserId] = useState('')
  const [render, setRender] = useState(false);
  const typeOfplaces = [{label: "Home Location", value: "home"}, {label: "Work Address", value: "work"}];
  async function GetUserID() {
    const id = await SecureStore.getItemAsync("UserId")
    if (id) {
      setUserId(id)
    }
  }

  useEffect(() => {
    GetUserID()
  }, [])

  const parseType = type => {
    const typeOfPlace = typeOfplaces.filter(place => place.value === type);
    return typeOfPlace.length > 0 ? typeOfPlace[0].label : "Dirty Data"
  }

  const { loading, error, data, refetch } = useQuery(PERSONAL_INFO, {
    variables: { id: userId },
  });

  useEffect(() => {
    if(!loading) {
      refetch()
    }
  }, [render])

  if (loading) {
    return null;
  }

  return (
    <Container>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.secondContainer}>
            <ScrollView>
              {
                data && data.getUser.userdetailsSet[0].savedplacesSet.map(place =>
                  <>
                    {/* <TouchableOpacity
                      onPress={() => navigation.navigate("SearchPlaceScreen", { savedPlaceInfo: place, userdetailsId: data.getUser.userdetailsSet[0].id })}
                      // style={styles.touchContainer}
                    > */}
                    <View style={styles.touchContainer}>
                      <View style={styles.account}>
                        <View style={styles.leftContainer}>
                          <AntDesign name="home" size={30} />
                          <View>
                            <Text style={styles.homeText}>{parseType(place.placeType)}</Text>
                            <Text style={styles.placeText}>{place.address.length > 30 ? `${place.address.substr(0, 30)}...` : place.address}</Text>
                          </View>
                        </View>
                        <View>
                          <Button
                            onPress={
                              () => navigation.navigate("SearchPlaceScreen", { typeOfplaces: typeOfplaces, savedPlaceInfo: place, userdetailsId: data.getUser.userdetailsSet[0].id, render: render, setRender: setRender })
                            }
                            transparent
                          >
                            <Icon type="AntDesign" name="right" />
                          </Button>
                        </View>
                      </View>
                    </View>
                    {/* </TouchableOpacity> */}
                    <View style={styles.borderLine} />
                  </>
                )
              }
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchPlaceScreen", {typeOfplaces: typeOfplaces, savedPlaceInfo: null, userdetailsId: data.getUser.userdetailsSet[0].id, render: render, setRender: setRender })}
          style={styles.addPlace}
        >
          <Text style={styles.addPlaceText}>Add New Place</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
