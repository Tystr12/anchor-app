import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BreathingOrb from '../components/BreathingOrb';

export default function PanicHelpScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>You’re okay. What you’re feeling is anxiety — not danger. ⚓️</Text>
      <BreathingOrb size={80}></BreathingOrb>
      <Text style={styles.sectionTitle}>Common Panic Attack Symptoms:</Text>
      <Text style={styles.symptom}>• Racing heart — a normal response to adrenaline</Text>
      <Text style={styles.symptom}>• Dizziness or lightheadedness — caused by fast breathing</Text>
      <Text style={styles.symptom}>• Chest tightness — tense muscles, not a heart attack</Text>
      <Text style={styles.symptom}>• Tingling hands or feet — blood is moving to your core</Text>
      <Text style={styles.symptom}>• Feeling detached — a common mind-body stress response</Text>

      <Text style={styles.sectionTitle}>Let’s Ground You</Text>

      <TouchableOpacity style={styles.toolButton}>
        <Text style={styles.toolText}>🌀 Breathing Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toolButton}>
        <Text style={styles.toolText}>🌿 5-4-3-2-1 Grounding Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#e0f3ff',
  },
  container: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#d0e7ff',
    borderRadius: 6,
  },
  backButtonText: {
    fontSize: 16,
    color: '#003049',
    fontWeight: '500',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    color: '#003049',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 10,
    color: '#003049',
  },
  symptom: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  toolButton: {
    backgroundColor: '#9ecffb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
    elevation: 2,
  },
  toolText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003049',
  },
});