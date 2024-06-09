import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { formatPrice, formatDate } from './utils'; // Assuming these utilities are defined

import { useMyContextController } from "../Store/Index";

const OrderConfirmation = ({ navigation, route }) => {
    const { totalPrice, selectedItems, cartItems } = route.params;
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const[controller,dispatch]=useMyContextController()
    const {userLogin}=controller;

    const getDeliveryDate = () => {
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
        return deliveryDate.toLocaleDateString();
    };
    

    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));

    const saveOrderToBills = async () => {
        const billData = {
            userId: userLogin.email, // Replace with actual user ID
            items: selectedCartItems,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            orderDate: formatDate(new Date()), // Assuming formatDate() formats the date properly
            deliveryDate: getDeliveryDate(),
        };
        console.log("order",billData.orderDate)
        try {
            await firestore().collection('BILLS').add(billData);
            console.log('Order saved to BILLS collection');
        } catch (error) {
            console.error('Error saving order: ', error);
        }
    };
    

    const handleConfirmOrder = async () => {
        if (paymentMethod === 'cash') {
            await saveOrderToBills();
            alert('Đặt hàng thành công!');
            navigation.navigate('Home'); // Assuming 'Home' is the name of your home screen route
        } else if (paymentMethod === 'bank') {
            alert('Hiện tại chưa có chức năng thanh toán qua ngân hàng.');
        } else {
            await saveOrderToBills();
            alert('Đơn hàng của bạn đã được xác nhận!');
            navigation.navigate('Cart');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xác nhận đơn hàng</Text>
            <FlatList
                data={selectedCartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Tên giày: {item.nameShoe}</Text>
                        <Text style={styles.itemText}>Giá: {formatPrice(item.price)} VNĐ</Text>
                        <Text style={styles.itemText}>Size: {item.size}</Text>
                        <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
                        <Text style={styles.itemText}>Ngày giao hàng dự kiến: {getDeliveryDate()}</Text>
                        </View>
                )}
            />
            <Text style={styles.totalPriceText}>Tổng tiền: {formatPrice(totalPrice)} VNĐ</Text>
            <View style={styles.paymentContainer}>
                <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
                <RadioButton.Group onValueChange={newValue => setPaymentMethod(newValue)} value={paymentMethod}>
                    <View style={styles.radioButton}>
                        <RadioButton value="cash" />
                        <Text style={styles.radioText}>Thanh toán bằng tiền mặt</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton value="bank" />
                        <Text style={styles.radioText}>Thanh toán qua ngân hàng</Text>
                    </View>
                </RadioButton.Group>
            </View>
            <Button
                mode="contained"
                style={styles.confirmButton}
                onPress={handleConfirmOrder}
            >
                <Text style={styles.confirmButtonText}>Xác nhận thanh toán</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    paymentContainer: {
        marginTop: 20,
    },
    paymentTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioText: {
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#ef506b',
        marginTop: 20,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default OrderConfirmation;
