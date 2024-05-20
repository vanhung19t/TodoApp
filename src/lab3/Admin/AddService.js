import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { Title, TextInput, Button } from 'react-native-paper';
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import { useMyContextController} from "../Store/Index";

const AddServiceScreen = ({navigation}) => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState(0);
  const [imagePath,setImagePath]=useState("")

  const [controller,dispatch]=useMyContextController()
  const {userLogin}=controller

  const SERVICES=firestore().collection('SERVICES')
  const handleSubmit =  () => {
    try {
      // Thêm dữ liệu vào bảng "SERVICES" trong Firestore
      SERVICES.add({
        nameService: serviceName,
        price: price,
        creator:userLogin.email
      })
      .then((response)=>{
          //upload image
          const ref=storage().ref('/services/'+response.id+".jpg")
          ref.putFile(imagePath)
          .then(()=>{
              ref.getDownloadURL()
              .then((link)=>{
                SERVICES.doc(response.id).update({id:response.id,image:link})
              })
          })
          .catch(e=>console.log(e.message))
      })
      
      // Reset form sau khi thêm thành công
      setServiceName('');
      setPrice(0);
      navigation.navigate("HomeService")
      // Thông báo hoặc navigation tùy thuộc vào yêu cầu của bạn
      console.log('Service added successfully!');
    } catch (error) {
      console.error('Error adding service: ', error);
    }
  };

  const handleUploadImage=()=>{
    ImagePicker.openPicker({
        mediaType:'photo',
        width:400,
        height:300,

    })
    .then((image)=>{
        setImagePath(image.path)
    })
    .catch(e=>console.log(e.message))
  }
  return (
    <View style={{padding:15}}>
      <Button onPress={handleUploadImage}>Upload image</Button>
      {(imagePath!=""&&
        <Image style={{height:300}} source={{uri:imagePath}}/>
      )}
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
        Add
      </Button>
    </View>
  );
};

export default AddServiceScreen;
