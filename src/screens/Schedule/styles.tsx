/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

export const SwitchButton = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 10px;
  width: 50%;
  margin: 0px 2px;
`;

export const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${Colors.paleBlue};
  margin: 20px;
  border-radius: 10px;
  border: 5px solid ${Colors.paleBlue};
  align-items: center;
`;

export const ScheduleButton = styled.TouchableHighlight`
  width: 80%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0px;
  border-radius: 5px;
  margin: 10px 0px;
`;

export const ScheduleContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ApptContainer = styled.View`
  border: 1px solid ${Colors.lightGray};
  display: flex;
  justify-content: center;
  padding: 15px 10px;
  border-radius: 5px;
  margin: 10px 0px;
`;

export const AppointmentSubtitle = styled.Text`
  font-family: public-sans-semibold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
`;

export const AppointmentTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ScheduleTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
