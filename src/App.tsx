import React, { useState } from "react";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatMessageList from "./components/ChatMessageList";
import AlertDialog from "./components/AlertDialog";
import useFirebaseMessages from "./hooks/useFirebaseMessages";
import { db } from "./firebase";
import { ref, push, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  const messages = useFirebaseMessages(user);
  const [alert, setAlert] = useState({ open: false, title: "", message: "" });

  const handleSendMessage = (message: string) => {
    if (user) {
      if (message) {
        const newPostRef = push(ref(db, "chat"));
        set(newPostRef, {
          uname: user.displayName,
          txt: message,
          photoURL: user.photoURL,
          userId: user.email,
          date: new Date().toLocaleString(),
        });
      } else {
        setAlert({ open: true, title: "Empty Message", message: "Message cannot be empty." });
      }
    } else {
      setAlert({ open: true, title: "Not Logged In", message: "Please log in to send messages." });
    }
  };

  return (
    <>
      <Header />
      <ChatInput onSendMessage={handleSendMessage} />
      <ChatMessageList messages={messages} currentUserId={user?.email || null} />
      <AlertDialog
        open={alert.open}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </>
  );
}

export default App;
