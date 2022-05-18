/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const ContentContainer = styled.View`
  height: 80%;
  display: flex;
  justify-content: center;
  margin-top: -50%;
`;

export const TitleContainer = styled.View`
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

export const ButtonHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 20px;
`;
