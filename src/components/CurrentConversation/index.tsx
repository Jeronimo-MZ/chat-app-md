import React from "react";
import { FiHash, FiSend } from "react-icons/fi";

import styles from "./styles.module.scss";
import placeholderImg from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";
import { api } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

interface FormData {
    message: string;
}

interface IMessage {
    author: {
        _id: string;
        username: string;
        email: string;
    };
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export const CurrentConversation: React.FC = () => {
    const { user, token } = useAuth();
    const [messages, setMessages] = useState<IMessage[]>([]);

    const chatName = user.username;
    const { register, handleSubmit, reset } = useForm<FormData>();

    const handleSendMessage = handleSubmit((data) => {
        let { message } = data;
        message = message.trim();
        if (message && message.length >= 1) {
            reset();
            api.post(
                "/chat/messages",
                {
                    content: message,
                },
                { headers: { authorization: `${token}` } }
            );
        }
    });

    const scrollToBottom = () => {
        const messagesContainer = document.querySelector("#messages");
        messagesContainer?.scroll({
            behavior: "smooth",
            top: messagesContainer.scrollHeight,
        });
    };

    useEffect(() => {
        api.get("/chat/messages", {
            headers: { authorization: `${token}` },
        }).then((response) => {
            setMessages(response.data.messages || []);
            scrollToBottom();
        });

        const socket = io("http://localhost:3333");
        socket.emit("joinChat", token);

        socket.on("new_message", ({ message }) => {
            setMessages((messages) => [...messages, message]);
            scrollToBottom();
        });
        return () => {
            socket.disconnect();
        };
    }, [token]);

    const formatDate = (date: Date) => {
        date = new Date(date);
        return `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`;
    };

    return (
        <div className={styles.container}>
            <header>
                <h3 className={styles.chatName}>
                    <FiHash />
                    <span>{chatName}</span>
                </h3>
            </header>
            <div className={styles.messages} id="messages">
                <ul>
                    {messages.map((message, index) => (
                        <li
                            key={message._id}
                            className={`${styles.message} ${
                                message.author._id === user._id
                                    ? styles.sent
                                    : styles.received
                            }`}
                        >
                            <figure>
                                <img srcSet={placeholderImg} alt={chatName} />
                            </figure>
                            <div>
                                <p>
                                    <strong>{message.author.username}</strong>
                                    <span>{formatDate(message.createdAt)}</span>
                                </p>
                                <p>{message.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <footer>
                <form onSubmit={handleSendMessage}>
                    <input
                        autoComplete="off"
                        type="text"
                        {...register("message")}
                    />
                    <button title="send message">
                        <FiSend />
                    </button>
                </form>
            </footer>
        </div>
    );
};
