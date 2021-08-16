import React from "react";
import {
    FiBarChart,
    FiLogOut,
    FiMessageSquare,
    FiPieChart,
    FiSettings,
    FiUser,
} from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/Auth";
import styles from "./styles.module.scss";

type SidebarLink = {
    name: string;
    route: string;
    Icon: React.FC;
};

export const Sidebar: React.FC = () => {
    const {
        location: { pathname },
    } = useHistory();
    const { signOut } = useAuth();

    const sidebarLinks: SidebarLink[] = [
        {
            name: "Chat",
            route: "/chat",
            Icon: FiMessageSquare,
        },
        {
            name: "placebolder",
            route: "/",
            Icon: FiUser,
        },
        {
            name: "placeholder",
            route: "/",
            Icon: FiPieChart,
        },
        {
            name: "placeholder",
            route: "/",
            Icon: FiBarChart,
        },
        {
            name: "placeholder",
            route: "/",
            Icon: FiSettings,
        },
    ];

    const handleSignOut = () => {
        signOut().then(() => {
            toast.warning("Logged Out Successfully");
        });
    };
    return (
        <aside className={styles.container}>
            <div className={styles.top}>
                <img src={logoImg} alt="logo" />
            </div>
            <div className={styles.center}>
                <nav>
                    <ul>
                        {sidebarLinks.map(({ route, name, Icon }) => (
                            <li
                                key={`${route}${name}${Math.random().toString()}`}
                                title={name}
                                className={
                                    pathname === route ? styles.current : " "
                                }
                            >
                                <Link to={route}>
                                    <Icon />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={styles.bottom}>
                <button title="logout" onClick={handleSignOut}>
                    <FiLogOut />
                </button>
            </div>
        </aside>
    );
};
