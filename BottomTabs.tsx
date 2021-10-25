import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import FormsScreen from './screens/FormsScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import GlobalThemes from './GlobalThemes';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: GlobalThemes.colors.prussianBlue }}
      activeColor={GlobalThemes.colors.babyPink}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: 'Home Screen',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Forms"
        component={FormsScreen}
        options={{
          tabBarAccessibilityLabel: 'Submit your intake form',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="note-text-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarAccessibilityLabel: 'Upload Documents',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-upload-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarAccessibilityLabel: 'Schedule an Appointment',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
