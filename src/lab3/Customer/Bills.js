import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../Store/Index";



const Bills = ({ userID }) => {
    const [bills, setBills] = useState([]);
    const [controller,dispatch]=useMyContextController()
    const{userLogin}=controller;

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const billsCollection = await firestore()
                    .collection('BILLS')
                    .where('userId', '==', userLogin.email)
                    .get();
                
                const billsData = billsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBills(billsData);
                console.log(billsData);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        };        
        fetchBills();
    }, [userID]);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const renderItem = ({ item }) => (
        <View style={styles.billContainer}>
            <Text style={styles.billTitle}>Đơn hàng #{item.id}</Text>
            <FlatList
                data={item.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemText}>Tên giày: {item.nameShoe}</Text>
                            <Text style={styles.itemText}>Giá: {formatPrice(item.price)} VNĐ</Text>
                            <Text style={styles.itemText}>Size: {item.size}</Text>
                            <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
                        </View>
                    </View>
                )}
            />
            <Text style={styles.totalPriceText}>Tổng tiền: {formatPrice(item.totalPrice)} VNĐ</Text>
            <Text style={styles.paymentMethodText}>Phương thức thanh toán: {item.paymentMethod === 'cash' ? 'Tiền mặt' : 'Ngân hàng'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách đơn hàng</Text>
            {bills.length === 0 ? (
                <Text style={styles.noBillsText}>Chưa có đơn hàng nào.</Text>
            ) : (
                <FlatList
                    data={bills}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
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
    noBillsText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 50,
    },
    billContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    billTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    paymentMethodText: {
        fontSize: 16,
        marginTop: 5,
        fontStyle: 'italic',
    },
});

export default Bills;
