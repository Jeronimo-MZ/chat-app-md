import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";
import placeholder from "../../assets/logo.png";
import { IChat } from "../../pages/Chat";

interface ConversationsProps {
    handleOpenChat: (data: IChat) => void;
}

export const Conversations: React.FC<ConversationsProps> = ({
    handleOpenChat,
}) => {
    const direct = [
        {
            name: "Guido Van Rossum",
            image: placeholder,
        },
        {
            name: "James Gosling",
            image: placeholder,
        },
        {
            name: "Tim Berners-Lee",
            image: placeholder,
        },
        {
            name: "Dennis Ritchie",
            image: placeholder,
        },

        {
            name: "Bjarne Stroustrup",
            image: placeholder,
        },
        {
            name: "Ryan dahl",
            image: placeholder,
        },
        {
            name: "Brendon Eich",
            image: placeholder,
        },
    ];
    const groups = [
        {
            name: "Developers",
            image: placeholder,
        },

        {
            name: "Web Designers",
            image: placeholder,
        },
        {
            name: "UI/UX",
            image: placeholder,
        },

        {
            name: "Boosters",
            image: placeholder,
        },
    ];
    return (
        <div className={styles.container}>
            <header>
                <div className={styles.searchBox}>
                    <label htmlFor="search">
                        <FiSearch />
                    </label>
                    <input id="search" type="text" placeholder="Search" />
                </div>
            </header>
            <main>
                <div className={styles.directMessages}>
                    <h4>Direct Messages</h4>
                    <ul>
                        {direct.map(({ name, image }) => (
                            <li key={`${Math.random()}name`}>
                                <button
                                    onClick={() => handleOpenChat({ name })}
                                >
                                    <img src={image} alt={name} />
                                    <span>{name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.groupMessages}>
                    <h4>Group Messages</h4>
                    <ul>
                        {groups.map(({ name, image }) => (
                            <li key={`${Math.random()}name`}>
                                <button>
                                    <img src={image} alt={name} />
                                    <span>{name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};
