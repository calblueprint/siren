/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { getCurrentClient } from 'database/auth';
import {
  getAllAppointmentsForClient,
  getAllCalendlyLinks,
  getAllCases,
} from 'database/queries';
import { Appointment, CalendlyLink, CaseType } from 'types/types';
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
import { View } from 'react-native';

// only display links for the client's approved cases
// display client's upcoming appointments
// TO DO: refresh appointment page upon focus

const ScheduleScreen = () => {
  const [calendlyLinks, setCalendlyLinks] = useState<CalendlyLink[]>();
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [switchPage, setSwitchPage] = React.useState(0);

  useEffect(() => {
    async function loadLinksAndAppointments() {
      const client = await getCurrentClient();
      if (client !== undefined) {
        // fetch the client's approved case types
        const cases = await getAllCases(client.id);
        const clientCaseTypes: CaseType[] = cases.map(c => c.type);

        // fetch all calendly links
        const allCalendlyLinks = await getAllCalendlyLinks();

        // filter links to only include those for the client's approved cases
        const filteredLinks = allCalendlyLinks.filter(cl =>
          clientCaseTypes.includes(cl.type),
        );

        setCalendlyLinks(filteredLinks);

        // fetch all uncancelled appointments for client
        const appts = await getAllAppointmentsForClient(client);
        // TO DO: filter out past appointments
        setAppointments(appts);
      }
    }
    loadLinksAndAppointments();
  }, []);

  const openCalendlyInBrowser = async (link: string) => {
    await WebBrowser.openBrowserAsync(link);
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
      return 'View any upcoming appointments you have with your attorney here. Reschedule or cancel your appointment through the confirmation email you received from Calendly.';
    }
    return 'Schedule appointments with attorney(s) for newly approved case(s) here.';
  };

  // convert datestring (appointment.startTime) and convert to readable string
  const getDateString = (dateString: string) => {
    // TODO: how do I best do this?
    return dateString;
  };

  // convert camelCase to Title Case
  const makeTitleCase = (str: string) => {
    let result = str.replace(/([A-Z])/g, ' $1');
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  };

  const getUpcomingBody = () => {
    if (appointments === undefined || appointments.length === 0) {
      // if no upcoming appointments
      return (
        <View>
          <TextRegular>
            You have no upcoming appointments at this time. Check
            <TextRegularBold> Schedule New</TextRegularBold> for any approved
            consultations.
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
              <TextRegular>You have an appointment scheduled for </TextRegular>
              <TextRegularBold>
                {getDateString(appointment.startTime)}
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
            You have not been approved for appointments in any new cases. Check{' '}
            <TextRegularBold>Home</TextRegularBold> for any missing items.
          </TextRegular>
        </View>
      );
    }
    return (
      <>
        <TextRegular>You can now schedule appointments for:</TextRegular>
        <ScheduleContainer>
          {calendlyLinks.map(cl => (
            <ScheduleButton
              onPress={() => openCalendlyInBrowser(cl.link)}
              key={cl.link}
            >
              <ScheduleTextContainer>
                <TextSubtitle>{makeTitleCase(cl.type)} </TextSubtitle>
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
        <TextTitle>Schedule an appointment with your attorney.</TextTitle>
        <TextRegular>{getSwitchDescription()}</TextRegular>
        <SwitchContainer>
          <Switch title="Upcoming" pageNum={0} />
          <Switch title="Schedule New" pageNum={1} />
        </SwitchContainer>
        {switchPage === 0 ? getUpcomingBody() : getScheduleBody()}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default ScheduleScreen;
