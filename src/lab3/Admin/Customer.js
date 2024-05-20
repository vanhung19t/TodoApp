import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('USERS')
      .where('role', '==', 'customer')
      .onSnapshot(querySnapshot => {
        const customersData = [];
        querySnapshot.forEach(documentSnapshot => {
          customersData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data()
          });
        });
        setCustomers(customersData);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.customerContainer}>
      <Text style={styles.customerText}>Name: {item.fullName}</Text>
      <Text style={styles.customerText}>Email: {item.email}</Text>
      <Text style={styles.customerText}>Password: {item.password}</Text>
      {/* Hiển thị các thông tin khác của khách hàng nếu cần */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách khách hàng</Text>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'black'
  },
  customerContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  customerText: {
    fontSize: 16,
    marginBottom: 5,
    color:'black'
  },
});
