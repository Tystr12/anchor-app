import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Breathing orb animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={[styles.orbOutline, { transform: [{ scale: pulseAnim }] }]}>
          <Animated.View style={[styles.orb, { transform: [{ scale: pulseAnim }] }]} />
        </Animated.View>
        <Text style={styles.welcome}>Welcome to Anchor ⚓️</Text>
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
    flexGrow: 1,
    paddingTop: 140,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 40,
    paddingTop: 20,
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
  orb: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#b3e5fc',
  },
  orbOutline: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: '#c6f6c4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
});