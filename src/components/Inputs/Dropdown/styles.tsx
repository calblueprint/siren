import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PlatformContainer = styled.View`
  color: ${Colors.textBlack};
  border-width: 1px;
  border-color: ${Colors.textBlack};
  border-radius: 8px;
  justify-content: center;
  opacity: 1;
`;
