/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  getAllUpcomingAppointmentsForClient,
  getCalendlyLink,
  getAllCases,
} from 'database/queries';
import { Appointment, CalendlyLink, CaseStatus } from 'types/types';
import * as WebBrowser from 'expo-web-browser';
import {
  TextRegular,
  TextTitle,
  TextSubtitle,
  TextRegularBold,
} from 'assets/fonts/Fonts';
import { InnerPageContainer, ScrollPageContainer } from 'screens/styles';
import {
  SwitchButton,
  SwitchContainer,
  ScheduleButton,
  ScheduleContainer,
  ApptContainer,
  AppointmentSubtitle,
  AppointmentTextContainer,
  ScheduleTextContainer,
} from 'screens/Schedule/styles';
import { Colors } from 'assets/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';
import {
  convertCamelToTitleCase,
  convertDateObjectToString,
} from 'utils/utils';
import { ClientContext, Text } from 'context/ContextProvider';

// only display links for the client's approved cases
// display client's upcoming appointments
// refresh appointment page upon focus

const ScheduleScreen = () => {
  const isFocused = useIsFocused();
  const [detectBrowserClose, setDetectBrowserClose] = useState<boolean>();
  const [calendlyLinks, setCalendlyLinks] = useState<CalendlyLink[]>();
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [switchPage, setSwitchPage] = React.useState(0);
  const { state } = React.useContext(ClientContext);

  useEffect(() => {
    async function loadLinksAndAppointments() {
      const client = state;
      if (client !== undefined) {
        // fetch the client's approved case types
        const cases = await getAllCases(client.id);
        const clientCaseTypes: string[] = cases
          .filter(c => c.status === CaseStatus.SchedApt)
          .map(c => c.type);

        // fetch all calendly links
        Promise.all(
          clientCaseTypes.map(caseType => getCalendlyLink(caseType)),
        ).then(links => setCalendlyLinks(links));

        // fetch all uncancelled appointments for client
        const appts = await getAllUpcomingAppointmentsForClient(client);
        setAppointments(appts);
        if (appts.length !== 0) {
          setSwitchPage(1);
        }
      }
    }
    loadLinksAndAppointments();
  }, [isFocused, detectBrowserClose]);

  const openCalendlyInBrowser = async (link: string) => {
    if (Platform.OS === 'ios') {
      await WebBrowser.openBrowserAsync(link);
      setDetectBrowserClose(!detectBrowserClose);
    } else {
      await WebBrowser.openAuthSessionAsync(link, '');
      setDetectBrowserClose(!detectBrowserClose);
    }
  };

  const Switch = (props: { pageNum: number; title: string }) => {
    const isActive = switchPage === props.pageNum;
    return (
      <SwitchButton
        onPress={() => setSwitchPage(props.pageNum)}
        underlayColor={Colors.lightBlue}
        style={{
          backgroundColor: isActive ? Colors.lightBlue : undefined,
        }}
      >
        <TextRegular
          style={{
            fontWeight: isActive ? 'bold' : undefined,
          }}
        >
          {props.title}
        </TextRegular>
      </SwitchButton>
    );
  };

  const getSwitchDescription = () => {
    if (switchPage === 0) {
      // schedule new
      return Text('View any upcoming appointments');
    }
    return Text('Schedule appointments with attorney');
  };

  const getUpcomingBody = () => {
    if (appointments === undefined || appointments.length === 0) {
      // if no upcoming appointments
      return (
        <View>
          <TextRegular>
            {Text('You have no upcoming ... Check')}
            <TextRegularBold> {Text('Schedule New')}</TextRegularBold>{' '}
            {Text('for any approved consultations.')}
          </TextRegular>
        </View>
      );
    }
    return (
      <>
        {appointments.map((appointment, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <ApptContainer key={key}>
            <AppointmentSubtitle>{appointment.caseType}</AppointmentSubtitle>
            <AppointmentTextContainer>
              <TextRegular>
                {Text('You have an appointment scheduled for')}{' '}
              </TextRegular>
              <TextRegularBold>
                {convertDateObjectToString(appointment.startTime)}
              </TextRegularBold>
              <TextRegular>.</TextRegular>
            </AppointmentTextContainer>
          </ApptContainer>
        ))}
      </>
    );
  };

  const getScheduleBody = () => {
    if (calendlyLinks === undefined || calendlyLinks.length === 0) {
      // if not approved for appointments
      return (
        <View>
          <TextRegular>
            {Text('You have not been approved ... Check')}{' '}
            <TextRegularBold>{Text('Home')}</TextRegularBold>{' '}
            {Text('for any missing items.')}
          </TextRegular>
        </View>
      );
    }
    return (
      <>
        <TextRegular>
          {Text('You can now schedule appointments for:')}
        </TextRegular>
        <ScheduleContainer>
          {calendlyLinks.map(cl => (
            <ScheduleButton
              onPress={() => openCalendlyInBrowser(cl.link)}
              key={cl.link}
            >
              <ScheduleTextContainer>
                <TextSubtitle>{convertCamelToTitleCase(cl.type)} </TextSubtitle>
                <MaterialCommunityIcons
                  name="open-in-new"
                  color={Colors.lightGray}
                  size={26}
                />
              </ScheduleTextContainer>
            </ScheduleButton>
          ))}
        </ScheduleContainer>
      </>
    );
  };

  return (
    <ScrollPageContainer>
      <InnerPageContainer>
        <TextTitle>
          {Text('Schedule an appointment with your attorney.')}
        </TextTitle>
        <TextRegular>{getSwitchDescription()}</TextRegular>
        <SwitchContainer>
          <Switch title={Text('Schedule New')} pageNum={0} />
          <Switch title={Text('Upcoming')} pageNum={1} />
        </SwitchContainer>
        {switchPage === 0 ? getScheduleBody() : getUpcomingBody()}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default ScheduleScreen;
