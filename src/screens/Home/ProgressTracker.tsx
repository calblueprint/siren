import React, { useState, useEffect } from 'react';
import { TextBold } from 'assets/fonts/Fonts';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Colors } from 'assets/Colors';

interface TrackerProps {
    type: string;
    status: string;
    text?: string;
}

function setType(type: string) {
    if (type == 'daca') {
        return 'DACA Renewal'
    }
    if (type == 'general') {
        return 'Citizenship'
    }
}

function setStep(status: string) {
    //change to what will be inputted in firestore
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
}

const ProgressTracker = (props: TrackerProps): typeof ProgressTracker => {
    const status = props.status;
    const type = props.type;
    return (
        <div>
            <TextBold>{setType(type)}</TextBold>
            <ProgressSteps
                activeStep={setStep(status)}
                activeStepIconBorderColor={Colors.lightBlue}
                a
                completedProgressBarColor={Colors.brandBlue}
                completedStepIconColor={Colors.lightBlue}
            >
                <ProgressStep label="Intake submitted" removeBtnRow={true}>
                </ProgressStep>
                <ProgressStep label="Upload documents" removeBtnRow={true}>
                </ProgressStep>
                <ProgressStep label="Under review" removeBtnRow={true}>
                </ProgressStep>
                <ProgressStep label="Consultation approved" removeBtnRow={true}>
                </ProgressStep>
                <ProgressStep label="Appt scheduled" removeBtnRow={true}>
                </ProgressStep>
            </ProgressSteps>
        </div>
    );
}

export default ProgressTracker;