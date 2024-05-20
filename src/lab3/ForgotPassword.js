

import React, { useState } from 'react';
import {  View,TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Text, TextInput as PaperTextInput, Button as PaperButton, HelperText } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');

    const hasErrorEmail=()=>!email.includes("@")

    const checkErrorForm=()=>{
        return (hasErrorEmail())
          
    }
    const fDisabledColor=()=>checkErrorForm()?'grey':'#ef506b'
    const disabledColor=fDisabledColor();

    const USERS=firestore().collection("USERS")
    const handleRepassword = async () => {
        try {
           
        // Thực hiện đăng nhập để xác thực người dùng
        await auth().sendPasswordResetEmail(email);
            // Tham chiếu đến tài liệu của người dùng trong Firestore
            const userDoc = firestore().collection('USERS').doc(email);
    
            Alert.alert("Check gmail của bạn và sau đó thay đổi mật khẩu!!!")
            // Điều hướng người dùng đến trang đăng nhập
            navigation.navigate("Login");
        } catch (error) {
            console.log('Error resetting password:', error);
            Alert.alert('Error', 'Failed to reset password. Please try again.');
        }
    };
    return (
       
        <View style={{backgroundColor:'#f2f2f2',flex:1}}>

        <View style={{ padding: 20, marginTop:'25%'}}>
        <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Forgot Password</Text>

          
          {/* <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Login</Text> */}
  
          
          <PaperTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{marginBottom:10}}
          />
            <HelperText type='error' visible={hasErrorEmail()}>
                Trường này phải là email
            </HelperText>
          
         
          <PaperButton style={{backgroundColor:`${disabledColor}`,marginVertical:20,height:40,borderRadius:8}} 
            onPress={handleRepassword}
            disabled={checkErrorForm()}
          >
              <Text style={{color:'white'}}>Submit</Text>
          </PaperButton>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
             
              <TouchableOpacity onPress={() => navigation.goBack()} >
                  <Text style={{color:'#ef506b',fontWeight:'bold'}}>Quay lại</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}
