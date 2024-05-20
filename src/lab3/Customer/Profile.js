import React from 'react';
import { Button } from "react-native-paper";
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useMyContextController,logout } from '../Store/Index';

export default function Profile({ navigation }) {

  // Lấy thông tin người dùng hiện tại
  const [controller,dispatch]=useMyContextController();
  const {userLogin}=controller;
  const currentUser = userLogin;

  // Đăng xuất
  const handleSignOut = async () => {
    logout(dispatch)
    navigation.navigate("Login")
  };

  return (
    (currentUser!=null&&
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <View style={styles.infoContainer}>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.infoLabel}>Full Name: </Text>
            <Text style={styles.infoText}>{currentUser.fullName}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.infoLabel}>Email: </Text>
            <Text style={styles.infoText}>{currentUser.email}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.infoLabel}>Password: </Text>
            <Text style={styles.infoText}>{currentUser.password}</Text>
        </View>
      </View>
      <Button style={{backgroundColor:'#ef506b',height:40,borderRadius:8}} onPress={handleSignOut}>
            <Text style={{color:'white'}}>Logout</Text>
        </Button>
    </View>)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'black'
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  infoText: {
    fontSize: 16,
    color:'black'
  },
});
