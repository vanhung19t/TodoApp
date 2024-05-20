import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
import Home from "../Customer/Index";
import Profile from "../Customer/Profile";
import Appointment from "../Customer/Appointment";
function TabAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
    //   activeColor="white"
      barStyle={{ backgroundColor: '#ef506b' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bank" color={color} size={26} />
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