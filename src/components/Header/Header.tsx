import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

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
