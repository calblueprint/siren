import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';

const ScheduleScreen = () => {
  const [calendlyLinks, setCalendlyLinks] = useState<string[]>();
  useEffect(() => {
    // get calendly link of attourney or attournies (round robin all attourneys for given case type)
    setCalendlyLinks([
      'https://calendly.com/liphoebe/criminal-record',
      'https://calendly.com/liphoebe/daca',
      'https://calendly.com/liphoebe/citizenship',
    ]);
  });

  const openCalendlyOnBrowser = async (link: string) => {
    await WebBrowser.openBrowserAsync(link);
  };

  return (
    <PageContainer>
      <TextRegular>Schedule an appointment with your attorney!</TextRegular>
      {calendlyLinks?.map(link => (
        <Button
          title="Open Calendly"
          onPress={() => openCalendlyOnBrowser(link)}
          key={link}
        />
      ))}
    </PageContainer>
  );
};

export default ScheduleScreen;
