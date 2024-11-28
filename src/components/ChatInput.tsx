import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        onSendMessage(message);
        setMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault(); // フォーム送信を防ぐ
            onSendMessage(message);
            setMessage("");
        }
    };


    return (
        <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
            <TextField
                onChange={handleChange}
                onKeyDown={handleKeyPress} // リターンキーで送信

                value={message}
                label="Message"
                variant="outlined"
                fullWidth
            />
            <IconButton onClick={handleSend}>
                <ChevronRightIcon />
            </IconButton>
        </div>
    );
}
