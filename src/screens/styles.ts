/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const PageContainer = styled.View`
  margin: 5%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// non-centered
export const ScrollPageContainer = styled.ScrollView`
  overflow: scroll;
  flex: 1;
  height: 100%;
`;

export const InnerPageContainer = styled.View`
  margin: 5%;
`;
