import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Input from '../components/Input';
import Button from '../components/Button';

const PinValidationScreen = () => {
  const [enteredPin, setEnteredPin] = useState('');

  const handleValidatePin = async () => {
    const savedPin = await SecureStore.getItemAsync('userPin');
    if (enteredPin === savedPin) {
      Alert.alert('Access Granted', 'PIN verified successfully');
    } else {
      Alert.alert('Access Denied', 'Incorrect PIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>
      <Input placeholder="Enter PIN" value={enteredPin} onChangeText={setEnteredPin} secureTextEntry keyboardType="numeric" />
      <Button title="Verify PIN" onPress={handleValidatePin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
});

export default PinValidationScreen;
