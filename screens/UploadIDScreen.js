import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../api/firebase';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';

const UploadIDScreen = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadID = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an ID image');
      return;
    }

    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = `kyc/${user.uid}_${Date.now()}.jpg`;
    const imageRef = ref(storage, filename);

    try {
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'kyc'), {
        userId: user.uid,
        imageUrl: downloadURL,
        verified: false,
        createdAt: Date.now(),
      });

      Alert.alert('Success', 'ID uploaded successfully. Awaiting review.');
      setImage(null);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Valid ID</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Select ID Image" onPress={pickImage} />
      <Button title={uploading ? 'Uploading...' : 'Submit for Verification'} onPress={uploadID} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  image: { width: '100%', height: 200, marginVertical: 15, borderRadius: 8 },
});

export default UploadIDScreen;
