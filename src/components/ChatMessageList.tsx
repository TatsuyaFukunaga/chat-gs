import React from "react";
import { Message } from "./Message";

interface ChatMessageListProps {
    messages: Message[];
    currentUserId: string | null;
}

export default function ChatMessageList({ messages, currentUserId }: ChatMessageListProps) {
    return (
        <div>
            {messages.map((message, index) =>
                messages[messages.length - index - 1].getMessage(currentUserId || "")
            )}
        </div>
    );
}
