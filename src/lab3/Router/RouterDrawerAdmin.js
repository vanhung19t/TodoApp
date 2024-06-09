import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "../Admin/Index";
import Profile from "../Admin/Profile";
import Customer from "../Admin/Customer";
import Appointment from "../Admin/Appointment";
import RouterTypeShoeManagement from "../Admin/RouterTypeShoeManagement";
import RouterShoeManagement from "../Admin/RouterShoeManagement";

const Drawer = createDrawerNavigator();

function DrawerAdmin() {
  return (
    <Drawer.Navigator initialRouteName="RouterTypeShoeManagement">
      <Drawer.Screen
        name="RouterShoeManagement"
        component={RouterShoeManagement}
        options={{
          drawerLabel: 'RouterShoeManagement',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="RouterTypeShoeManagement"
        component={RouterTypeShoeManagement}
        options={{
          drawerLabel: 'RouterTypeShoeManagement',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="Appointment"
        component={Appointment}
        options={{
          drawerLabel: 'Appointment',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="bank" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="Customer"
        component={Customer}
        options={{
          drawerLabel: 'Customer',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerAdmin;
