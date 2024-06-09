import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Text, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';

const Edit = ({ route, navigation }) => {
  const { item } = route.params;

  const [newNameShoe, setNewNameShoe] = useState(item.nameShoe);
  const [newPrice, setNewPrice] = useState(item.price.toString());
  const [newQuantity, setNewQuantity] = useState(item.quantity.toString());
  const [newTypeShoeID, setNewTypeShoeID] = useState(item.typeShoeID);
  const [typeShoes, setTypeShoes] = useState([]);
  const [newImageUri, setNewImageUri] = useState(item.image);

  useEffect(() => {
    const fetchTypeShoes = async () => {
      const typeShoesRef = firestore().collection('TYPESHOES');
      const snapshot = await typeShoesRef.get();
      const types = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTypeShoes(types);
    };

    fetchTypeShoes();
  }, []);

  const handleUpdateShoe = async () => {
    try {
      const shoesRef = firestore().collection('SHOES');
      const shoeDoc = shoesRef.doc(item.shoeID);
      
      await shoeDoc.update({
        nameShoe: newNameShoe,
        price: parseFloat(newPrice),
        quantity: parseInt(newQuantity),
        typeShoeID: newTypeShoeID,
      });

      if (newImageUri !== item.image) {
        const imageRef = storage().ref(`/shoes/${item.shoeID}.png`);
        await imageRef.putFile(newImageUri);
        const imageUrl = await imageRef.getDownloadURL();
        await shoeDoc.update({ image: imageUrl });
      }

      console.log('Shoe updated successfully:', {
        shoeID: item.shoeID,
        nameShoe: newNameShoe,
        price: newPrice,
        quantity: newQuantity,
        typeShoeID: newTypeShoeID,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating shoe:', error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        width: 200,
        height: 200,
      });
      setNewImageUri(image.path);
    } catch (e) {
      console.error('Error selecting image:', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {/* <View style={styles.inputContainer}>
          <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Mã giày</Text>
          <TextInput
            style={styles.input}
            placeholder="ShoeID"
            editable={false}
            value={item.shoeID}
          />
        </View> */}
        <View >
          {(<TouchableOpacity onPress={handleUploadImage} style={{ marginBottom: 16, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }}>
            <Text style={styles.selectImageText}>Chọn ảnh giày</Text>
          </TouchableOpacity>)}
          {newImageUri && (
            <Image style={{ height: 200, resizeMode: "contain" }} source={{ uri: newImageUri }} />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Tên giày</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên giày"
            value={newNameShoe}
            onChangeText={setNewNameShoe}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Giá</Text>
          <TextInput
            style={styles.input}
            placeholder="Giá"
            keyboardType="numeric"
            value={newPrice}
            onChangeText={setNewPrice}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Số lượng</Text>
          <TextInput
            style={styles.input}
            placeholder="Số lượng"
            keyboardType="numeric"
            value={newQuantity}
            onChangeText={setNewQuantity}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginBottom:5}}>Loại giày</Text>
          <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 8 }}>
            <Picker
              selectedValue={newTypeShoeID}
              onValueChange={(itemValue) => setNewTypeShoeID(itemValue)}
              style={styles.picker}
            >
              {typeShoes.map((type) => (
                <Picker.Item key={type.id} label={type.nameTypeShoe} value={type.typeShoeID} />
              ))}
            </Picker>
          </View>
        </View>
       
      </View>
      <Button style={{backgroundColor:'#ef506b',color:'white',borderRadius:8,marginTop:5}} onPress={handleUpdateShoe}>
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
  picker: {
    height: 45,
    width: '100%',
  },
  selectImageText: {
    color: '#333',
    fontSize: 16
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  infoContainer: {
    // backgroundColor:'red',
  },
});

export default Edit;
