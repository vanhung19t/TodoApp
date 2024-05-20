import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Title, TextInput, Button } from 'react-native-paper';

const EditServiceScreen = ({navigation,route}) => {
  const {item}=route.params
  
  const [serviceName, setServiceName] = useState(`${item.nameService}`);
  const [price, setPrice] = useState(`${item.price}`);
  
  const handleSubmit = async () => {
    try {
      const serviceRef = firestore().collection('SERVICES').doc(item.id);
      await serviceRef.update({
        nameService: serviceName,
        price: price
      });
      navigation.navigate("HomeService")
      // Thông báo hoặc navigation tùy thuộc vào yêu cầu của bạn
      console.log('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service: ', error);
    }
  };

  return (
    <View style={{padding:15}}>
      <View style={{marginBottom:10}}>
        <Text style={{fontWeight:'bold',color:'black',marginBottom:5}}>Service *</Text>
        <TextInput
          value={serviceName}
          onChangeText={setServiceName}
          placeholder="Input a service name"
          />
      </View>
      <View style={{marginBottom:10}}>
        <Text style={{fontWeight:'bold',color:'black',marginBottom:5}}>Price *</Text>
        <TextInput value={price.toString()} onChangeText={setPrice} keyboardType="numeric" />
      </View>
      <Button style={{backgroundColor:'#ef506b',borderRadius:8,marginTop:10}} mode="contained" onPress={handleSubmit}>
        Update
      </Button>
    </View>
  );
};

export default EditServiceScreen;
