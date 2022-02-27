import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import TabsStack from 'navigation/TabsStack';
import AuthStack from 'navigation/AuthStack';
import MiscStack from 'navigation/MiscStack';
import FormsStack from 'navigation/FormsStack';
import firebase from 'database/clientApp';
import { ClientContext } from 'context/ContextProvider';
import { getEmptyClient } from 'utils/utils';
import { getClient } from 'database/queries';
import { Client } from 'types/types';
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

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        if (authenticatedUser) {
          await setUser(authenticatedUser);
          const client = await getCurrentClient();
          update(client); // update app context
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
              name="HeaderStack"
              component={TabsStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TabsStack"
              component={TabsStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MiscStack"
              component={MiscStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FormsStack"
              component={FormsStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadStack"
              component={UploadStack}
              options={{ headerShown: false }}
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
