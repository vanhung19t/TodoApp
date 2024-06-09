import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../Store/Index';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

const Cart = ({navigation}) => {
    const [cartItems, setCartItems] = useState([]);
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore().collection('CARTS').onSnapshot(snapshot => {
            const items = snapshot.docs.map(async (doc) => {
                const data = doc.data();
                const shoeRef = firestore().collection('SHOES').doc(data.shoeID);
                const shoeDoc = await shoeRef.get();
                const shoeData = shoeDoc.data();
                return {
                    ...data,
                    id: doc.id,
                    image: shoeData.image,
                    nameShoe: shoeData.nameShoe,
                    price: shoeData.price,
                    orderDate: formatDate(data.orderDate),
                };
            });
            Promise.all(items).then((resolvedItems) => {
                setCartItems(resolvedItems);
            });
        });

        return () => unsubscribe();
    }, []);

    const handleDeleteItem = async (itemId) => {
        try {
            await firestore().collection('CARTS').doc(itemId).delete();
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
            handleCheckChange(itemId, false); // Update the total price if the item is deleted
            console.log(`Deleted item with id ${itemId}`);
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    const handleCheckChange = (itemId, isChecked) => {
        setSelectedItemIds(prevSelectedItemIds => {
            const newSelectedItemIds = isChecked
                ? [...prevSelectedItemIds, itemId]
                : prevSelectedItemIds.filter(id => id !== itemId);
            calculateTotalPrice(newSelectedItemIds);
            return newSelectedItemIds;
        });
    };

    const calculateTotalPrice = (selectedIds) => {
        const total = cartItems.reduce((sum, item) => {
            if (selectedIds.includes(item.id)) {
                return sum + (item.price * item.quantity);
            }
            return sum;
        }, 0);
        setTotalPrice(total);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleCheckout = () => {
       
        navigation.navigate('OrderConfirmation', { totalPrice: formatPrice(totalPrice), selectedItems: selectedItemIds, cartItems });
        
    };

    const handlePaymentOption = (option) => {
        setIsModalVisible(false);
        if (option === 'cash') {
            navigation.navigate('OrderConfirmation', { totalPrice: formatPrice(totalPrice), selectedItems: selectedItemIds });
        } else {
            // Handle bank payment option
            console.log('Selected payment option: Bank');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng của bạn</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <CheckBox
                            value={selectedItemIds.includes(item.id)}
                            onValueChange={(isChecked) => handleCheckChange(item.id, isChecked)}
                        />
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.item}>
                            <Text style={styles.itemText}>Tên giày: {item.nameShoe}</Text>
                            <Text style={styles.itemText}>Giá: {formatPrice(item.price)} VNĐ</Text>
                            <Text style={styles.itemText}>Size: {item.size}</Text>
                            <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.itemText}>Ngày thêm: {item.orderDate}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                            <Icon name="trash-outline" size={30} color="#f00" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.totalPriceText}>Tổng tiền: {formatPrice(totalPrice)} VNĐ</Text>
                <Button mode="contained" style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </Button>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>
                        <Button mode="contained" style={styles.modalButton} onPress={() => handlePaymentOption('cash')}>
                            <Text style={styles.modalButtonText}>Thanh toán bằng tiền mặt</Text>
                        </Button>
                        <Button mode="contained" style={styles.modalButton} onPress={() => handlePaymentOption('bank')}>
                            <Text style={styles.modalButtonText}>Thanh toán qua ngân hàng</Text>
                        </Button>
                        <Button mode="text" onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Hủy</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 40,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    itemImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
    },
    item: {
        padding: 10,
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        padding: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#ef506b',
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#ef506b',
        marginTop: 10,
        height: 40,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalCancelText: {
        marginTop: 20,
        fontSize: 16,
        color: 'grey',
    },
});

const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
};

export default Cart;
