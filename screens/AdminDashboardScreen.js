import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../api/firebase';
import Button from '../components/Button';

const AdminDashboardScreen = () => {
  const [giftCards, setGiftCards] = useState([]);
  const [kycList, setKycList] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const giftSnap = await getDocs(collection(db, 'giftcards'));
    const kycSnap = await getDocs(collection(db, 'kyc'));

    const cards = giftSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const kyc = kycSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setGiftCards(cards);
    setKycList(kyc);
  };

  const handleApproveCard = async (cardId) => {
    const ref = doc(db, 'giftcards', cardId);
    await updateDoc(ref, { status: 'approved' });
    Alert.alert('Approved', 'Card marked as approved');
    fetchAllData();
  };

  const handleRejectCard = async (cardId) => {
    const ref = doc(db, 'giftcards', cardId);
    await updateDoc(ref, { status: 'rejected' });
    Alert.alert('Rejected', 'Card has been rejected');
    fetchAllData();
  };

  const handleVerifyKYC = async (kycId) => {
    const ref = doc(db, 'kyc', kycId);
    await updateDoc(ref, { verified: true });
    Alert.alert('Verified', 'User marked as KYC verified');
    fetchAllData();
  };

  const renderCard = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Card: {item.cardType || 'Unknown'}</Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.row}>
        <Button title="Approve" onPress={() => handleApproveCard(item.id)} />
        <Button title="Reject" onPress={() => handleRejectCard(item.id)} style={{ backgroundColor: '#f00' }} />
      </View>
    </View>
  );

  const renderKYC = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>User ID: {item.userId}</Text>
      <Text>Status: {item.verified ? '✅ Verified' : '❌ Not Verified'}</Text>
      {!item.verified && <Button title="Mark Verified" onPress={() => handleVerifyKYC(item.id)} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <Text style={styles.sub}>Gift Card Submissions</Text>
      <FlatList data={giftCards} renderItem={renderCard} keyExtractor={(item) => item.id} />

      <Text style={styles.sub}>KYC Submissions</Text>
      <FlatList data={kycList} renderItem={renderKYC} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  sub: { fontSize: 20, marginVertical: 10, fontWeight: '600' },
  item: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 10, marginBottom: 10 },
  title: { fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});

export default AdminDashboardScreen;
