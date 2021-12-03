import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from 'screens/TestScreen';

const Stack = createStackNavigator();

const MiscStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MiscStack;
