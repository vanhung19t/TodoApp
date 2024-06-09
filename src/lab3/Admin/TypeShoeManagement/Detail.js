import React, { useLayoutEffect ,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";
import { IconButton,Portal,Dialog,Button,Menu,Divider} from "react-native-paper";
const Detail = ({navigation}) => {
  const route = useRoute();
  const { item } = route.params;
  const [visibleDialog, setVisibleDialog] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);

    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

  useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight:(props)=><IconButton icon={"dots-vertical"} iconColor="white" {...props} onPress={openMenu} />
    })
    })

    const handleDeleteTypeShoe = async () => {
        try {
          // Lấy reference của collection "TYPESHOES" và document cần xóa
          const typeShoeRef = firestore().collection('TYPESHOES').doc(item.id);
      
          // Xóa document khỏi collection
          await typeShoeRef.delete();
          
          // Thông báo hoặc navigation tùy thuộc vào yêu cầu của bạn
          console.log('TypeShoe deleted successfully!');
        } catch (error) {
          console.error('Error deleting TypeShoe: ', error);
        }
        hideDialog();
        navigation.navigate("Home");
      };
      

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`ID: ${item.typeShoeID}`}</Text>
      <Text style={styles.title}>{`Tên loại giày: ${item.nameTypeShoe}`}</Text>
      <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                <Dialog.Title>Cảnh báo</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Bạn có chắc muốn xóa loại giày này?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleDeleteTypeShoe}>Xóa</Button>
                    <Button onPress={hideDialog}>Hủy</Button>
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
                        <Menu.Item onPress={() => {closeMenu(),navigation.navigate("Add")}} title="Thêm" />
                        <Divider />
                        <Menu.Item onPress={() => {closeMenu(),navigation.navigate("Edit",{item})}} title="Sửa" />
                        <Divider />
                        <Menu.Item onPress={() => {closeMenu(),showDialog()}} title="Xóa" />
                </Menu>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#fff', // Màu nền
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'black', // Màu chữ
  },
});

export default Detail;
