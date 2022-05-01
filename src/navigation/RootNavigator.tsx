import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import TabsStack from 'navigation/TabsStack';
import AuthStack from 'navigation/AuthStack';
import MiscStack from 'navigation/MiscStack';
import FormsStack from 'navigation/FormsStack';
import firebase from 'database/clientApp';
import { ClientContext, LanguageContext } from 'context/ContextProvider';
import { getEmptyClient } from 'utils/utils';
import { getClient } from 'database/queries';
import { Client } from 'types/types';
import {
  LogoTitle,
  NotificationsBell,
  SettingsCog,
} from 'components/Header/Header';
import { logo } from 'components/Header/styles';
import UploadStack from './UploadStack';

const auth = firebase.auth();
const Stack = createStackNavigator();

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

async function getCurrentClient(): Promise<Client> {
  const uid = firebase.auth().currentUser?.uid;
  if (uid !== undefined) {
    const client = await getClient(uid);
    return client;
  }
  throw new Error('could not fetch current client from firebase');
}

export default function RootNavigator() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { update } = React.useContext(ClientContext);
  const { userLanguageChange } = React.useContext(LanguageContext);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        if (authenticatedUser) {
          await setUser(authenticatedUser);
          const client = await getCurrentClient();
          update(client); // update app context
          const db = firebase.firestore();
          const clientCollection = db.collection('clients');
          const userDoc = clientCollection.doc(user?.uid);
          const docSnap = await userDoc.get();
          const currLang = docSnap.get('language');
          if (currLang === 'Español') {
            userLanguageChange('ES');
          }
          if (currLang === 'Tiếng Việt') {
            userLanguageChange('VIET');
          }
          if (currLang === 'English') {
            userLanguageChange('EN');
          }
        } else {
          await setUser(null);
          update(getEmptyClient()); // update app context
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="TabsStack"
              component={TabsStack}
              options={({ navigation }) => ({
                headerTitle: () => {
                  return <LogoTitle />;
                },
                headerTitleAlign: 'center',
                headerStyle: logo.container,
                headerLeft: () => <SettingsCog navigation={navigation} />,
                headerRight: () => (
                  <NotificationsBell navigation={navigation} />
                ),
              })}
            />
            <Stack.Screen
              name="MiscStack"
              component={MiscStack}
              options={({ navigation }) => ({
                headerTitle: () => {
                  return <LogoTitle />;
                },
                headerTitleAlign: 'center',
                headerStyle: logo.container,
                headerLeft: () => <SettingsCog navigation={navigation} />,
                headerRight: () => (
                  <NotificationsBell navigation={navigation} />
                ),
              })}
            />
            <Stack.Screen
              name="FormsStack"
              component={FormsStack}
              options={({ navigation }) => ({
                headerTitle: () => {
                  return <LogoTitle />;
                },
                headerTitleAlign: 'center',
                headerStyle: logo.container,
                headerLeft: () => <SettingsCog navigation={navigation} />,
                headerRight: () => (
                  <NotificationsBell navigation={navigation} />
                ),
              })}
            />
            <Stack.Screen
              name="UploadStack"
              component={UploadStack}
              options={({ navigation }) => ({
                headerTitle: () => {
                  return <LogoTitle />;
                },
                headerTitleAlign: 'center',
                headerStyle: logo.container,
                headerLeft: () => <SettingsCog navigation={navigation} />,
                headerRight: () => (
                  <NotificationsBell navigation={navigation} />
                ),
              })}
            />
          </>
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
