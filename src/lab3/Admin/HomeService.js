import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View,Text, Image, TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddService from "./AddService";
import DetailService from "./DetailService";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

const Index=({navigation})=>{
    const [data, setData] = useState([]);
    const SERVICES=firestore().collection("SERVICES")

    useEffect(() => {
        const unsubscribe = firestore().collection('SERVICES').onSnapshot(snapshot => {
            const tmp = [];
            snapshot.forEach(service => {
              tmp.push({
                id: service.id,
                ...service.data()
              });
            });
            setData(tmp);
          });
        
          return () => unsubscribe();

    }, []);
   
    const renderItem=({item})=>{
        return(
            <TouchableOpacity
                onPress={()=>navigation.navigate("DetailService",{item})}
            style={{marginBottom:10,borderRadius:8,borderWidth:1,borderColor:'grey',padding:15,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',color:'black'}}>{item.nameService}</Text>
                <Text>{item.price}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{padding:20}}>
            <View style={{justifyContent:'center',flexDirection:'row',marginTop:20}}>
                <Image style={{}} source={require("../../../asset/img/logolab3.png")} />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:40,marginBottom:20}}>
                <Text style={{fontSize:20,color:"black",fontWeight:'bold'}}>Danh sách dịch vụ</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("AddService")
                }}>
                    <Ionicons name="add-circle" size={30} color={"#ef506b"}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default Index;