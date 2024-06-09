import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View,Text, Image, TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./TypeShoeManagement/Home";
import Add from "./TypeShoeManagement/Add";
import Detail from "./TypeShoeManagement/Detail";
import Edit from "./TypeShoeManagement/Edit";

const Stack=createStackNavigator();
const RouterTypeShoe=()=>{
    return(
        //Không bỏ trong navigation container nữa vì ở app.js đã bỏ rồi
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={Home} options={{
                   
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitle: 'Quản lý loại giày',
                }}/>
                <Stack.Screen name="Add" component={Add} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                   headerTitle: 'Thêm loại giày',
               }}/>
                <Stack.Screen name="Edit" component={Edit} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                   headerTitle: 'Cập nhật loại giày',
                 
               }}/>
                <Stack.Screen name="Detail" component={Detail} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                   headerTitle: 'Chi tiết loại giày',
               }}/>
            </Stack.Navigator>
    )
}
export default RouterTypeShoe;