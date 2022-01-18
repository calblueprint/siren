import styled from 'styled-components/native';

export const PicturesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const PageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonHeader = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  margin-left: -10px;
  z-index: 1;
  padding-horizontal: 12%;
  top: 10%;
`;
