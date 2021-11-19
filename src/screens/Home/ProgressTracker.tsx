import React from 'react';
import { TextBold } from 'assets/fonts/Fonts';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Colors } from 'assets/Colors';
import { View } from 'react-native';

interface TrackerProps {
  type: string;
  status: string;
  //   text?: string;
}

function setType(type: string) {
  if (type === 'daca') {
    return 'DACA Renewal';
  }
  if (type === 'general') {
    return 'Citizenship';
  }
  return null;
}

function setStep(status: string) {
  // change to what will be inputted in firestore
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
    <View style={{ height: 150 }}>
      <TextBold>{setType(type)}</TextBold>
      <ProgressSteps
        activeStep={setStep(status)}
        activeStepIconBorderColor={Colors.lightBlue}
        completedProgressBarColor={Colors.brandBlue}
        completedStepIconColor={Colors.lightBlue}
      >
        <ProgressStep label="Intake submitted" removeBtnRow />
        <ProgressStep label="Upload documents" removeBtnRow />
        <ProgressStep label="Under review" removeBtnRow />
        <ProgressStep label="Consultation approved" removeBtnRow />
        <ProgressStep label="Appt scheduled" removeBtnRow />
      </ProgressSteps>
    </View>
  );
};

export default ProgressTracker;
