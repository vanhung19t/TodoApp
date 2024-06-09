import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const EditTypeShoeScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const [nameTypeShoe, setNameTypeShoe] = useState(item.nameTypeShoe);

  const handleSubmit = async () => {
    try {
      const typeShoeRef = firestore().collection('TYPESHOES').doc(item.id);
      await typeShoeRef.update({
        nameTypeShoe: nameTypeShoe,
      });
      navigation.navigate('Home');
      console.log('TypeShoe updated successfully!');
    } catch (error) {
      console.error('Error updating TypeShoe: ', error);
    }
  };

  return (
    <View style={{ padding: 15 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', color: 'black', marginBottom: 5 }}>Tên loại giày *</Text>
        <TextInput
          value={nameTypeShoe}
          onChangeText={setNameTypeShoe}
          placeholder="Nhập tên loại giày"
        />
      </View>
      <Button
        style={{ backgroundColor: '#ef506b', borderRadius: 8, marginTop: 10 }}
        mode="contained"
        onPress={handleSubmit}>
        Cập nhật
      </Button>
    </View>
  );
};

export default EditTypeShoeScreen;
