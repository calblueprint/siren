import styled from 'styled-components/native';

export const ButtonHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  z-index: 1;
  margin-left: -10px;
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
