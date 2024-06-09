import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Text,Button } from 'react-native-paper';

const Edit = ({ route }) => {
  const { item } = route.params;
  
  const [newNameTypeShoe, setNewNameTypeShoe] = useState(item.nameTypeShoe);

  const handleUpdateTypeShoe = async () => {
    try {
      const typeshoesRef = firestore().collection('TYPESHOES');

      // Cập nhật tên loại giày mới
      await typeshoesRef.doc(item.typeShoeID).update({
        nameTypeShoe: newNameTypeShoe,
      });

      console.log('Loại giày đã được cập nhật:', {
        typeShoeID: item.typeShoeID,
        nameTypeShoe: newNameTypeShoe,
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật loại giày:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
          <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Mã loại giày</Text>
          <TextInput
            style={styles.input}
            placeholder="TypeShoeID"
            editable={false}
            value={item.typeShoeID}
          />
        </View>
        <View style={styles.inputContainer}>
        <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Tên loại giày</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Tên loại giày"
            value={newNameTypeShoe}
            onChangeText={setNewNameTypeShoe}
          />
        </View>
      </View>
      <Button style={{backgroundColor:'#ef506b',color:'white',borderRadius:8,marginTop:5}} onPress={handleUpdateTypeShoe} >
        <Text style={{color:'white',fontSize:18}}>Update</Text>
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
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  infoContainer: {
    // backgroundColor:'red',
  },
});

export default Edit;
