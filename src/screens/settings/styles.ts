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
  background-color: #f2f2f2;
  height: 20px;
  z-index: 1;
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

export const ButtonContainer2 = styled.View`
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

export const ButtonView2 = styled.View`
  width: 45%;
  margin-bottom: 5px;
`;
