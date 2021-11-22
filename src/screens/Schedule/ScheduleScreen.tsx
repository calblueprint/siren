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
import { TextRegular, TextTitle, TextSubtitle } from 'assets/fonts/Fonts';
import { ScrollPageContainer } from 'screens/styles';
import {
  SwitchButton,
  SwitchContainer,
  ScheduleButton,
  ScheduleContainer,
  ScheduleButtonContent,
  ApptContainer,
} from 'screens/Schedule/styles';
import { Colors } from 'assets/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

  const getUpcomingBody = () => {
    if (appointments === undefined || appointments?.length === 0) {
      // if no upcoming appointments
      return (
        <TextRegular>
          You have no upcoming appointments at this time. Check{' '}
          <b>Schedule New</b> for any approved consultations.
        </TextRegular>
      );
    }
    return (
      <>
        {appointments?.map(appointment => (
          <ApptContainer key={appointment.startTime + appointment.cancelled}>
            <TextSubtitle>{appointment.caseType}</TextSubtitle>
            <br />
            <TextRegular>
              You have an appointment scheduled for{' '}
              <b>{getDateString(appointment.startTime)}</b>.
            </TextRegular>
          </ApptContainer>
        ))}
        <></> {/* Need to do this otherwise will bleed onto next screen */}
      </>
    );
  };

  const getScheduleBody = () => {
    if (calendlyLinks === undefined || calendlyLinks?.length === 0) {
      // if not approved for appointments
      return (
        <TextRegular>
          You have not been approved for appointments in any new cases. Check{' '}
          <b>Home</b> for any missing items.
        </TextRegular>
      );
    }
    return (
      <>
        <TextRegular>You can now schedule appointments for:</TextRegular>
        <ScheduleContainer>
          {calendlyLinks?.map(cl => (
            <ScheduleButton
              onPress={() => openCalendlyInBrowser(cl.link)}
              key={cl.link}
            >
              <ScheduleButtonContent>
                <TextSubtitle>{cl.type} </TextSubtitle>
                <MaterialCommunityIcons
                  name="open-in-new"
                  color={Colors.lightGray}
                  size={26}
                />
              </ScheduleButtonContent>
            </ScheduleButton>
          ))}
        </ScheduleContainer>
      </>
    );
  };

  // check if calendlyLinks is empty

  return (
    <ScrollPageContainer>
      <TextTitle>Schedule an appointment with your attorney.</TextTitle>
      <TextRegular>{getSwitchDescription()}</TextRegular>
      <SwitchContainer>
        <Switch title="Upcoming" pageNum={0} />
        <Switch title="Schedule New" pageNum={1} />
      </SwitchContainer>
      {switchPage === 0 ? getUpcomingBody() : getScheduleBody()}
    </ScrollPageContainer>
  );
};

export default ScheduleScreen;
