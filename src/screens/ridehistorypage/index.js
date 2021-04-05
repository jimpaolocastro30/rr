import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RideHistoryScreen from "./rideHistoryScreen";
import RideHistoryScreenDetails from "./rideHistoryScreenDetails";

const RideHistoryStack = createStackNavigator();

export default function RideHistoryNavigation({ navigation }) {
  return (
    <RideHistoryStack.Navigator>
      <RideHistoryStack.Screen
        name="RideHistoryScreen"
        component={RideHistoryScreen}
        options={{ 
          title: "Ride History", 
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
      <RideHistoryStack.Screen
        name="RideHistoryScreenDetails"
        component={RideHistoryScreenDetails}
        options={{ 
          title: "Ride Details", 
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
    </RideHistoryStack.Navigator>
  );
}
