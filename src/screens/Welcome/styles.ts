/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const ContentContainer = styled.View`
  height: 80%;
  display: flex;
  justify-content: center;
  margin-top: -10%;
`;

export const TitleContainer = styled.View`
  margin: 0 auto;
  margin-bottom: 30px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: 12%;
  bottom: 10%;
`;

export const ButtonView = styled.View`
  width: 45%;
`;

export const ImageStyles = StyleSheet.create({
  logo: {
    width: 160,
    height: 150,
    resizeMode: `contain`,
    alignSelf: `center`,
  },
});

export const ButtonHeader = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  margin-left: -10px;
  z-index: 1;
  top: 10%;
  left: 0px;
`;
