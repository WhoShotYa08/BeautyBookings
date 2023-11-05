import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, createContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { doLogIn, doSignUp } from "./minddlewares/auth";
import { FirebaseError } from "firebase/app";
import { addUser, getUser } from "./minddlewares/user";
import { FirestoreError } from "firebase/firestore";
import {sendEmail} from "./db/email";
import Btn from "./Btn";
import { loginWithCredentials, getUserDetails } from "./db/firebase_";



// export const generateOtp = () => {
//     otp = Math.floor(1000 * Math.random() * 9999) + 1;
//     return otp;
// }

export const generateOtp = () => {
    otp = Math.floor(Math.random() * (999999 - 100000) ) + 100000;
    
    return otp
};

export const verifiedContext = createContext();

const SignUp = () => {
    
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cellNo, setCellNo] = useState("");
    const [verified, setVerified] = useState(false)
    //recent changes



    const signUpHandle = async () => {

        //Form validation name
        //include sendEmail function 
        

        const results = await doSignUp(email, password);
    
            if (results instanceof FirebaseError) {
                return ToastAndroid.showWithGravity(results.message, ToastAndroid.SHORT, ToastAndroid.TOP)
            }

            navigation.navigate("OTP", {
                names: name,
                emails: email
            });

            
            const userResults = await addUser(results.user.uid, {name, surname, cellNo, email, password, verified, userType: "client"})
            sendEmail(email, generateOtp(), name);
            if (userResults instanceof FirestoreError) {
                return ToastAndroid.showWithGravity(results.message, ToastAndroid.SHORT, ToastAndroid.TOP)
            }
    
            //recent changes
            
    }

    const [view, SetView] = useState(true);
    const [see, setSee] = useState(true);

    const pic = view? 'eye' : 'eye-slash';
    const icon = see? 'eye' : 'eye-slash';

    return (

            <View style={styles.main}>
                
                <Element 
                    icon={""} 
                    placeHolder={"Name"} 
                    onChangeText={(clientName) => setName(clientName)} 
                    value={name} 
                    view={false}
                />

                <Element 
                    icon={""} 
                    placeHolder={"Surname"}
                    onChangeText={(clientSurame) => setSurname(clientSurame)} 
                    value={surname} 
                    view={false}
                />

                <Element 
                    icon={""} 
                    placeHolder={"Contact"} 
                    onChangeText={(cellNoText) => setCellNo(cellNoText)} 
                    value={cellNo} 
                    view={false}
                />

                <Element 
                    icon={""} 
                    placeHolder={"Email"} 
                    onChangeText={(emailText) => setEmail(emailText)} 
                    value={email}
                    view={false}
                    />
                <Element 
                    icon={pic} 
                    placeHolder={"Password"} 
                    onChangeText={(passwordText) => setPassword(passwordText)} 
                    value={password} 
                    view={view}
                    func={()=>SetView(!view)}
                />
                <Element 
                    icon={icon} 
                    placeHolder={"Confirm Password"} 
                    onChangeText={(confirmPasswordText) => setConfirmPassword(confirmPasswordText)} 
                    value={confirmPassword} 
                    view={see}
                    func={()=>setSee(!see)}
                />
                
                <Btn text={'Sign Up'} func={signUpHandle}/>
            </View>
    )
}

const Login = () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleClientSide = async () => {
        
        const user = await loginWithCredentials(email, password);
      
        if (user instanceof Error) {
          ToastAndroid.showWithGravity(user.message, ToastAndroid.SHORT, ToastAndroid.TOP);
        } else {
          const userDetails = await getUserDetails(user.id);
          if (userDetails) {
            navigation.navigate('TabNav');
          } else {
            ToastAndroid.showWithGravity("User Credentials Not Found.", ToastAndroid.SHORT, ToastAndroid.TOP);
          }
        }
      }

    const signInHandle = async () => {

        //Form validation name
        
        const results = await doLogIn(email, password);

       
//  console.log(results);
        if (results instanceof FirebaseError) {
            return ToastAndroid.showWithGravity(results.message, ToastAndroid.SHORT, ToastAndroid.TOP)
        }

        const userResults = await getUser(results.user.uid)
        
        if (userResults instanceof FirestoreError) {
            return ToastAndroid.showWithGravity(results.message, ToastAndroid.SHORT, ToastAndroid.TOP)
        }
    }

    const [show, setShow] = useState(true);
    const icon = show? 'eye' : 'eye-slash';

    return (
        <View style={styles.main}>
            <Element 
                icon={""} 
                placeHolder={"Email"} 
                onChangeText={(emailText) => setEmail(emailText)} value={email} 
                view={false}
            />

            <Element 
                icon={icon} 
                placeHolder={"Password"} 
                onChangeText={(passwordText) => setPassword(passwordText)} 
                value={password} 
                func={()=>{setShow(!show)}} 
                view={show}
            />

            <Btn text={'Login'} func={signInHandle}/>
        </View>
    )
}

export const Element = ({ icon, placeHolder, onChangeText, value, func, view }) => {

    return (
        <View style={{
            flexDirection: 'row', 
            justifyContent:'space-between', 
            alignItems: 'center', 
            padding: 7, 
            borderWidth: 1, 
            borderRadius: 7,
            marginVertical: 7
         
        }}>
            <TextInput
                placeholder={placeHolder}
                style={{flex: 1}}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={view}
            />

            <TouchableOpacity onPress={func}>
                <Icon name={icon} backgroundColor="#fff" size={20} />
            </TouchableOpacity>

        </View>);
}




export default function Toggle() {
    const [active, setActive] = useState(true);

    const Pages = ({ selected, text }) => {

        backgroundColor = selected ? "#7434A4" : "#fff";
        color = selected ? "white" : 'black';
        fontWeight = selected ? "bold" : 'light';
        shadowTime = selected ? styles.shadow : '';

        return (
            <TouchableOpacity style={[styles.tgStyle, { backgroundColor }, shadowTime]} onPress={() => setActive(!active)}>
                <Text style={[styles.text, { color, fontWeight }]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={[styles.toggle]}>
                <Pages selected={active} text={"Login"} />
                <Pages selected={!active} text={"Sign Up"} />
            </View>

            {
                active ? <Login /> : <SignUp />
            }
        </View>


    )
}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    toggle: {
        width: "80%",
        borderWidth: 0.5,
        alignSelf: 'center',
        height: 55,
        borderRadius: 15,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    tgStyle: {
        width: "45%",
        height: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginHorizontal: 7
    },

    text: {
        fontSize: 17,
    },

    input: {
        width: "85%",
        borderWidth: 1,
        padding: 7,
        fontSize: 15,
        borderRadius: 7,
        textAlign: 'center'
    },

    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 7 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})