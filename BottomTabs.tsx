import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import HomeScreen from './screens/Home/HomeScreen';
import UploadScreen from './screens/Documents/UploadScreen';
import FormsScreen from './screens/Forms/FormsScreen';
import ScheduleScreen from './screens/Schedule/ScheduleScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: colors.prussianBlue }}
      activeColor={colors.babyPink}
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
export default BottomTabs;
