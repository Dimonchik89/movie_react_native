import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {InfoScreen, PersonScreen, TabScreen} from './src/screens';
import {RootStackParamList} from './src/types/screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="TabScreen"
            options={{title: 'Главная'}}
            component={TabScreen}
          />
          <Stack.Screen name="InfoScreen" component={InfoScreen} />
          <Stack.Screen name="PersonScreen" component={PersonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

{
  /* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */
}
