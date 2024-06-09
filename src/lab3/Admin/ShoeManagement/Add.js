import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from "react-native-image-crop-picker";

const Add = ({navigation}) => {
  const [nameShoe, setNameShoe] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [typeShoeID, setTypeShoeID] = useState('');
  const [typeShoes, setTypeShoes] = useState([]);
  const [imageUri, setImageUri] = useState("");

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

  // const handleAddShoe = async () => {
  //   try {
  //     const shoesRef = firestore().collection('SHOES');
  //     const querySnapshot = await shoesRef.orderBy('shoeID', 'desc').limit(1).get();
  //     let maxShoeID = 0;
  //     if (!querySnapshot.empty) {
  //       maxShoeID = parseInt(querySnapshot.docs[0].data().shoeID);
  //     }
  //     const newShoeID = (maxShoeID + 1).toString();
  //     const newShoe = {
  //       shoeID: newShoeID,
  //       nameShoe: nameShoe,
  //       quantity: parseInt(quantity),
  //       price: parseFloat(price),
  //       typeShoeID: typeShoeID,
  //     };

  //     // Add new shoe document to Firestore
  //     shoesRef.add(newShoe)
  //     .then((response)=>{
  //        //upload image
  //        const ref=storage().ref('/shoes/'+response.id+".png")
  //        ref.putFile(imageUri)
  //        .then(()=>{
  //            ref.getDownloadURL()
  //            .then((link)=>{
  //              shoesRef.doc(response.id).update({image:link})
  //            })
  //        })
  //        .catch(e=>console.log(e.message))
  //     })
  //      // Reset form sau khi thêm thành công
  //      setNameShoe('');
  //      setQuantity('');
  //      setPrice('');
  //      setTypeShoeID('');
  //      setImageUri('');
  //      navigation.navigate("Home")
  //      // Thông báo hoặc navigation tùy thuộc vào yêu cầu của bạn
  //      console.log('Shoe added successfully!');

      
  //   } catch (error) {
  //     console.error('Lỗi khi thêm giày:', error);
  //   }
  // };

  const handleAddShoe = async () => {
    try {
      const shoesRef = firestore().collection('SHOES');
      const querySnapshot = await shoesRef.orderBy('shoeID', 'desc').limit(1).get();
      let maxShoeID = 0;
      if (!querySnapshot.empty) {
        maxShoeID = parseInt(querySnapshot.docs[0].data().shoeID);
      }
      const newShoeID = (maxShoeID + 1).toString();
      const newShoe = {
        shoeID: newShoeID,
        nameShoe: nameShoe,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        typeShoeID: typeShoeID,
      };

      // Use shoeID as the document ID
      await shoesRef.doc(newShoeID).set(newShoe);

      // Upload image
      if (imageUri) {
        const ref = storage().ref(`/shoes/${newShoeID}.png`);
        await ref.putFile(imageUri);
        const link = await ref.getDownloadURL();
        await shoesRef.doc(newShoeID).update({ image: link });
      }

      // Reset form after successful addition
      setNameShoe('');
      setQuantity('');
      setPrice('');
      setTypeShoeID('');
      setImageUri('');
      navigation.navigate("Home");

      console.log('Shoe added successfully!');

    } catch (error) {
      console.error('Lỗi khi thêm giày:', error);
    }
  };


  const handleUploadImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        width: 200,
        height: 200,
      });
      setImageUri(image.path);
    } catch (e) {
      console.error('Lỗi khi chọn ảnh:', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUploadImage} style={{ marginBottom: 16, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }}>
        <Text style={styles.selectImageText}>Chọn ảnh giày</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image style={{ height: 200, resizeMode: "contain" }} source={{ uri: imageUri }} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên giày"
        value={nameShoe}
        onChangeText={setNameShoe}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập số lượng"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập giá"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16 }}>
        <Picker
          selectedValue={typeShoeID}
          onValueChange={(itemValue) => setTypeShoeID(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn loại giày" value="" />
          {typeShoes.map((type) => (
            <Picker.Item key={type.id} label={type.nameTypeShoe} value={type.typeShoeID} />
          ))}
        </Picker>
      </View>
      <Button
        style={{ backgroundColor: '#ef506b', borderRadius: 8, marginTop: 5 }}
        onPress={handleAddShoe}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Add</Text>
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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
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
});

export default Add;
