import React from 'react';
import { View, Text } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Colors } from 'assets/Colors';
import { TextBold, TextRegular } from 'assets/fonts/Fonts';
import { TitleContainer, TrackerContainer, MainContainer } from './styles';

interface TrackerProps {
  type: string;
  status: string;
}

function setType(type: string) {
  // TO DO: add additional case types. maybe refactor into dictionary
  if (type === 'daca') {
    return 'DACA Renewal';
  }
  if (type === 'general') {
    return 'Citizenship';
  }
  return null;
}

function setStep(status: string) {
  // TO DO: Refactor into dictionary
  if (status === 'intakeSub') {
    return 0;
  }
  if (status === 'uploadDoc') {
    return 1;
  }
  if (status === 'underRev') {
    return 2;
  }
  if (status === 'consultApr') {
    return 3;
  }
  if (status === 'schedApt') {
    return 4;
  }
  return null;
}

const ProgressTracker = (props: TrackerProps) => {
  const { status } = props;
  const { type } = props;

  return (
    <MainContainer>
      <TitleContainer>
        <TextBold>{setType(type)}</TextBold>
      </TitleContainer>
      <TrackerContainer>
        <ProgressSteps
          activeStep={setStep(status)}
          borderWidth={1}
          activeStepIconBorderColor={Colors.lightBlue}
          progressBarColor={Colors.brandBlue}
          completedProgressBarColor={Colors.brandBlue}
          completedStepIconColor={Colors.lightBlue} // not sure if can make white w/ blue border
          labelColor={Colors.brandGray}
          labelFontSize={11}
          activeLabelColor={Colors.brandGray}
          completedLabelColor={Colors.brandGray}
        >
          <ProgressStep
            label={<Text> Intake {'\n'} Submitted </Text>}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>
                Your intake form has been submitted for this case type.
              </TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={<Text> Upload {'\n'} Documents </Text>}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>
                Please upload your legal documents for your case to be properly
                assessed.
              </TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={<Text> Under {'\n'} Review </Text>}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>Your case is under review.</TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={<Text> Case {'\n'} Approved </Text>}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>Your case has been approved!</TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={<Text> Appointment {'\n'} Scheduled </Text>}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>Your appointment has been scheduled!</TextRegular>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </TrackerContainer>
    </MainContainer>
  );
};

export default ProgressTracker;
