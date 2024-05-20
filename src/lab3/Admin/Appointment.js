import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('APPOINTMENT')
      .onSnapshot(querySnapshot => {
        const appointmentsData = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          appointmentsData.push({
            id: documentSnapshot.id,
            dateArrival: data.dateArrival,
            dateOrder: data.dateOrder,
            serviceID: data.serviceID,
            userID: data.userID,
            state:data.state,
          });
        });
        setAppointments(appointmentsData);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.appointmentContainer}>
      <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>User ID:</Text> {item.userID}</Text>
      <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>Service ID:</Text> {item.serviceID}</Text>
      <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>Date of Order:</Text> {item.dateOrder}</Text>
      <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>Date of Arrival:</Text> {item.dateArrival}</Text>
      <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>State: </Text>{item.state}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách lịch đặt</Text>
      <FlatList
        data={appointments}
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
    marginBottom: 10,
    textAlign: 'center',
    color:'black'
  },
  appointmentContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
    color:'black'
  },
});
