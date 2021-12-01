/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

// Doc Container

export const Container = styled.View`
  border-radius: 8px;
  width: 349px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: ${Colors.lightGray};
  padding-left: 19px;
  padding-right: 22px;
`;

export const Header = styled.View`
  height: 29px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 24px;
`;

// Doc Holder

export const DocSelect = styled.TouchableOpacity`
  border: none;
  color: ${Colors.textBlack};
  flex-direction: row;
  width: 300px;
  height: 27px;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 17px;
  height: 17px;
`;
