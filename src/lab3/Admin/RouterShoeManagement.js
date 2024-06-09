import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View,Text, Image, TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./ShoeManagement/Home";
import Add from "./ShoeManagement/Add";
import Detail from "./ShoeManagement/Detail";
import Edit from "./ShoeManagement/Edit";

const Stack=createStackNavigator();
const RouterShoe=()=>{
    return(
        //Không bỏ trong navigation container nữa vì ở app.js đã bỏ rồi
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={Home} options={{
                   
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitle: 'Quản lý giày',
                }}/>
                <Stack.Screen name="Add" component={Add} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                   headerTitle: 'Thêm giày',
               }}/>
                <Stack.Screen name="Edit" component={Edit} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                   headerTitle: 'Cập nhật giày',
                 
               }}/>
                <Stack.Screen name="Detail" component={Detail} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                   headerTitle: 'Chi tiết giày',
               }}/>
            </Stack.Navigator>
    )
}
export default RouterShoe;