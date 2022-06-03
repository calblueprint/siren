/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;

export const ButtonView = styled.View`
  width: 45%;
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
  top: 0%;
  left: 0px;
`;
