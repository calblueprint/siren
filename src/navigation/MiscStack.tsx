import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from 'screens/TestScreen';
import SettingsScreen from 'screens/settings/SettingsScreen';

const Stack = createStackNavigator();

const MiscStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MiscStack;
