import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';

const ScheduleScreen = () => {
  const [calendlyLink, setCalendlyLink] = useState<string>('');
  useEffect(() => {
    // get calendly link of attourney or attournies (round robin all attourneys for given case type)
    setCalendlyLink(
      'https://calendly.com/team-siren/round-robin-meeting-w-siren',
    );
  });

  const openCalendlyOnBrowser = async () => {
    await WebBrowser.openBrowserAsync(calendlyLink);
  };

  return (
    <PageContainer>
      <TextRegular>Schedule an appointment with your attorney!</TextRegular>
      <Button title="Open Calendly" onPress={openCalendlyOnBrowser} />
    </PageContainer>
  );
};

export default ScheduleScreen;
