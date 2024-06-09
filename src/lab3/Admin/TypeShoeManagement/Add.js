import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import {Button  } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const Add = () => {
  const [nameTypeShoe, setNameTypeShoe] = useState('');

  const handleAddTypeShoe = async () => {
    try {
      // Lấy collection "TYPESHOES"
      const typeshoesRef = firestore().collection('TYPESHOES');

      // Lấy typeShoeID lớn nhất từ Firestore
      const querySnapshot = await typeshoesRef.orderBy('typeShoeID', 'desc').limit(1).get();
      let maxTypeShoeID = 0;
      if (!querySnapshot.empty) {
        maxTypeShoeID = parseInt(querySnapshot.docs[0].data().typeShoeID);
      }

      // Tăng typeShoeID lên 1 và chuyển về kiểu chuỗi
      const newTypeShoeID = (maxTypeShoeID + 1).toString();

      // Tạo một loại giày mới với typeShoeID đã được tăng
      const newTypeShoe = {
        typeShoeID: newTypeShoeID,
        nameTypeShoe: nameTypeShoe,
      };

      // Thêm loại giày mới vào collection với typeShoeID làm ID
      await typeshoesRef.doc(newTypeShoeID).set(newTypeShoe);

      console.log('Loại giày được thêm:', newTypeShoe);
    } catch (error) {
      console.error('Lỗi khi thêm loại giày:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên loại giày"
        value={nameTypeShoe}
        onChangeText={setNameTypeShoe}
      />
      <Button style={{backgroundColor:'#ef506b',color:'white',borderRadius:8,marginTop:5}} onPress={handleAddTypeShoe} >
        <Text style={{color:'white',fontSize:18}}>Add</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
});

export default Add;
