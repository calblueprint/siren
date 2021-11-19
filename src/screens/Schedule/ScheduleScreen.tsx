import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getCurrentClient } from 'database/auth';
import {
  getAllUpcomingAppointmentsForClient,
  getAllCalendlyLinks,
  getAllCases,
} from 'database/queries';
import { Appointment, CalendlyLink, CaseStatus, CaseType } from 'types/types';
import * as WebBrowser from 'expo-web-browser';
import { Button, Platform } from 'react-native';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';

// only display links for the client's approved cases
// display client's upcoming appointments
// TO DO: refresh appointment page upon focus

const ScheduleScreen = () => {
  const isFocused = useIsFocused();
  const [detectBrowserClose, setDetectBrowserClose] = useState<boolean>();
  const [calendlyLinks, setCalendlyLinks] = useState<CalendlyLink[]>();
  const [appointments, setAppointments] = useState<Appointment[]>();

  useEffect(() => {
    async function loadLinksAndAppointments() {
      const client = await getCurrentClient();
      if (client !== undefined) {
        // fetch the client's approved case types
        const cases = await getAllCases(client.id);
        const clientCaseTypes: CaseType[] = cases
          .filter(c => c.status === CaseStatus.SchedApt)
          .map(c => c.type);

        // fetch all calendly links
        const allCalendlyLinks = await getAllCalendlyLinks();

        // filter links to only include those for the client's approved cases
        const filteredLinks = allCalendlyLinks.filter(cl =>
          clientCaseTypes.includes(cl.type),
        );

        setCalendlyLinks(filteredLinks);

        // fetch all uncancelled appointments for client
        const appts = await getAllUpcomingAppointmentsForClient(client);
        setAppointments(appts);
      }
    }
    loadLinksAndAppointments();
  }, [isFocused, detectBrowserClose]);

  const openCalendlyInBrowser = async (link: string) => {
    if (Platform.OS === 'ios') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      WebBrowser.openBrowserAsync(link).then(_ => {
        console.log('ios');
        setDetectBrowserClose(!detectBrowserClose);
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      WebBrowser.openAuthSessionAsync(link, '').then(_ => {
        console.log('android');
        setDetectBrowserClose(!detectBrowserClose);
      });
    }
  };

  return (
    <PageContainer>
      {/* <TextRegular>{`isFocused=${isFocused}`}</TextRegular> */}
      <TextRegular>Schedule an appointment with your attorney.</TextRegular>
      <TextRegular>Schedule New</TextRegular>
      {calendlyLinks?.map(cl => (
        <Button
          title={cl.type}
          onPress={() => openCalendlyInBrowser(cl.link)}
          key={cl.link}
        />
      ))}
      <TextRegular>Upcoming</TextRegular>
      {appointments?.map(appointment => (
        <TextRegular key={appointment.startTime.toString()}>
          {`Case Type: ${appointment.caseType}`}
          {`Start Time: ${appointment.startTime}`}
        </TextRegular>
      ))}
    </PageContainer>
  );
};

export default ScheduleScreen;
