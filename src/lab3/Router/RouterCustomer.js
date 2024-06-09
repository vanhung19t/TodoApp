import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
// import Home from "../Customer/Index";
import Home1 from "../Customer/Home";
import Profile from "../Customer/Profile";
import Appointment from "../Customer/Appointment";
import Cart from "../Customer/RouteCart";
import Bill from "../Customer/Bills";
function TabAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="Home1"
    //   activeColor="white"
      barStyle={{ backgroundColor: '#ef506b' }}
    >
      <Tab.Screen
        name="Home1"
        component={Home1}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Bill"
        component={Bill}
        options={{
          tabBarLabel: 'Bill',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart-check" color={color} size={26} />
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