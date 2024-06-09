import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import Ionicons from "react-native-vector-icons/Ionicons";

const Home = () => {
  const navigation = useNavigation();
  const [shoes, setShoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShoes, setFilteredShoes] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('SHOES') // Assuming your Firestore collection for shoes is named 'SHOES'
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setShoes(data);
        setFilteredShoes(data); // Initially set the filtered list to the complete list
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    // Filter the shoes based on the search term
    if (searchTerm) {
      const filteredData = shoes.filter(item =>
        item.nameShoe.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShoes(filteredData);
    } else {
      setFilteredShoes(shoes);
    }
  }, [searchTerm, shoes]);

  const handlePressShoe = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên giày..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginBottom:20}}>
        <Text style={{fontSize:20,color:"black",fontWeight:'bold',color:'#ef506b'}}>Danh sách giày</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Ionicons name="add-circle" size={30} color={"#ef506b"}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredShoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressShoe(item)}>
            <View style={styles.itemContainer}>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>ID: </Text>{item.id}</Text>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>Tên giày: </Text> {item.nameShoe}</Text>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>Số lượng: </Text> {item.quantity}</Text>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>Giá: </Text> {item.price}</Text>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>ID loại giày: </Text> {item.typeShoeID}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color:'#ef506b'
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 8,
  },
  itemContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 12,
    borderRadius: 8,
  },
});

export default Home;
