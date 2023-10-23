import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Incoming from '../Chat/Incoming';
import Outgoing from '../Chat/Outgoing';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../components/db/firebase_';
import { UserContext } from '../components/context/user';
import {
  doc,
  setDoc,
  onSnapshot,
  getDocs,
  collection,
  query,
  where,
  getDoc,
} from 'firebase/firestore';

const ChatBox = ({ navigation }) => {
  const [msg, setMsg] = useState('');
  const user = useContext(UserContext);
  const [incomingMsg, setIncomingMsg] = useState([]);
  const [outgoingMsg, setOutgoingMsg] = useState([]);
  const userId = user['user'].uid;
  const id = userId;
  console.log(id);

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();

  const getUserType = async (id) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (id) {
        await setDoc(doc(db, 'Chat', id), {
          message: msg,
          timeSent: currentTime,
        });
      }
    } else {
      if (id) {
        await setDoc(doc(db, 'Business Chat', id), {
          message: msg,
          timeSent: currentTime,
        });
      }
    }
  };

  const getData = async () => {
    if (userId) {
      const unsub = onSnapshot(doc(db, 'Chat', userId), (doc) => {
        const data = doc.data();
        console.log(data);
        if (data && data.message) {
          setIncomingMsg((prevMessages) => [
            ...prevMessages,
            { message: data.message, timestamp: data.timeSent },
          ]);
        }
      });
    }
  };

  const getBusinessData = async () => {
    const q = query(collection(db, 'Business Side'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
      busID = docs.id;
      if (busID) {
        const unsub = onSnapshot(doc(db, 'Business Chat', busID), (doc) => {
          const data = doc.data();
          if (data && data.message) {
            setOutgoingMsg((prevMessages) => [
              ...prevMessages,
              { message: data.message, timestamp: data.timeSent },
            ]);
          }
        });
      }
    });
  };

  useEffect(() => {
    getData();
    getBusinessData();
  }, []);

  // Merge and sort both incoming and outgoing messages by timestamp
  const mergedMessages = [...incomingMsg, ...outgoingMsg];
  mergedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View style={{ justifyContent: 'flex-start' }}>
        {mergedMessages.map((message, index) => {
          if (incomingMsg.includes(message)) {
            return <Incoming key={index} message={message.message} />;
          } else {
            return <Outgoing key={index} outgoingMsg={message.message} />;
          }
        })}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          placeholder=" Type a message"
          onChangeText={(msg) => setMsg(msg)}
          style={chatStyles.input}
        />
        <TouchableOpacity style={chatStyles.send} onPress={() => getUserType(id)}>
          <MCI name="send" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBox;

const chatStyles = StyleSheet.create({
  input: {
    width: '85%',
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: 1,
    height: 50,
  },
  send: {
    alignSelf: 'center',
  },
});
