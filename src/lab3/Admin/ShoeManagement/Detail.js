import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";
import { IconButton, Portal, Dialog, Button, Menu, Divider } from "react-native-paper";

const Detail = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params; // Get shoeID from route params
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [shoeDetails, setShoeDetails] = useState(null);
  const [typeShoeDetails, setTypeShoeDetails] = useState(null);

  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => <IconButton icon={"dots-vertical"} iconColor="white" {...props} onPress={openMenu} />
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('SHOES')
      .doc(item.shoeID)
      .onSnapshot(async (shoeDoc) => {
        if (shoeDoc.exists) {
          const shoeData = shoeDoc.data();
          setShoeDetails(shoeData);

          const typeShoeSnapshot = await firestore()
            .collection('TYPESHOES')
            .where('typeShoeID', '==', shoeData.typeShoeID)
            .get();

          if (!typeShoeSnapshot.empty) {
            const typeShoeData = typeShoeSnapshot.docs.map(doc => doc.data())[0];
            setTypeShoeDetails(typeShoeData);
          }
        } else {
          console.error('No such document!');
        }
      });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [item.shoeID]);

  const handleDeleteShoe = async () => {
    try {
      const shoeRef = firestore().collection('SHOES').doc(item.shoeID);
      await shoeRef.delete();
      console.log('Shoe deleted successfully!');
      hideDialog();
      navigation.navigate("Home");
    } catch (error) {
      console.error('Error deleting shoe: ', error);
    }
  };

  if (!shoeDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {shoeDetails.image && (
        <Image source={{ uri: shoeDetails.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{`ID: ${item.shoeID}`}</Text>
      {typeShoeDetails && (
        <Text style={styles.title}>{`Tên loại giày: ${typeShoeDetails.nameTypeShoe}`}</Text>
      )}
      <Text style={styles.title}>{`Tên giày: ${shoeDetails.nameShoe}`}</Text>
      <Text style={styles.title}>{`Giá: ${shoeDetails.price}`}</Text>
      <Text style={styles.title}>{`Số lượng: ${shoeDetails.quantity}`}</Text>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>Cảnh báo</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Bạn có chắc muốn xóa giày này?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleteShoe}>Xóa</Button>
            <Button onPress={hideDialog}>Hủy</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          right: 0,
          top: 0
        }}>
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchorPosition="top"
          anchor={<Button onPress={openMenu} disabled={true}></Button>}>
          <Menu.Item onPress={() => { closeMenu(); navigation.navigate("Add") }} title="Thêm" />
          <Divider />
          <Menu.Item onPress={() => { closeMenu(); navigation.navigate("Edit", { item: shoeDetails }) }} title="Sửa" />
          <Divider />
          <Menu.Item onPress={() => { closeMenu(); showDialog() }} title="Xóa" />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default Detail;
