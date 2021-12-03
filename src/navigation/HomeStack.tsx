import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home/HomeScreen';
import TestScreen from 'screens/Home/TestScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="TestScreen"
        options={{ headerShown: false }}
        component={TestScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
