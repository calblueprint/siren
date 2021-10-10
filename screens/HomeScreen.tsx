import React from 'react';
import { Text, View } from 'react-native';
import {StyleSheet} from 'react-native';

export function HomeScreen() {
    return (
      <View style={screenStyles.text}>
        <Text>Welcome to the homepage!</Text>
      </View>
    );
  }

  export const screenStyles = StyleSheet.create({
    text:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

