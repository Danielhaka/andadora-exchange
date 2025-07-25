import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Input from '../components/Input';
import Button from '../components/Button';

const GiftCardScreen = () => {
  const [cardType, setCardType] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [amount, setAmount] = useState('');

  const pickImage = async (side) => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true });
    if (!result.canceled) {
      const image = result.assets[0].uri;
      if (side === 'front') setFrontImage(image);
      else setBackImage(image);
    }
  };

  const handleSubmit = () => {
    if (!cardType || !frontImage || !backImage || !amount) {
      Alert.alert('Error', 'Please fill all fields and upload both images');
      return;
    }

    // TODO: Upload to Firestore or backend
    Alert.alert('Submitted', 'Your card has been submitted for review');
    setCardType('');
    setFrontImage(null);
    setBackImage(null);
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Gift Card</Text>
      <Input placeholder="Card Type (e.g. Amazon, iTunes)" value={cardType} onChangeText={setCardType} />
      <Input placeholder="Amount (e.g. 100 USD)" value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <Text style={styles.label}>Front Image</Text>
      {frontImage && <Image source={{ uri: frontImage }} style={styles.image} />}
      <Button title="Upload Front Image" onPress={() => pickImage('front')} />

      <Text style={styles.label}>Back Image</Text>
      {backImage && <Image source={{ uri: backImage }} style={styles.image} />}
      <Button title="Upload Back Image" onPress={() => pickImage('back')} />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  label: { marginTop: 15, fontWeight: 'bold' },
  image: { width: '100%', height: 160, marginVertical: 10, borderRadius: 10 },
});

export default GiftCardScreen;
