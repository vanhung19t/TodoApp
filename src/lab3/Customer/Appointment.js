import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../Store/Index";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Appointment({  }) {
  const [controller,dispatch]=useMyContextController();
  const {userLogin}=controller

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('APPOINTMENT')
      .where('userID', '==', userLogin.email)
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
            state: data.state,
          });
        });
        setAppointments(appointmentsData);
      });

    return () => unsubscribe();
  }, []);

  const handleDeleteAppointment = async (id) => {
    try {
      await firestore().collection('APPOINTMENT').doc(id).delete();
      console.log('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.appointmentContainer}>
      <View style={{flex:1}}>
        <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>User ID:</Text> {item.userID}</Text>
        <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>Service ID:</Text> {item.serviceID}</Text>
        <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>Date of Order:</Text> {item.dateOrder}</Text>
        <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>Date of Arrival:</Text> {item.dateArrival}</Text>
        <Text style={styles.appointmentText}><Text style={{fontWeight:'bold'}}>State: </Text>{item.state}</Text>
      </View>
      <TouchableOpacity onPress={()=>handleDeleteAppointment(item.id)} style={{justifyContent:'center',alignItems:'center'}}>
        <AntDesign name="delete" size={50} style={{fontWeight:'bold',color:'black'}}/>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách đặt lịch của bạn</Text>
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
    color: 'black'
  },
  appointmentContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection:'row',
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black'
  },
});
