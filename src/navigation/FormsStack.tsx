import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from 'screens/Forms/FormScreen';
import FinalIntakeScreen from 'screens/Forms/FinalIntakeScreen';
import UpdateScreen from 'screens/Forms/UpdateScreen';

const Stack = createStackNavigator();

const FormsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinalIntake"
        component={FinalIntakeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update"
        component={UpdateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FormsStack;
