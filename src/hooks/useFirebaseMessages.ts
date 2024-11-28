import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Message } from "../components/Message";

export default function useFirebaseMessages(user: any) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const messagesRef = ref(db, "chat");
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages: Message[] = [];
            for (const id in data) {
                const msg = data[id];
                loadedMessages.push(
                    new Message(id, msg.photoURL, msg.uname, msg.date, msg.txt, msg.userId)
                );
            }
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, [user]);

    return messages;
}
