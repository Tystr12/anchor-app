import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PanicHelpScreen from './screens/PanicHelpScreen';
import LogDayScreen from './screens/LogDayScreen';
import { StatusBar } from 'expo-status-bar';

import type { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PanicHelp" component={PanicHelpScreen} />
        <Stack.Screen name="LogDay" component={LogDayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}