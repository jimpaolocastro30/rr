import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Label, Icon, Thumbnail } from "native-base";
import { ProfilePageStyle as styles } from "../../styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  SimpleLineIcons,
  AntDesign,
  Entypo
} from "@expo/vector-icons";
import { useQuery } from "@apollo/react-hooks";
import { PERSONAL_INFO } from "../../graphql/queries/personalInfo";
import * as SecureStore from "expo-secure-store";

export default function ProfilePage({ navigation }) {
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

  const PersonalInfo = data.getUser;

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Thumbnail
            large
            source={{
              uri: "https://img2.pngio.com/united-states-avatar-organization-information-png-512x512px-user-avatar-png-820_512.jpg"
            }}
          />
          <Text style={styles.profileText}>{PersonalInfo.userdetailsSet[0].firstName} {PersonalInfo.userdetailsSet[0].lastName}</Text>
        </View>
        <View style={styles.secondContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalInfoScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <MaterialIcons
                  name="person-outline"
                  size={30}
                  style={styles.personIcon}
                />
                <Text style={styles.leftText}>Personal Info</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <Feather name="lock" size={25} />
                <Text style={styles.leftText}>Change Password</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => navigation.navigate("SavePlaceScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <SimpleLineIcons name="location-pin" size={25} />
                <Text style={styles.leftText}>Saved Places</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => navigation.navigate("RideTokenScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <MaterialCommunityIcons name="coin" size={25} />
                <Text style={styles.leftText}>Ride Token</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => navigation.navigate("SavedAccountScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <AntDesign name="key" size={25} />
                <Text style={styles.leftText}>Saved Accounts</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => navigation.navigate("ReferralScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <Entypo name="raft" size={25}/>
                <Text style={styles.leftText}>Referral Program</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingScreen")}
            style={styles.touchContainer}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <AntDesign name="setting" size={25} />
                <Text style={styles.leftText}>Setting</Text>
              </View>
              <Icon type="AntDesign" name="right" />
            </View>
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate("Login")}>
            <View style={styles.buttonContainer}>
              <Text style={styles.leftText}>Logout</Text>
              <MaterialCommunityIcons name="logout" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}
