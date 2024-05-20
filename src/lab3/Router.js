import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Login from './Login'; 
import RegisterScreen from './Register'; 
import ForgotPassword from './ForgotPassword'; 
import Admin from "./Router/RouterAdmin"
import Customer from "./Router/RouterCustomer"

const Stack = createStackNavigator();

export default function Router() {

    return (
       
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Admin" component={Admin} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Customer" component={Customer} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
    );
}
