import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ErrorMessage;
