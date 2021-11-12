import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from 'screens/Home/HomeScreen';
import UploadScreen from 'screens/Documents/Documents';
import FormsScreen from 'screens/Forms/FormsScreen';
import ScheduleScreen from 'screens/Schedule/ScheduleScreen';
import { Colors } from 'assets/Colors';
import { TextRegular } from 'assets/fonts/Fonts';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: Colors.brandBlue }}
      activeColor={Colors.navbarPink}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: <TextRegular style={{ fontSize: 15 }}>Home</TextRegular>,
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
          tabBarLabel: (
            <TextRegular style={{ fontSize: 15 }}>Forms</TextRegular>
          ),
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
          tabBarLabel: (
            <TextRegular style={{ fontSize: 15 }}>Upload</TextRegular>
          ),
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
          tabBarLabel: (
            <TextRegular style={{ fontSize: 15 }}>Schedule</TextRegular>
          ),
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
