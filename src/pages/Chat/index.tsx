import React from "react";
import { Sidebar } from "../../components/Sidebar";
import styles from "./styles.module.scss";
import { CurrentConversation } from "../../components/CurrentConversation";

const Chat: React.FC = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <main>
                <CurrentConversation />
            </main>
        </div>
    );
};

export default Chat;
