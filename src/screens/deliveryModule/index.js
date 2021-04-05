import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RequestDelivery from "./requestDelivery";
import DeliveryAggregator from "./deliveryAggregator";

const RideStack = createStackNavigator();

export default function DeliveryNavigation({ navigation }) {
  return (
    <RideStack.Navigator headerMode="none">
      <RideStack.Screen name="RequestDelivery" component={RequestDelivery} />
      <RideStack.Screen name="DeliveryAggregator" component={DeliveryAggregator} />
    </RideStack.Navigator>
  );
}
