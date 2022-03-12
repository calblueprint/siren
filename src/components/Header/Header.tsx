import React from 'react';
import { Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { Colors } from 'assets/Colors';

export const LogoTitle = () => {
  return (
    <Image
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 37,
        width: 79,
      }}
      source={require('/images/siren-logo.png')}
    />
  );
};

type RootStackParamList = {
  Header: undefined;
  MiscStack: { screen: string };
};
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Header'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const SettingsCog = ({ navigation }: Props) => {
  return (
    <MaterialCommunityIcons
      name="cog"
      color={Colors.brandBlue}
      size={20}
      style={{
        position: 'absolute',
        left: '8%',
        bottom: '20%',
      }}
      onPress={() => navigation.navigate('MiscStack', { screen: 'Test' })}
    />
  );
};

export const NotificationsBell = ({ navigation }: Props) => {
  return (
    <MaterialCommunityIcons
      name="bell"
      color={Colors.brandBlue}
      size={20}
      style={{
        position: 'absolute',
        right: '8%',
        bottom: '20%',
      }}
      onPress={() => navigation.navigate('MiscStack', { screen: 'Test' })}
    />
  );
};
