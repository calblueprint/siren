import React from 'react';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Colors } from 'assets/Colors';
import { TextBold, TextRegular } from 'assets/fonts/Fonts';
import { convertCamelToTitleCase } from 'utils/utils';
import { TitleContainer, MainContainer } from './styles';

interface TrackerProps {
  type: string;
  status: string;
}

const statusDict: { [key: string]: number } = {
  // expecting CaseStatus value types
  submitForm: 0,
  submitDoc: 1,
  inReview: 2,
  schedApt: 3,
  attenApt: 4,
};

const ProgressTracker = (props: TrackerProps) => {
  const { status } = props;
  const { type } = props;

  return (
    <MainContainer>
      <TitleContainer>
        <TextBold>{convertCamelToTitleCase(type)}</TextBold>
      </TitleContainer>
      <ProgressSteps
        activeStep={statusDict[status]}
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
        <ProgressStep label="Intake" removeBtnRow scrollable={false}>
          <View style={{ alignItems: 'center' }}>
            <TextRegular>Please submit an intake form.</TextRegular>
          </View>
        </ProgressStep>
        <ProgressStep label="Upload" removeBtnRow scrollable={false}>
          <View style={{ alignItems: 'center' }}>
            <TextRegular>
              Please upload your legal documents so your case can be properly
              assessed.
            </TextRegular>
          </View>
        </ProgressStep>
        <ProgressStep label="In review" removeBtnRow scrollable={false}>
          <View style={{ alignItems: 'center' }}>
            <TextRegular>
              Your case is now under review. You will be notified of its status
              soon.
            </TextRegular>
          </View>
        </ProgressStep>
        <ProgressStep label="Schedule" removeBtnRow scrollable={false}>
          <View style={{ alignItems: 'center' }}>
            <TextRegular>
              Your case has been approved and you can now schedule an
              appointment!
            </TextRegular>
          </View>
        </ProgressStep>
        <ProgressStep label="Attended" removeBtnRow scrollable={false}>
          <View style={{ alignItems: 'center' }}>
            <TextRegular>
              You have met with your attorney! Wait to hear back from them with
              any updates.
            </TextRegular>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </MainContainer>
  );
};

export default ProgressTracker;
