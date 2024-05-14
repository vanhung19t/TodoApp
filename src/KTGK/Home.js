import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, ViewComponent } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { logout,useMyContextController } from "./Store/Index";
import { HelperText } from 'react-native-paper';

function Home({navigation}) {
    const [controller,dispatch]=useMyContextController()
    const {userLogin}=controller
    const [list, setList] = useState([]);
    const [entity, setEntity] = useState('');
    const [unsubscribe, setUnsubscribe] = useState(null); // Thêm state để lưu trữ hàm unsubscribe

    const hasErrorEntity=()=>entity.trim()===''
    //lay du lieu
    useEffect(() => {
        const unsubscribe = firestore().collection('Jobs')
            .onSnapshot((querySnapshot) => {
                const todos = [];
                querySnapshot.forEach((doc) => {
                    todos.push({ id: doc.id, ...doc.data() });
                });
                setList(todos);
            });
        return () => unsubscribe();
    }, []);
    
    const addEntity = () => {
        const entityData = {
            title: entity,
        };
    
        firestore().collection('Jobs').add(entityData)
            .then(docRef => {
                setEntity('');
            })
            .catch(error => {
                console.error('Error adding entity: ', error);
                Alert.alert('An error occurred while adding entity');
            });
    };
    
    

    const removeEntity = async (id) => {
        try {
            
            await firestore().collection('Jobs').doc(id).delete();

           
            setList(prev => prev.filter(entity => entity.id !== id));
        } catch (error) {
            console.error('Error adding entity: ', error);
            Alert.alert('An error occurred while adding entity');
        }
    };


    const renderItem = ({ item, index }) => (
        <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => removeEntity(item.id)}>
                <Text style={{fontSize:20,color:'black'}}>X</Text>
            </TouchableOpacity>
            <Text>{`${index}. ${item.title}`}</Text>
        </View>
    );

    const handleLogout=()=>{
        logout(dispatch)
        navigation.navigate("Login")
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <TextInput
                    style={{...styles.input,flex:1}}
                    placeholder="Add new entity..."
                    value={entity}
                    onChangeText={setEntity}
                />
                
                <TouchableOpacity style={styles.addButton} onPress={()=>addEntity()}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <HelperText type='error' visible={hasErrorEntity()}>
                    Không được để trống
                </HelperText>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <TouchableOpacity
                onPress={handleLogout}
                style={{height:40,borderRadius:4, backgroundColor:'#788eec',alignItems: 'center',justifyContent:'center', marginTop: 20 }}
            >
                <Text style={{fontSize:20, color: 'white' }}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#788eec',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    list: {
        flex: 1,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
export default Home;