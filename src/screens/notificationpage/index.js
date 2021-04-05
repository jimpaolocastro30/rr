import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotificationScreen from "./notificationScreen";
import NotificationScreenDetails from "./notificationScreenDetails";

const NotificationStack = createStackNavigator();

export default function NotificationNavigation({ navigation }) {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ 
          title: "Notifications", 
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
      <NotificationStack.Screen
        name="NotificationScreenDetails"
        component={NotificationScreenDetails}
        options={{ 
          title: "Notification Detail", 
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
    </NotificationStack.Navigator>
  );
}
