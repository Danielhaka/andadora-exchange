import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateAccountNumber, initiateWithdrawal } from '../api/flutterwaveApi';

const WithdrawScreen = () => {
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const handleValidate = async () => {
    if (!bankCode || !accountNumber) {
      Alert.alert('Error', 'Bank code and account number are required');
      return;
    }

    try {
      const result = await validateAccountNumber(accountNumber, bankCode);
      if (result?.status === 'success') {
        setAccountName(result.data.account_name);
        Alert.alert('Verified', `Account Name: ${result.data.account_name}`);
      } else {
        Alert.alert('Invalid', 'Could not verify account');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || !accountNumber || !bankCode) {
      Alert.alert('Missing Info', 'Please fill all fields and validate account first.');
      return;
    }

    try {
      const res = await initiateWithdrawal({
        amount,
        accountNumber,
        bankCode,
        accountName,
      });

      if (res?.status === 'success') {
        Alert.alert('Success', 'Withdrawal request sent!');
        setAmount('');
        setBankCode('');
        setAccountNumber('');
        setAccountName('');
      } else {
        Alert.alert('Failed', res.message || 'Withdrawal failed');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw Funds</Text>

      <Input placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Input placeholder="Bank Code (e.g. 058 for GTBank)" value={bankCode} onChangeText={setBankCode} />
      <Input placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" />

      <Button title="Validate Account" onPress={handleValidate} />
      {accountName !== '' && <Text style={styles.verified}>✅ {accountName}</Text>}

      <Button title="Submit Withdrawal" onPress={handleWithdraw} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  verified: { marginTop: 10, textAlign: 'center', color: 'green', fontWeight: 'bold' },
});

export default WithdrawScreen;
