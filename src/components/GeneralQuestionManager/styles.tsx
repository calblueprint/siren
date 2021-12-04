import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const ButtonHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  margin-left: -10px;
  z-index: 100;
  padding-horizontal: 12%;
`;

export const ButtonView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Container = styled.ScrollView`
  padding: 0px 20px;
`;
