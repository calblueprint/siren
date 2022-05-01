/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const MainContainer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${Colors.borderGray};
  background-color: ${Colors.white};
  padding: 20px;
  margin-bottom: 16px;
`;

export const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  top: 20px;
  margin-bottom: 12px;
`;
