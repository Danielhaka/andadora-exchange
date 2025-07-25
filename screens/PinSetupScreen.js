import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Input from '../components/Input';
import Button from '../components/Button';

const PinSetupScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const handleSavePin = async () => {
    if (pin.length !== 4) {
      Alert.alert('Invalid PIN', 'PIN must be 4 digits.');
      return;
    }
    await SecureStore.setItemAsync('userPin', pin);
    Alert.alert('Success', 'PIN saved successfully');
    navigation.navigate('PinValidation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set a 4-digit PIN</Text>
      <Input placeholder="Enter PIN" value={pin} onChangeText={setPin} secureTextEntry keyboardType="numeric" />
      <Button title="Save PIN" onPress={handleSavePin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
});

export default PinSetupScreen;
