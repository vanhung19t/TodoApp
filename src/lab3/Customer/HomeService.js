import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppointmentService from "./AppointmentService";
const Index = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const unsubscribe = firestore().collection('SERVICES').onSnapshot(snapshot => {
            const tmp = [];
            snapshot.forEach(service => {
                tmp.push({
                    id: service.id,
                    ...service.data()
                });
            });
            setData(tmp);
            setOriginalData(tmp);
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = (text) => {
        const lowercaseSearchText = text.toLowerCase();
        const filteredData = originalData.filter(item => item.nameService.toLowerCase().includes(lowercaseSearchText));
        setSearchText(text);
        setData(filteredData);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("AppointmentService", { item })}
            style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nameService}</Text>
            <Text style={styles.itemText}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../../asset/img/logolab3.png")} />
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm dịch vụ"
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <Ionicons
                    name="search"
                    size={20}
                    color="#000"
                />
            </View>
            <Text style={styles.title}>Danh sách dịch vụ</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logoContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
    logo: {
        // Thêm style cho logo nếu cần
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    itemContainer: {
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontWeight: 'bold',
        color: 'black',
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        textTransform: 'uppercase',
    },
});

export default Index;
