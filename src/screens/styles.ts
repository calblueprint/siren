/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const PageContainer = styled.View`
  margin: 5%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NameContainer = styled.View`
  align-self: flex-start;
  left: 15px;
  margin-bottom: 16px;
`;

// non-centered
export const ScrollPageContainer = styled.ScrollView`
  overflow: scroll;
  flex: 1;
  height: 100%;
  padding-top: 20px;
`;

export const InnerPageContainer = styled.View`
  margin: 5%;
  padding-bottom: 20px;
`;
