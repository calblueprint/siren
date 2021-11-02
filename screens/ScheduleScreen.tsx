import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, Text, View } from 'react-native';
import { screenStyles } from './HomeScreen';

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
    <View style={screenStyles.text}>
      <Text>Schedule an appointment with your attorney!</Text>
      <Button title="Open Calendly" onPress={openCalendlyOnBrowser} />
    </View>
  );
};

export default ScheduleScreen;
