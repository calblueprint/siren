import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import HomeScreen from 'screens/Home/HomeScreen';
import UploadScreen from 'screens/Documents/Documents';
import FormsScreen from 'screens/Forms/FormsScreen';
import ScheduleScreen from 'screens/Schedule/ScheduleScreen';
import { Colors } from 'assets/Colors';

const Tab = createMaterialBottomTabNavigator();

const TabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: Colors.brandBlue }}
      activeColor={Colors.navbarPink}
      shifting={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
          tabBarIcon: ({ color }) => (
            <Feather name="upload" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarAccessibilityLabel: 'Schedule',
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

export default TabsStack;
