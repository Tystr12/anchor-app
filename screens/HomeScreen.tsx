import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.welcome}> Welcome to Anchor ⚓️</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PanicHelp')}>
          <Text style={styles.buttonText}>I’m Feeling Anxious</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log My Day</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Resilience Tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View My Anchor Notes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e2f0e4',
  },
  container: {
    flex: 1,
    backgroundColor: '#e2f0e4',
  },
  welcome: {
  fontSize: 26,
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 20,
  color: '#003049',
},
  content: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#9ecffb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#003049',
    fontSize: 16,
    fontWeight: '600',
  },
});