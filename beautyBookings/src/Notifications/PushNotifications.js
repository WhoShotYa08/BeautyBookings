import { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Platform, ScrollView, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { db } from "../components/db/firebase_";
import { UserContext } from "../components/context/user";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Arrow from "react-native-vector-icons/AntDesign";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { user } = useContext(UserContext);
  const uid = user["uid"];
  const [app, setApp] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "Appointments"), where("businessId", "==", uid));
    const initialData = [];

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const appointmentData = doc.data();
        const appointmentId = doc.id;
        initialData.push({ id: appointmentId, ...appointmentData });
      });

      setApp(initialData);
    });
  }, [uid]);

  useEffect(() => {
    const q = query(collection(db, "Appointments"), where("businessId", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const appointmentData = change.doc.data();
        const appointmentId = change.doc.id;

        if (change.type === "added") {
          displayData(appointmentData);

          // Check if the appointment date is in the future
          const appointmentDate = new Date(appointmentData.date_.toDate()); // Convert Firestore timestamp to JavaScript Date
          const currentDate = new Date();

          if (appointmentDate > currentDate) {
            const existingItemIndex = app.findIndex((item) => item.id === appointmentId);

            if (existingItemIndex === -1) {
              setApp((prevApp) => [...prevApp, { id: appointmentId, ...appointmentData }]);

              // Add the appointment to the upcomingAppointments state
              setUpcomingAppointments((prevUpcoming) => [...prevUpcoming, { id: appointmentId, ...appointmentData }]);

              schedulePushNotification();
            } else {
              setApp((prevApp) => {
                const updatedApp = [...prevApp];
                updatedApp[existingItemIndex] = { id: appointmentId, ...appointmentData };
                return updatedApp;
              });
            }
          }
        }
      });
    });

    return unsubscribe;
  }, [uid]);



  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#7491A0" }}
    >
      {/* <Text>Your expo push token: {expoPushToken}</Text> */}
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", marginTop: 5, justifyContent: "center", alignContent: "center" }}>Appointments</Text>
      {
        upcomingAppointments.map((item, index) => {
          return (

            <View style={{ backgroundColor: "wheat", marginVertical: 5, paddingVertical: 10, borderRadius: 12, justifyContent: "center", alignSelf: "center", width: "90%", opacity: 0.7 }} key={index}>

              <View style={{ marginTop: 10, opacity: 1 }}>
                <Text style={{ textAlign: "center" }}>Name: {item.name}</Text>
                <Text style={{ textAlign: "center" }}>Surname: {item.surname}</Text>
                <Text style={{ textAlign: "center" }}>Cell: {item.cell}</Text>
                <Text style={{ textAlign: "center" }}>Date: {formatDate(item.date_)}</Text>
              </View>
            </View>

          )
        })
      }
      <View style={{ backgroundColor: "grey", width: 5 }}></View>
    </ScrollView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Appointment📬",
      body: `A client has booked an appointment`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use a physical device for Push Notifications');
  }

  return token;
}

function formatDate(date_) {
  const nanoseconds = date_.nanoseconds;
  const seconds = date_.seconds;
  const milliseconds = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(milliseconds);
  return date.toISOString();
}

function displayData(data) {
  console.log("Data before adding to app:", data);
}

