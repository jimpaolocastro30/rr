import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RideScreen from "./rideScreen";
import FilterScreen from "./filterScreen";

const RideStack = createStackNavigator();

export default function RideNavigation({ navigation }) {
  return (
    <RideStack.Navigator headerMode="none">
      <RideStack.Screen name="RideScreen" component={RideScreen} />
      <RideStack.Screen name="FilterScreen" component={FilterScreen} />
    </RideStack.Navigator>
  );
}
