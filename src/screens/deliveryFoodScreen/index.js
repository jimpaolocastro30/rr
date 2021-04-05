import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FoodDeliveryScreen from "./deliveryFoodScreen";
import FoodFilterScreen from "./filterScreen";
import FoodConfirmationScreen from "./confirmationScreen";
import TrackingDeliveryScreen from "./trackingScreen";

const RideStack = createStackNavigator();

export default function RideNavigation({ navigation }) {
  return (
    <RideStack.Navigator headerMode="none">
      <RideStack.Screen name="FoodDeliveryScreen" component={FoodDeliveryScreen} />
      <RideStack.Screen name="FoodFilterScreen" component={FoodFilterScreen} />
      <RideStack.Screen name="FoodConfirmationScreen" component={FoodConfirmationScreen} />
      <RideStack.Screen name="TrackingDeliveryScreen" component={TrackingDeliveryScreen} />
    </RideStack.Navigator>
  );
}
