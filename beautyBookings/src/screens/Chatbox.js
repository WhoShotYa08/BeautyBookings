import React, { useState, useContext,  useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { db } from '../components/db/firebase_';
import { UserContext } from '../components/context/user';
import { collection, query,  onSnapshot, orderBy, setDoc, doc, updateDoc,  arrayUnion } from "firebase/firestore";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const ChatBox = ({  route }) => {

  const user = useContext(UserContext);

  let user_id = user['user'].uid;
  let business_id = route?.params;

  let userId = ""
  let businessId = "";

  if (user.user.userType) {
    userId = user_id;
    businessId = business_id
  } else {
    userId = business_id
    businessId = user_id
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `/chat/${businessId}/${userId}`), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ text: doc.data().message, _id: doc.id, user: { _id: doc.data().from }, createdAt: doc.data().createdAt });
      });
      setMessages(messages);
    });

    return () => unsubscribe()

  }, [])

  const sendMessage = async (message) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, `/chat/${businessId}/${userId}`, message[message.length - 1]._id), {
      createdAt: Date(message[message.length - 1].createdAt),
      message: message[message.length - 1].text,
      from: message[message.length - 1].user._id
    });

    if (user.user.userType) {
      const salonRef = doc(db, `/salonDetails/${businessId}`);
      await updateDoc(salonRef, {
        messages: arrayUnion(user_id)
      });
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <GiftedChat
        messages={messages}
        user={{
          _id: user_id,
        }}
        showAvatarForEveryMessage={false}
        renderAvatar={null}
        onSend={sendMessage}
      />
    </View>
  );
};

export default ChatBox;
