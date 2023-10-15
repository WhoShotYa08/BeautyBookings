import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Incoming from '../Chat/Incoming';
import Outgoing from '../Chat/Outgoing';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../components/db/firebase_';
import UserContext from "../components/context/user";

const ChatBox = ({navigation}) => {
  const [msg, setMsg] = useState('');
  const user = useContext(UserContext);
  const SendData = async () => {
    await setDoc(doc(db, "Chat", user), {
      msg: msg
    });
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View style={{ justifyContent: 'flex-start' }}>
        <Incoming />
        <Outgoing />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          placeholder=" Type a message"
          onChangeText={(msg) => setMsg(msg)}
          style={chatStyles.input}
        />
        <TouchableOpacity style={chatStyles.send} >
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
