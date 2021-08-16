import React from "react";
import { Sidebar } from "../../components/Sidebar";
import styles from "./styles.module.scss";
import { Conversations } from "../../components/Conversations";
import { CurrentConversation } from "../../components/CurrentConversation";
import { useState } from "react";

export interface IChat {
    name: string;
}

const Chat: React.FC = () => {
    const [chat, setChat] = useState<IChat>({
        name: "James Gosling",
    });
    const handleOpenChat = (chat: IChat) => {
        setChat(chat);
    };
    return (
        <div className={styles.container}>
            <Sidebar />
            <main>
                <Conversations handleOpenChat={handleOpenChat} />
                <CurrentConversation chat={chat} />
            </main>
        </div>
    );
};

export default Chat;
