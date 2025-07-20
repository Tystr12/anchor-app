import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BreathingOrb from '../components/BreathingOrb';

interface LogEntry {
    id: string;
    date: string;
    timestamp: string;
    text: string;
}

export default function LogDayScreen() {
    const navigation = useNavigation();
    const [entry, setEntry] = useState('');
    const [logs, setLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        const loadLogs = async () => {
            try {
                const existing = await AsyncStorage.getItem('logs');
                if (existing) {
                    setLogs(JSON.parse(existing));
                }
            } catch (error) {
                console.error('Failed to load logs:', error);
            }
        };
        loadLogs();
    }, []);

    const saveEntry = async () => {
        if (!entry.trim()) {
            Alert.alert('Empty Entry', 'Please write something before saving.');
            return;
        }

        const now = new Date();
        const newEntry: LogEntry = {
            id: Date.now().toString(),
            date: now.toISOString(),
            timestamp: now.toLocaleString(),
            text: entry.trim(),
        };

        try {
            const existing = await AsyncStorage.getItem('logs');
            const logs = existing ? JSON.parse(existing) : [];
            logs.unshift(newEntry);
            await AsyncStorage.setItem('logs', JSON.stringify(logs));
            Alert.alert('Saved', 'Your entry has been saved.');
            setEntry('');
            setLogs(logs);
        } catch (error) {
            console.error('Error saving entry:', error);
            Alert.alert('Error', 'Failed to save your entry.');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <BreathingOrb size={80} />
            <Text style={styles.sectionTitle}>How are you feeling today?</Text>
            <TextInput
                style={styles.input}
                placeholder="Write about your day..."
                value={entry}
                onChangeText={setEntry}
                multiline
                numberOfLines={4}
            />

            <Button title="Save Entry" onPress={saveEntry} />

            <Text style={styles.sectionTitle}>Recent Logs</Text>
            {logs.slice(0, 5).map((log) => (
                <TouchableOpacity
                    key={log.id}
                    style={styles.logCard}
                    onLongPress={() => {
                        Alert.alert(
                            'Delete Entry',
                            'Are you sure you want to delete this entry?',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                    text: 'Delete',
                                    style: 'destructive',
                                    onPress: async () => {
                                        try {
                                            const updatedLogs = logs.filter((l) => l.id !== log.id);
                                            await AsyncStorage.setItem('logs', JSON.stringify(updatedLogs));
                                            setLogs(updatedLogs);
                                        } catch (error) {
                                            console.error('Error deleting entry:', error);
                                        }
                                    },
                                },
                            ]
                        );
                    }}
                >
                    <Text style={styles.logDate}>{log.timestamp}</Text>
                    <Text style={styles.logText}>{log.text}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f3ff',
    },
    content: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 20,
        alignItems: 'stretch',
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
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: 'top',
    },
    logCard: {
        backgroundColor: '#ffffffcc',
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    logDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    logText: {
        fontSize: 15,
        color: '#333',
    },
});