import React from "react";
import { FiHash, FiSend } from "react-icons/fi";

import styles from "./styles.module.scss";
import placeholderImg from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { IChat } from "../../pages/Chat";

interface FormData {
    message: string;
}

interface Message {
    content: string;
    id: string;
    author_name: string;
    author_img: string;
    sentByUser: boolean;
    createdAt: Date;
}

export const CurrentConversation: React.FC<{ chat: IChat }> = ({ chat }) => {
    const { user } = useAuth();
    const chatName = chat.name;
    const [messages, setMessages] = useState<Message[]>([
        {
            author_img: "",
            author_name: "James Gosling",
            content: "Hey!",
            id: "FakeId",
            sentByUser: false,
            createdAt: new Date(),
        },
        {
            author_img: "",
            author_name: "James Gosling",
            content: "Do you like Java?",
            id: "FakeId2",
            sentByUser: false,
            createdAt: new Date(),
        },
    ]);
    const { register, handleSubmit, reset } = useForm<FormData>();

    const handleSendMessage = handleSubmit((data) => {
        const { message } = data;

        if (message && message.length >= 1) {
            const newMessage: Message = {
                author_img: placeholderImg,
                author_name: user.name,
                content: message.trim(),
                id: `${Math.random()} ${user._id}`,
                sentByUser: true,
                createdAt: new Date(),
            };

            setMessages([...messages, newMessage]);
            reset();
            const messagesContainer = document.querySelector("#messages");
            messagesContainer?.scroll({
                behavior: "smooth",
                top: messagesContainer.scrollHeight,
            });
        }
    });

    const formatDate = (date: Date) => {
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
                            key={message.id}
                            className={`${styles.message} ${
                                message.sentByUser
                                    ? styles.sent
                                    : styles.received
                            }`}
                        >
                            <figure>
                                <img
                                    src={message.author_img}
                                    srcSet={placeholderImg}
                                    alt={message.author_name}
                                />
                            </figure>
                            <div>
                                <p>
                                    <strong>{message.author_name}</strong>
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
