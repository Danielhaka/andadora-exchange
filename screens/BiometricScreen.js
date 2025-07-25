import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Button from '../components/Button';

const BiometricScreen = () => {
  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Unsupported', 'Biometric authentication is not supported');
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert('No biometrics', 'No biometrics are enrolled on this device');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with biometrics',
    });

    if (result.success) {
      Alert.alert('Success', 'Biometric Authentication Passed');
    } else {
      Alert.alert('Failed', 'Biometric Authentication Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Login</Text>
      <Button title="Use Fingerprint / Face ID" onPress={handleBiometricAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
});

export default BiometricScreen;
