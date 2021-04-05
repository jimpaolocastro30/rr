import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";

import LoginScreen from "../screens/loginpage/loginpage";
import HomePageScreen from "../screens/homepage";
import RegistrationPageScreen from "../screens/registrationpage/registrationpage";
import RideScreen from "../screens/rideScreen";
import FoodScreen from "../screens/deliveryFoodScreen";
import RequestDelivery from "../screens/deliveryModule";
import ProfileScreen from "../screens/profilepage";
import RideTokenScreen from "../screens/profilepage/rideTokenScreen";
import ReferralScreen from "../screens/profilepage/referralScreen";
import { StackNavigator } from "react-navigation";
export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPageScreen} />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="RideScreen" component={RideScreen} />
        <Stack.Screen name="FoodDeliveryScreen" component={FoodScreen} />
        <Stack.Screen name="RequestDelivery" component={RequestDelivery} />
        {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
        <Stack.Screen name="RideTokenScreen" component={RideTokenScreen} />
        <Stack.Screen name="ReferralScreen" component={ReferralScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
