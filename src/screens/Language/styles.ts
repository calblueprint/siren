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

export const RadioContainer = styled.View`
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer2 = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
