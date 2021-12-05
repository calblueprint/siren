import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import TabsStack from 'navigation/TabsStack';
import AuthStack from 'navigation/AuthStack';
import MiscStack from 'navigation/MiscStack';
import FormsStack from 'navigation/FormsStack';
import firebase from 'database/clientApp';

const auth = firebase.auth();
const Stack = createStackNavigator();

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function RootNavigator() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
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
