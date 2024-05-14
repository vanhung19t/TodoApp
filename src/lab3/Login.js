import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Appbar, Text, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý đăng nhập
    console.log('Đăng nhập với', phone, password);
  };

  return (
    <View style={{backgroundColor:'#f2f2f2',flex:1}}>
      {/* <Appbar title="Đăng nhập" /> */}

      <View style={{ padding: 20, marginTop:'50%'}}>
        <Text variant='displayMedium' style={{textAlign:'center',color:'#ef506b', fontWeight:'bold',marginBottom:30}}>Login</Text>

        <PaperTextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          style={{marginBottom:10}}
        />

        <PaperTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PaperButton style={{backgroundColor:'#ef506b',marginTop:20,height:40,borderRadius:8}} onPress={handleLogin}>
            <Text style={{color:'white'}}>Login</Text>
        </PaperButton>
      </View>
    </View>
  );
};

export default LoginPage;
