import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const Container = styled.View`
  height: 90px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${Colors.lightGray};
`;

export const C = styled.View`
  border-radius: 8px;
  width: 349px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: ${Colors.lightGray};
  padding-left: 19px;
  padding-right: 22px;
`;
