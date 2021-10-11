import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './screens/HomeScreen';
import { UploadScreen } from './screens/UploadScreen';
import { FormsScreen } from './screens/FormsScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: '#0F2536'}}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Forms"
        component={FormsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note-text-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-upload-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarAccessibilityLabel: 'Schedule',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-month-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabs;

