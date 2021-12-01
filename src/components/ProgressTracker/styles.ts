/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  top: 22px;
  margin-bottom: 12px;
`;

export const TrackerContainer = styled.View`
  height: 200px;
  margin-horizontal: 25px;
`;

export const MainContainer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 190px;
  border-width: 1px;
  border-color: ${Colors.borderGrey};
  border-radius: 8px;
  margin-bottom: 16px;
`;
