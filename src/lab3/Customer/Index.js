import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View,Text, Image, TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeService from "./HomeService";
import AppointmentService from "./AppointmentService";

const Stack=createStackNavigator();
const RouterService=()=>{
    return(
        //Không bỏ trong navigation container nữa vì ở app.js đã bỏ rồi
            <Stack.Navigator initialRouteName="HomeService" >
                <Stack.Screen name="HomeService" component={HomeService} options={{
                   
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                  
                }}/>
                <Stack.Screen name="AppointmentService" component={AppointmentService} options={{
                   
                   headerStyle: {
                       backgroundColor: '#ef506b',
                   },
                   headerTintColor: '#fff',
                 
               }}/>
                
            </Stack.Navigator>
    )
}
export default RouterService;