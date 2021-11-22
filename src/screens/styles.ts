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
  margin: 5%;
  flex: 1;
  overflow: scroll;
`;
