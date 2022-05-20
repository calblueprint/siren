import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const TextInput = styled.TextInput`
  background-color: ${Colors.white};
  padding: 7px 10px;
  font-size: 12px;
  line-height: 14px;
  color: ${Colors.brandGray};
  border-width: 1px;
  border-color: ${Colors.textBlack};
  border-radius: 8px;
  width: 100%;
`;

export const TextContainer = styled.View`
  margin: 8px 0px;
  width: 100%;
`;

export const InputContainer = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const TextDescription = styled.Text`
  font-family: public-sans-regular;
  font-size: 12px;
  color: ${Colors.brandGray};
  margin: 5px 0px;
`;

export const TextExample = styled.Text`
  padding: 0px 10px;
  font-size: 12px;
  color: ${Colors.brandGray};
`;
