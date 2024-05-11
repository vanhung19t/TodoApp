import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


function TodoListApp() {
    const navigation = useNavigation();
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const unsubscribe = firestore().collection('todos')
            .onSnapshot((querySnapshot) => {
                const todos = [];
                querySnapshot.forEach((doc) => {
                    todos.push({ id: doc.id, ...doc.data() });
                });
                setTodos(todos);
            });
        return () => unsubscribe();
    }, []);

    const addTodo = async () => {
        try {
            const todoData = {
                title: text,
            };

            const docRef = await firestore().collection('List').add(todoData);
            console.log('Todo added successfully with ID: ', docRef.id);

            // Update local state with the new todo data
            setTodos(prevTodos => [...prevTodos, { id: docRef.id, ...todoData }]);

            setText('');
        } catch (error) {
            console.error('Error adding todo: ', error);
            Alert.alert('An error occurred while adding todo');
        }
    };


    const removeTodo = async (id) => {
        try {
            // Delete the todo from the database
            await firestore().collection('List').doc(id).delete();

            // Update the local state to remove the todo with the specified id
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error removing todo: ', error);
            Alert.alert('An error occurred while removing todo');
        }
    };


    const renderItem = ({ item, index }) => (
        <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
                <Text style={{fontSize:20,color:'black'}}>X</Text>
            </TouchableOpacity>
            <Text>{`${item.title}`}</Text>
        </View>
    );
    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="Please input title..."
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                <Text style={styles.addButtonText}>Add Todo</Text>
            </TouchableOpacity>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{height:40,borderRadius:4, backgroundColor:'black',alignItems: 'center',justifyContent:'center', marginTop: 20 }}
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
        backgroundColor: '#fff',
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
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
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
export default TodoListApp;