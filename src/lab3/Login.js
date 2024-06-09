import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Appbar, Text, TextInput , Button  } from 'react-native-paper';
import { login, useMyContextController } from './Store/Index';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('ngvanhungg1512@gmail.com');
  const [password, setPassword] = useState('112358fibo');
  const [showPassword,setShowPassword]=useState(true)

  const [controller,dispatch]=useMyContextController();
  const {userLogin}=controller;

  useEffect(()=>{
    console.log(userLogin)
    
    if(userLogin!=null){
      if(userLogin.role=="admin"){
        navigation.navigate("Admin")
      }else{
        navigation.navigate("Customer")
      }
    }
  },[userLogin])

  const handleLogin = () => {
    login(dispatch,email,password)
  };

  return (
    <View style={{backgroundColor:'#f2f2f2',flex:1}}>
      {/* <Appbar title="Đăng nhập" /> */}
      
      <View style={{ padding: 20, marginTop:'30%'}}>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Image style={{resizeMode:'contain'}} source={require("../../asset/img/logo1.png")}></Image>
      </View>
        <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Login</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{marginBottom:10}}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          right={<TextInput.Icon icon={showPassword?"eye-off":"eye"} onPress={()=>setShowPassword(!showPassword)}/>}
        />
        <View style={{flexDirection:'row',marginTop:10}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("ForgotPassword")}}>
                <Text style={{color:'#ef506b',fontWeight:'bold',textAlign:'right'}}> Forgot password?</Text>
            </TouchableOpacity>
        </View>
        <Button style={{backgroundColor:'#ef506b',marginTop:20,height:40,borderRadius:8}} onPress={handleLogin}>
            <Text style={{color:'white'}}>Login</Text>
        </Button>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                <Text style={{color:'#ef506b',fontWeight:'bold'}}> Sign up</Text>
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Login;
