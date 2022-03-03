import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import HomeScreen from 'screens/Home/HomeScreen';
import FormsScreen from 'screens/Forms/FormsScreen';
import ScheduleScreen from 'screens/Schedule/ScheduleScreen';
import { Colors } from 'assets/Colors';
import UploadScreen from 'screens/Upload/UploadScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MiscStack from './MiscStack';
import TestScreen from 'screens/TestScreen';
import {Header} from 'components/Header/Header'

const Stack = createStackNavigator();

const HeaderStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Header}
            />
        </Stack.Navigator>
      );
    }

export default HeaderStack;
