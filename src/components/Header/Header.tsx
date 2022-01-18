import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'assets/Colors';
import { Image } from 'react-native';
import { Container } from './styles';

const logo = require('assets/siren-logo.png');

const Header = () => {
  return (
    <Container>
      <Ionicons name="settings-sharp" size={24} color={Colors.borderGrey} />
      <Image source={logo} />
      <Ionicons name="notifications" size={24} color={Colors.borderGrey} />
    </Container>
  );
};

export default Header;
