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
