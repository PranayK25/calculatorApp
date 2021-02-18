import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CalculatorScreen from "../screens/CalculatorScreen";

import { navigations } from "../constants";

const Stack = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={navigations.CalculatorScreen}
          component={CalculatorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
