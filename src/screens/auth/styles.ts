/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const ContentContainer = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -10%;
`;

export const TitleContainer = styled.View`
  margin-bottom: 30px;
  text-align: center;
`;

export const ButtonView = styled.View`
  width: 70%;
  position: absolute;
  bottom: 10%;
`;

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
