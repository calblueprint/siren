import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'components/ImagePicker/ImagePicker';
import CameraScreen from './CameraScreen';

const Stack = createStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImagePicker"
        component={ImagePicker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UploadStack;
