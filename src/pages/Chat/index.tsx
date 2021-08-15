import React from "react";
import { useAuth } from "../../hooks/Auth";

const Chat: React.FC = () => {
    const { user, signOut } = useAuth();
    return (
        <div>
            <h1>Chat</h1>
            <h3>{JSON.stringify(user)}</h3>
            <button onClick={signOut}>Logout</button>
        </div>
    );
};

export default Chat;
