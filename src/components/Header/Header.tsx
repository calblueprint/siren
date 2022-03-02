import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import HeaderContainer from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from 'assets/Colors';

export const LogoTitle = () => {
    return (
      <Image
        style={{ width: 79, height: 37 }}
        source={require('/images/siren-logo.png')}
      />
    );
}

export const Header = () => {

    return (
        <HeaderContainer>
            <MaterialCommunityIcons
                    name="cog"
                    color={Colors.brandBlue}
                    size={20}
                  />
            <LogoTitle />
            <MaterialCommunityIcons
                    name="bell"
                    color={Colors.brandBlue}
                    size={20}
                  />
        </HeaderContainer>
    )
}
