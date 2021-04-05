import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./homeScreen";
import RideHistoryScreen from "../ridehistorypage";
import ProfileScreen from "../profilepage";
import NotificationScreen from "../notificationpage";

import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation, route }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = "ios-home";
          } else if (route.name == "RideHistory") {
            iconName = "ios-folder-open";
          } else if (route.name == "Notification") {
            iconName = "md-notifications";
          } else if (route.name == "Profile") {
            iconName = "md-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="RideHistory" component={RideHistoryScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
