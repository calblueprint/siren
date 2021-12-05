import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'components/ImagePicker/ImagePicker';
import CameraScreen from 'screens/Upload/CameraScreen';

const Stack = createStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Image"
        component={ImagePicker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UploadStack;
