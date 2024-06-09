import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import {  useMyContextController} from "../Store/Index";
const ProductDetail = ({ route }) => {
    const { item } = route.params;
    const [selectedSize, setSelectedSize] = useState('39');
    const [quantity, setQuantity] = useState(1);
    const navigation = useNavigation();

    const [controller,dispatch]=useMyContextController();
    const {userLogin}=controller;

    const handleAddToCart = async () => {
        try {
            await firestore().collection('CARTS').add({
                shoeID: item.shoeID,
                size: selectedSize,
                quantity: quantity,
                userID: userLogin.email,
                orderDate: firestore.Timestamp.now(), // Lấy thời gian hiện tại
            });
            console.log(`Added ${quantity} of size ${selectedSize} to the cart`);
            navigation.navigate("Home");
        } catch (error) {
            console.error('Error adding to cart: ', error);
        }
    };
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nameShoe}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.label}>Chọn size:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={selectedSize}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedSize(itemValue)}
                    >
                        <Picker.Item label="39" value="39" />
                        <Picker.Item label="40" value="40" />
                        <Picker.Item label="41" value="41" />
                        <Picker.Item label="42" value="42" />
                    </Picker>
                </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.label}>Số lượng:</Text>
                <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={String(quantity)}
                    onChangeText={(text) => setQuantity(Number(text))}
                />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        flex: 1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    quantityInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#ef506b',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetail;
