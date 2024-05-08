import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        console.log(password,repassword)
        if (password !== repassword) {
            Alert.alert('Mật khẩu và mật khẩu nhập lại không khớp');
            return;
        }

        try {
            await firestore()
                .collection('USERS')
                .add({
                    email: email,
                    password: password,
                    name:name
                });

            Alert.alert('Đăng ký thành công');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Lỗi đăng ký', error);
            Alert.alert('Đã có lỗi xảy ra khi đăng ký');
        }
    };

    return (
        <View style={{ backgroundColor:'#bfa5ff',padding:20,flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 15 }}>

            
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                marginBottom: 30,
                color:'#bfa5ff'
            }}>
                REGISTER
            </Text>

            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={{ padding:10,height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        
                keyboardType='email-address'
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                style={{ padding:10,height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        
            />
            <TextInput
                placeholder="RePassword"
                onChangeText={setRepassword}
                value={repassword}
                secureTextEntry={true}
                style={{ padding:10,height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        
            />
            <TextInput
                placeholder="Full name"
                onChangeText={setName}
                value={name}
                style={{ padding:10,height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        
            />

            <TouchableOpacity
                onPress={handleRegister}
                style={{
                    borderRadius:4,
                    padding: 10,
                    alignItems: 'center',
                    backgroundColor: 'blue',
                    width:'100%'
                }}
            >
                <Text style={{ fontSize: 20, color: 'white' }}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ alignItems: 'center', marginTop: 20 }}
            >
                <Text style={{ color: '#bfa5ff' ,fontSize:18,fontWeight:'bold'}}>Back</Text>
            </TouchableOpacity>

            </View>
        </View>
    );
}
