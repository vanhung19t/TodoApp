import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import Ionicons from "react-native-vector-icons/Ionicons";

const Home = () => {
  const navigation = useNavigation();
  const [shoeTypes, setShoeTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShoeTypes, setFilteredShoeTypes] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('TYPESHOES')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setShoeTypes(data);
        setFilteredShoeTypes(data); // Initially set the filtered list to the complete list
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    // Filter the shoe types based on the search term
    if (searchTerm) {
      const filteredData = shoeTypes.filter(item =>
        item.nameTypeShoe.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShoeTypes(filteredData);
    } else {
      setFilteredShoeTypes(shoeTypes);
    }
  }, [searchTerm, shoeTypes]);

  const handlePressShoeType = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên loại giày..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginBottom:20}}>
        <Text style={{fontSize:20,color:"black",fontWeight:'bold',color:'#ef506b'}}>Danh sách loại giày</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Ionicons name="add-circle" size={30} color={"#ef506b"}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredShoeTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressShoeType(item)}>
            <View style={styles.itemContainer}>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>ID: </Text>{item.typeShoeID}</Text>
              <Text style={{color:'black'}}><Text style={{fontWeight:'bold',color:'black'}}>Tên loại giày: </Text> {item.nameTypeShoe}</Text>
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
