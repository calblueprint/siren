import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const TextInput = styled.TextInput`
  background-color: ${Colors.white};
  padding: 10px;
  font-size: 12px;
  line-height: 14px;
  color: ${Colors.brandGray};
  border-width: 1px;
  border-color: ${Colors.textBlack};
  border-radius: 8px;
`;

export const TextContainer = styled.View`
  margin-bottom: 8px;
`;

export const InputContainer = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
