import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";

import ProfileScreen from "./profileScreen";
import PersonalInfoScreen from "./personalInfoScreen";
import ChangePassScreen from "./changePasswordScreen";
import SavePlaceScreen from "./savePlaceScreen";
import RideTokenScreen from "./rideTokenScreen";
import SavedAccountScreen from "./saveAccountScreen";
import AccountScreen from "./accountScreen";
import SettingScreen from "./settingScreen";
import SearchPlaceScreen from "./searchPlaceScreen";
import AddPlaceScreen from "./addPlace";
import MapPlaceScreen from "./mapPlace";
import ReferralScreen from "./referralScreen";
const ProfileStack = createStackNavigator();

export default function ProfileNavigation({ navigation }) {
  return (
    <ProfileStack.Navigator  >
      <ProfileStack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ 
          title: "Profile", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="PersonalInfoScreen" 
        component={PersonalInfoScreen}
        options={{ 
          title: "Personal Info", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="ChangePassScreen" 
        component={ChangePassScreen} 
        options={{ 
          title: "Change Password", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="SavePlaceScreen" 
        component={SavePlaceScreen} 
        options={{ 
          title: "Saved Places", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="AddPlaceScreen" 
        component={AddPlaceScreen} 
        options={{ 
          title: "Add Places", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="SearchPlaceScreen" 
        component={SearchPlaceScreen} 
        options={{ 
          title: "Search Place", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="MapPlaceScreen" 
        component={MapPlaceScreen} 
        options={{ 
          title: "Map Place", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="RideTokenScreen" 
        component={RideTokenScreen} 
        options={{ 
          title: "Ride Token", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="SavedAccountScreen" 
        component={SavedAccountScreen} 
        options={{ 
          title: "Saved Accounts", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="AccountScreen" 
        component={AccountScreen} 
        options={{ 
          title: "Accounts", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="SettingScreen" 
        component={SettingScreen} 
        options={{ 
          title: "Settings", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen 
        name="ReferralScreen" 
        component={ReferralScreen} 
        options={{ 
          title: "Referrals", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#0061FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}
