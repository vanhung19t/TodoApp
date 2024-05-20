import { MyContextControllerProvider } from "./Store/Index";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./Router";
import { Provider } from "react-native-paper";

const App = () => {
  const USERS = firestore().collection("USERS");

  const admin = {
    fullName: "Admin",
    email: "ngvanhungg1512@gmail.com",
    password: "123456",
    phone: "0862861912",
    address: "Bình Dương",
    role: "admin",
  };

  useEffect(() => {
    // Đăng ký tài khoản admin

    USERS.doc(admin.email)
      .onSnapshot((u) => {
        if (!u.exists) {
          auth()
            .createUserWithEmailAndPassword(admin.email, admin.password)
            .then((response) => {
              USERS.doc(admin.email).set(admin);
              console.log("Thêm tài khoản admin mới");
            });
        } 
      });
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Provider>
          <Router />
        </Provider>
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};

export default App;
