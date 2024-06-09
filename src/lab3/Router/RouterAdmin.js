import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
import Home from "../Admin/Index";
import Profile from "../Admin/Profile";
import Customer from "../Admin/Customer";
import Appointment from "../Admin/Appointment";
import RouterTypeShoeManagement from "../Admin/RouterTypeShoeManagement";
import RouterShoeManagement from "../Admin/RouterShoeManagement";
import Revenue from "../Admin/Revenue";
import DrawerAdmin from "../Router/RouterDrawerAdmin";
function TabAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="RouterShoeManagement"
    //   activeColor="white"
      barStyle={{ backgroundColor: '#ef506b' }}
    >
      <Tab.Screen
        name="RouterShoeManagement"
        component={RouterShoeManagement}
        options={{
          tabBarLabel: 'Quản lý Gìay',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shoe-formal" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="RouterTypeShoeManagement"
        component={RouterTypeShoeManagement}
        options={{
          tabBarLabel: 'Quản lý loại giày',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shoe-heel" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Revenue"
        component={Revenue}
        options={{
          tabBarLabel: 'Revenue',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
export default TabAdmin;