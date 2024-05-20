

import React, { useState } from 'react';
import {  View,TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Text, TextInput as PaperTextInput, Button as PaperButton, HelperText } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Register({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const hasErrorFullName=()=>fullName.trim()===""
    const hasErrorEmail=()=>!email.includes("@")
    const hasErrorPassword=()=>password.trim().length<6;
    const hasErrorIndentifyPassAndRepass=()=>password!==repassword;

    const checkErrorForm=()=>{
        return (hasErrorFullName()||hasErrorEmail()||hasErrorIndentifyPassAndRepass()||hasErrorPassword())
          
    }
    const fDisabledColor=()=>checkErrorForm()?'grey':'#ef506b'
    const disabledColor=fDisabledColor();

    const USERS=firestore().collection("USERS")
    const handleRegister =  () => {
        auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            USERS.doc(email)
            .set({
                fullName,
                email,
                password,
                role:'customer'
            })
            navigation.navigate("Login")
        })
        .catch(e=>Alert.alert("Tai khoan ton tai"))
    };
    return (
       
        <View style={{backgroundColor:'#f2f2f2',flex:1}}>

        <View style={{ padding: 20, marginTop:'25%'}}>
        <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Sign Up</Text>

          
          {/* <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Login</Text> */}
  
          <PaperTextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={{marginBottom:10}}
          />
          <HelperText
            type='error'
            visible={hasErrorFullName()}
          >
            Không được để trống
          </HelperText>
          <PaperTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{marginBottom:10}}
          />
            <HelperText type='error' visible={hasErrorEmail()}>
                Trường này phải là email
            </HelperText>
          <PaperTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
           <HelperText type='error' visible={hasErrorPassword()}>
                Mật khẩu phải có ít nhất 6 ký tự
            </HelperText>
          <PaperTextInput
            label="Confirm Password"
            value={repassword}
            onChangeText={setRepassword}
            secureTextEntry
          />
           <HelperText type='error' visible={hasErrorIndentifyPassAndRepass()}>
                Mật khẩu không trùng khớp
            </HelperText>
         
          <PaperButton style={{backgroundColor:`${disabledColor}`,marginVertical:20,height:40,borderRadius:8}} 
            onPress={handleRegister}
            disabled={checkErrorForm()}
          >
              <Text style={{color:'white'}}>Create account</Text>
          </PaperButton>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Text>Already got an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                  <Text style={{color:'#ef506b',fontWeight:'bold'}}> Login</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}
