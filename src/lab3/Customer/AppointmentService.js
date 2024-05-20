import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../Store/Index";
const AppointmentService = ({ navigation, route }) => {
    const { item } = route.params;
    const [controller,dispatch]=useMyContextController()
    const {userLogin}=controller
    const handleBookAppointment = async () => {
        try {
            // Tạo một reference đến collection 'APPOINTMENT'
            const appointmentRef = firestore().collection('APPOINTMENT');

            // Thêm một bản ghi mới vào collection 'APPOINTMENT'
            await appointmentRef.add({
                dateArrival: getCurrentDateString(), // Sử dụng thời gian hiện tại cho dateArrival
                dateOrder: getCurrentDateString(), // Sử dụng thời gian hiện tại cho dateOrder
                serviceID: item.id, // Sử dụng id của dịch vụ
                userID: userLogin.email, // Sử dụng userID của người dùng (bạn cần thay đổi giá trị này để lấy userID thực tế)
                state: 'pending' // Mặc định state là "pending"
            });
            navigation.navigate("HomeService")
            console.log('Appointment created successfully!');
        } catch (error) {
            console.error('Error creating appointment: ', error);
        }
    };

    
    function getCurrentDateString() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
        const year = currentDate.getFullYear();
    
        const formattedDay = day < 10 ? '0' + day : day; // Thêm số 0 phía trước nếu ngày nhỏ hơn 10
        const formattedMonth = month < 10 ? '0' + month : month; // Thêm số 0 phía trước nếu tháng nhỏ hơn 10
    
        return formattedDay.toString() + '/' + formattedMonth.toString() + '/' + year.toString();
    }
    return (
        <View style={styles.container}>
            <View style={{marginBottom:5,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                <Image style={{height:300,width:400}} source={{uri:item.image}}/>
            </View>
            <Text style={styles.title}>Name: {item.nameService}</Text>
            <Text style={styles.info}>Price: {item.price}</Text>
            <View>
                <Text style={styles.info}>Date Order: {getCurrentDateString()} </Text>
               
            </View>
            <View>
                <Text style={styles.info}>Date Arrival: {getCurrentDateString()}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleBookAppointment}>
                <Text style={styles.buttonText}>Đặt lịch</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
        color:'black'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#ef506b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:'center'
    },
});

export default AppointmentService;
