import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const checkCredentials = async () => {
        setLoading(true);
        try {
            const documentSnapshot = await firestore()
                .collection('USERS')
                .doc('UrqainqswhGU24XgGeKL')
                .get();

            if (documentSnapshot.exists) {
                const userData = documentSnapshot.data();
                if (userData.email === username && userData.password === password) {
                    console.log('successful');
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Error', 'Incorrect username or password');
                }
            } else {
                Alert.alert('Error', 'User not found');
            }
        } catch (error) {
            console.error('Error checking credentials:', error);
            Alert.alert('Error', 'An error occurred while checking credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ backgroundColor: '#bfa5ff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 15 }}>
                <Text style={{fontWeight:'bold', fontSize: 35, color: '#bfa5ff',textTransform:'uppercase' ,textAlign:'center',marginBottom:50}}>Login</Text>
               
                    <TextInput
                        style={{padding:10, height: 40, width: 330, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        placeholder="Email"
                        onChangeText={setUsername}
                        value={username}
                    />
                    <TextInput
                        style={{ padding:10,height: 40, width: 330, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />
                    <Button
                        style={{ backgroundColor: '#bfa5ff' }}
                        title={loading ? 'Loading...' : 'Login'}
                        onPress={checkCredentials}
                        disabled={loading}
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center', marginTop: 10, }} onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={{ color: '#bfa5ff' ,fontSize:18,fontWeight:'bold'}}>Register</Text>
                    </TouchableOpacity>

                
            </View>
        </View>
    );
}
