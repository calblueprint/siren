import React, { useState, useEffect } from 'react';
import { getCurrentClient } from 'database/auth';
import {
  getAllAppointmentsForClient,
  getAllCalendlyLinks,
  getAllCases,
} from 'database/queries';
import { Appointment, CalendlyLink, CaseType } from 'types/types';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';

// only display links for the client's approved cases
// display client's upcoming appointments
// TO DO: refresh appointment page upon focus

const ScheduleScreen = () => {
  const [calendlyLinks, setCalendlyLinks] = useState<CalendlyLink[]>();
  const [appointments, setAppointments] = useState<Appointment[]>();

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

  return (
    <PageContainer>
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
        <TextRegular key={appointment.startTime + appointment.cancelled}>
          {`Case Type: ${appointment.caseType}`}
          {`Start Time: ${appointment.startTime}`}
        </TextRegular>
      ))}
    </PageContainer>
  );
};

export default ScheduleScreen;
