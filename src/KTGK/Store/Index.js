import { createContext,useContext,useMemo,useReducer} from "react"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const MyContext=createContext();
//display name
MyContext.displayName="My store"
//reducer
const reducer=(state,action)=>{
    switch(action.type){
        case "USER_LOGIN":
            return {...state,userLogin:action.value};
        case "LOGOUT":
            return {...state,userLogin:null}
        default:
           return new Error("Action not found")
    }
}
//Dinh nghia MyContextControllerProvider
const MyContextControllerProvider=({children})=>{
    //Khoi store
    const initialState={
        userLogin:null,
        services:[],
    }
    const [controller,dispatch]=useReducer(reducer,initialState);
    //phan biet useMemo vs useEffect
    const value=useMemo(()=>[controller,dispatch],[controller,dispatch])
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )

}
//
const useMyContextController=()=>{
    const context=useContext(MyContext)
    if(context==null){
        return new Error("useMyContextController phai dat trong MyContextControllerProvider")
    }
    return context
}
//Tham chieu den collection
const USERS=firestore().collection("USERS")
//Dinh nghia action
const createAccount=(email,password,fullName)=>{
    auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
        Alert.alert("Tao tai khoan thanh cong voi email: "+email)
        USERS.doc(email)
        .set(
            {
                email,
                password,
                fullName
            }
        )
    })
    .catch(e=>console.log(e.message))
}
const login=(dispatch,email,password)=>{
    auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
        USERS.doc(email)
        .onSnapshot(user=>{
            if(user.exists){
                console.log("Dang nhap thanh cong voi: "+user.id)
                dispatch({type:"USER_LOGIN",value:user.data()})
            }
        })
    })
    .catch(e=>Alert.alert("Sai email va password"))
}
const logout=(dispatch)=>{
    auth().signOut()
    .then(()=>{
        dispatch({type:"LOGOUT"})
    })
}

export {
    MyContextControllerProvider,
    useMyContextController,
    createAccount,
    login,
    logout
}