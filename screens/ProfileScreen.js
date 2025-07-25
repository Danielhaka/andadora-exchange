import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../api/firebase';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [wallet, setWallet] = useState(0);
  const [tier, setTier] = useState('Bronze');

  useEffect(() => {
    if (user) {
      fetchWallet(user.uid);
    }
  }, [user]);

  const fetchWallet = async (uid) => {
    const ref = doc(db, 'wallets', uid);
    const snap = await getDoc(ref);
    const data = snap.data();
    const balance = data?.balance || 0;
    const total = data?.totalTraded || 0;

    setWallet(balance);
    setTier(getLoyaltyTier(total));
  };

  const getLoyaltyTier = (total) => {
    if (total >= 100000) return 'Gold';
    if (total >= 50000) return 'Silver';
    return 'Bronze';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wallet</Text>
      <Text style={styles.label}>Balance: ₦{wallet.toLocaleString()}</Text>
      <Text style={styles.label}>Loyalty Tier: {tier}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
});

export default ProfileScreen;
