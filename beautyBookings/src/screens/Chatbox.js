import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { db } from '../components/db/firebase_';
import { UserContext } from '../components/context/user';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const ChatBox = ({ navigation }) => {
  const user = useContext(UserContext);
  const userId = user['user'].uid;

  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const chatCollection = collection(db, "Chat");
    const q = query(chatCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages = [];
      querySnapshot.forEach((doc) => {
        updatedMessages.push({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: {
            _id: doc.data().user,
          },
        });
      });
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages = []) => {
    const message = newMessages[0];
    try {
      const docRef = await addDoc(collection(db, "Chat"), {
        text: message.text,
        createdAt: new Date(),
        user: userId,
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };


  const renderMessage = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'purple',
        },
      }}
    />
  );

  const clearMessages = async () => {
    setMessages([]);

    const chatCollection = collection(db, "Chat");
    const q = query(chatCollection);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userId,
        }}
        renderMessage={renderMessage}
      />
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
});
