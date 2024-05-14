import React, { useEffect, useState } from 'react';
import {  View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Appbar, Text, TextInput , Button  } from 'react-native-paper';
import { login, useMyContextController } from './Store/Index';

const LoginPage = ({navigation}) => {

  const [controller,dispatch]=useMyContextController()
  const {userLogin}=controller
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword]=useState(true)

  const handleLogin =() => {
    login(dispatch,email,password)
  };

  useEffect(()=>{
    console.log(userLogin)
    
    if(userLogin!=null){
      // if(userLogin.role=="admin"){
      //   navigation.navigate("Admin")
      // }else{
      //   navigation.navigate("Customer")
      // }
      navigation.navigate("Home")
    }
  },[userLogin])


  return (
    <View style={{backgroundColor:'#f2f2f2',flex:1}}>

      <View style={{ padding: 20, marginTop:'25%'}}>
        <View style={{alignItems:'center'}}>
            <Image
                style={{}}
                source={require('../../asset/img/logo.jpg')}
            />
        </View>
        
        {/* <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Login</Text> */}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{marginBottom:10}}
        />
        <View style={{position:'relative',flexDirection:'row',alignItems:'center'}}>

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            style={{flex:1}}
            />
            <Button icon={showPassword?"eye-off":"eye"} style={{position:"absolute",right:0}} onPress={()=>setShowPassword(!showPassword)}></Button>
          </View>
       
        <Button style={{backgroundColor:'#788eec',marginVertical:20,height:40,borderRadius:8}} onPress={handleLogin}>
            <Text style={{color:'white'}}>Login</Text>
        </Button>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                <Text style={{color:'#788eec',fontWeight:'bold'}}> Sign up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
