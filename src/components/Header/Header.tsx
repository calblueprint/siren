import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, Image } from 'react-native';
import HeaderContainer from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from 'assets/Colors';

const LogoTitle = () => {
    return (
      <Image
        style={{ width: 79, height: 37 }}
        source={require('/images/siren-logo.png')}
      />
    );
}

const Stack = createStackNavigator();

export const Header = ({navigation}: any) => {

    return (
        <HeaderContainer>
            <MaterialCommunityIcons
                    name="cog"
                    color={Colors.brandBlue}
                    size={20}
                    onPress={() => navigation.navigate('MiscStack', { screen: 'Test' })}
                  />
            <LogoTitle />
            <MaterialCommunityIcons
                    name="bell"
                    color={Colors.brandBlue}
                    size={20}
                    onPress={() => navigation.navigate('MiscStack', { screen: 'Test' })}
                  />
        </HeaderContainer>
    )
}
