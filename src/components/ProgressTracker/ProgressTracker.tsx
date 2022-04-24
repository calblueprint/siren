import React from 'react';
import { View } from 'react-native';
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
  if (type === 'dacaRenewal') {
    return 'DACA Renewal';
  }
  if (type === 'general') {
    return 'Citizenship';
  }
  return null;
}

function setStep(status: string) {
  // TO DO: Refactor into dictionary
  if (status === 'submitForm') {
    return 0;
  }
  if (status === 'submitDoc') {
    return 1;
  }
  if (status === 'underRev') {
    return 2;
  }
  if (status === 'schedApt') {
    return 3;
  }
  if (status === 'aptSched') {
    return 4;
  }
  return null;
}

const ProgressTracker = (props: TrackerProps) => {
  const { status } = props;
  const { type } = props;
  const spaces = ' '.repeat(500); // needed to break up step labels into 2 lines

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
            label={`Intake ${spaces} submitted`}
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
            label={`Upload ${spaces} docs`}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>
                Please upload your legal documents so your case can be properly assessed.
              </TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={`Under ${spaces} review`}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>Your case is now under review. You will be notified of its status soon.</TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={`Schedule ${spaces} appt`}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>Your case has been approved and you can now schedule an appointment!</TextRegular>
            </View>
          </ProgressStep>
          <ProgressStep
            label={`Appt ${spaces} attended`}
            removeBtnRow
            scrollable={false}
          >
            <View style={{ alignItems: 'center' }}>
              <TextRegular>You have met with your attorney! Wait to hear back from them with any updates.</TextRegular>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </TrackerContainer>
    </MainContainer>
  );
};

export default ProgressTracker;
