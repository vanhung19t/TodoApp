import { useLayoutEffect, useState } from "react";
import { Image, Text, View } from "react-native"
import { IconButton,Portal,Dialog,Button,Menu,Divider} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
const DetailService=({navigation,route})=>{
    const {item}=route.params;
    const [serviceName,setServiceName]=useState('Chăm sóc da mặt và dưỡng ẩm tự nhiên')
    const [price,setPrice]=useState('250000')
    const [creator,setCreator]=useState('Hung')
    const [time,setTime]=useState('12/03/2023')
    const [finalUpdate,setFinalUpdate]=useState('12/03/2023')

    const [visibleDialog, setVisibleDialog] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);

    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    const handleDeleteService = async () => {
        try {
          const serviceRef = firestore().collection('SERVICES').doc(item.id);
          await serviceRef.delete();
          
          // Thông báo hoặc navigation tùy thuộc vào yêu cầu của bạn
          console.log('Service deleted successfully!');
        } catch (error) {
          console.error('Error deleting service: ', error);
        }
        hideDialog()
        navigation.navigate("HomeService")
    };

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:(props)=><IconButton icon={"dots-vertical"} iconColor="white" {...props} onPress={openMenu} />
        })
    })

    return(
        <View style={{padding:15,position:'relative'}}>
            <View style={{marginBottom:5,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                <Image style={{height:300,width:400}} source={{uri:item.image}}/>
            </View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Service Name: </Text>
                <Text style={{color:'black'}}>{item.nameService}</Text>
            </View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Price: </Text>
                <Text style={{color:'black'}}>{item.price}</Text>
            </View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Creator: </Text>
                <Text  style={{color:'black'}}>{item.creator}</Text>
            </View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Time: </Text>
                <Text  style={{color:'black'}}>{time}</Text>
            </View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Final update: </Text>
                <Text style={{color:'black'}}>{finalUpdate}</Text>
            </View>
            <Portal>
                <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                    <Dialog.Title>Warning</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Are you sure you want to remove this service? This operation cannot be returned</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleDeleteService}>DELETE</Button>
                        <Button onPress={hideDialog}>CANCEL</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View
                style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position:'absolute',
                right:0,
                top:0
                }}>
                <Menu
                    visible={visibleMenu}
                    onDismiss={closeMenu}
                    anchorPosition="top"
                    anchor={<Button onPress={openMenu} disabled={true}></Button>}>
                        <Menu.Item onPress={() => {closeMenu(),navigation.navigate("AddService")}} title="Add" />
                        <Divider />
                        <Menu.Item onPress={() => {closeMenu(),navigation.navigate("EditService",{item})}} title="Edit" />
                        <Divider />
                        <Menu.Item onPress={() => {closeMenu(),showDialog()}} title="Delete" />
                </Menu>
        </View>
        </View>
    )
}
export default DetailService;