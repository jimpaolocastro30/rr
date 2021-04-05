import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import {
  Container,
  Text,
  Label,
  Icon,
  List,
  ListItem,
  Thumbnail
} from "native-base";
import { AddPlaceStyle as styles } from "../../styles";
import { Feather } from "@expo/vector-icons";

export default function AddPlaceScreen({ navigation }) {
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.body}>
            <View style={styles.firstContainer}>
              <View style={styles.inputContainer}>
                <Label>Name</Label>
                <TextInput style={styles.textInput} />
                <View style={styles.address}>
                  <Label>Address</Label>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SearchPlaceScreen")}
                    style={styles.placeContainer}
                  >
                    <View style={styles.place}>
                      <Text style={styles.placeText}>3215 Steve Hunt Road</Text>
                      <Icon type="AntDesign" name="right" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SavePlaceScreen")}
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
