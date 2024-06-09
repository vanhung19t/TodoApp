import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { formatPrice } from '../Customer/utils'; // Assuming these utilities are defined
import { Picker } from '@react-native-picker/picker';

const RevenuePage = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const totalRevenueSnapshot = await firestore().collection('BILLS').get();
                const totalRevenueData = totalRevenueSnapshot.docs.map(doc => parseFloat(doc.data().totalPrice));
                const total = totalRevenueData.reduce((acc, cur) => acc + cur, 0);
                setTotalRevenue(total * 1000000);
            } catch (error) {
                console.error('Error fetching total revenue:', error);
            }
        };

        const fetchMonthlyRevenue = async () => {
            if (!selectedMonth) return;
            try {
                const monthlyRevenueSnapshot = await firestore()
                    .collection('BILLS')
                    .where('orderDate', '>=', new Date(selectedMonth))
                    .where('orderDate', '<', new Date(selectedMonth + 1))
                    .get();
                const monthlyRevenueData = monthlyRevenueSnapshot.docs.map(doc => parseFloat(doc.data().totalPrice));
                const total = monthlyRevenueData.reduce((acc, cur) => acc + cur, 0);
                setMonthlyRevenue(total * 1000000);
            } catch (error) {
                console.error('Error fetching monthly revenue:', error);
            }
        };

        fetchTotalRevenue();
        fetchMonthlyRevenue();
    }, [selectedMonth]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doanh thu</Text>
            <View style={styles.revenueContainer}>
                <Text style={styles.label}>Tổng doanh thu:</Text>
                <Text style={styles.value}>{formatPrice(totalRevenue)} VNĐ</Text>
            </View>
            <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Chọn tháng" value="" />
                <Picker.Item label="Tháng 1" value="2024-01-01" />
                <Picker.Item label="Tháng 2" value="2024-02-01" />
                <Picker.Item label="Tháng 3" value="2024-03-01" />
                <Picker.Item label="Tháng 4" value="2024-04-01" />
                <Picker.Item label="Tháng 5" value="2024-05-01" />
                <Picker.Item label="Tháng 6" value="2024-06-01" />
                <Picker.Item label="Tháng 7" value="2024-07-01" />
                <Picker.Item label="Tháng 8" value="2024-08-01" />
                <Picker.Item label="Tháng 9" value="2024-09-01" />
                <Picker.Item label="Tháng 10" value="2024-10-01" />
                <Picker.Item label="Tháng 11" value="2024-11-01" />
                <Picker.Item label="Tháng 12" value="2024-12-01" />
                {/*Thêm các tháng khác nếu cần*/}
            </Picker>
            {selectedMonth ? (
                <View style={styles.revenueContainer}>
                    <Text style={styles.label}>Doanh thu tháng {selectedMonth.split("-")[1]}:</Text>
                    <Text style={styles.value}>{formatPrice(monthlyRevenue)} VNĐ</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#333333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    revenueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    label: {
        fontSize: 18,
        color: '#333333',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        color: '#009688',
    },
});

export default RevenuePage;
