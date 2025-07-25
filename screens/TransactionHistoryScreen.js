import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import { AuthContext } from '../context/AuthContext';

const TransactionHistoryScreen = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(list);
    };

    fetchTransactions();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Type: <Text style={styles.value}>{item.type}</Text></Text>
      <Text style={styles.label}>Amount: <Text style={styles.value}>₦{item.amount}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{item.status}</Text></Text>
      <Text style={styles.label}>Date: <Text style={styles.value}>{new Date(item.createdAt).toLocaleString()}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No transactions found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  card: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 10, marginBottom: 10 },
  label: { fontWeight: 'bold' },
  value: { fontWeight: 'normal' },
});

export default TransactionHistoryScreen;
