import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Import firestore from @react-native-firebase

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  useMyContextController} from "../Store/Index";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
    const [controller,dispatch]=useMyContextController();
    const {userLogin}=controller;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require('../../../asset/img/banner1.png'),
        require('../../../asset/img/banner2.png'),
        require('../../../asset/img/banner3.png'),
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        // Xóa timer khi component unmount
        return () => clearTimeout(timer);
    }, [currentImageIndex]);

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore().collection('SHOES').onSnapshot(snapshot => {
            const tmp = [];
            snapshot.forEach(shoe => {
                tmp.push({
                    id: shoe.id,
                    ...shoe.data()
                });
            });
            setData(tmp);
            setOriginalData(tmp);
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = (text) => {
        const lowercaseSearchText = text.toLowerCase();
        const filteredData = originalData.filter(item => item.nameShoe.toLowerCase().includes(lowercaseSearchText));
        setSearchText(text);
        setData(filteredData);
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem} onPress={()=>navigation.navigate("Add",{item})}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nameShoe}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    
    return (
        (userLogin&&
        <View style={{flex:1}}>
             <View style={styles.header}>
                <Text style={styles.headerText}>{userLogin.fullName}</Text>
                <TouchableOpacity style={styles.cartIconContainer}>
                    <MaterialCommunityIcons name="cart"  size={32} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
           
                <View style={{ padding: 0 }}>
                    <Image source={images[currentImageIndex]} style={styles.image1} />
                </View>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    onChangeText={handleSearch}
                    value={searchText}
                />

                <Text style={styles.title}>Danh sách sản phẩm của StreetGang</Text>

                {/* Hiển thị danh sách sản phẩm */}
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.productList}
                />
            </View>
        </View>
        )
    );
};

import Add from "./ProductDetails";
const RouterHomeCustomer=()=>{
    return(

        <Stack.Navigator initialRouteName="Home"screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Add" component={Add}/>
        </Stack.Navigator>
)
}
const styles = StyleSheet.create({
    searchInput:{   
        padding:10,
        borderRadius:8,
        borderWidth:1,
        borderColor:'grey'
    },
    title: {
        marginVertical: 20,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        // marginTop: 10,
        height:50,
        backgroundColor:'#ef506b',
        marginBottom:10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartIconContainer: {
        // padding: 10,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    image1: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
        // padding: 10
    },
    productList: {
        // paddingHorizontal: 10,
    },
    productItem: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 5,
        borderRadius: 10,
    },
    productName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        color: 'green',
    },
})
export default RouterHomeCustomer;