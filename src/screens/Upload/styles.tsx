import styled from 'styled-components/native';

export const PicturesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const PageContainer = styled.View`
  padding: 0px 20px;
  background-color: white;
  height: 100%;
`;

export const ButtonHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  z-index: 1;
  margin-left: -10px;
`;

export const AddPageContainer = styled.TouchableOpacity`
  border-width: 1;
  border-style: dashed;
  border-radius: 5;
  border-color: black;
  width: 100px;
  height: 132px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 15px;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const ModalButtonContainer = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ButtonDarkBlue = styled.TouchableOpacity`
  text-align: center;
  align-items: center; 
  padding: 4px 4px
  border-width: 1px;
  border-radius: 5px;
  background: #0F2536;
`;

export const ButtonDarkBlueBottom = styled.TouchableOpacity`
  text-align: center;
  align-items: center; 
  justify-content: center;
  position: relative;
  bottom: 0;
  width: 50%;
  margin: 50px auto;
  padding: 4px 4px
  border-width: 1px;
  border-radius: 5px;
  background: #0F2536;
`;
