import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { api } from "../services/api";

interface SignInData {
    username: string;
    password: string;
}

interface SignUpData extends SignInData {
    email: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthContextData {
    signUp(data: SignUpData): Promise<void>;
    signIn(data: SignInData): Promise<void>;
    signOut(): Promise<void>;
    user: User;
    token: string;
    isAuthenticated: boolean;
    hasLoaded: boolean;
    users: User[];
}

const mapUser = (user: User): User => ({
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>(null as unknown as User);
    const [users, setUsers] = useState<User[]>([]);
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    const signUp = useCallback(
        async ({ username, email, password }: SignUpData) => {
            await api
                .post<{ user: User; token: string }>("/signup", {
                    username,
                    email,
                    password,
                })
                .then((response) => {
                    localStorage.setItem("@md_chat:token", response.data.token);
                    setToken(response.data.token);

                    setUser(mapUser(response.data.user));
                });
        },
        []
    );

    const signIn = useCallback(async ({ username, password }: SignInData) => {
        await api
            .post<{ user: User; token: string }>("/login", {
                username,
                password,
            })
            .then((response) => {
                setToken(response.data.token);
                localStorage.setItem("@md_chat:token", response.data.token);
                setUser(mapUser(response.data.user));
            });
    }, []);

    const signOut = useCallback(async () => {
        setUser(null as unknown as User);
        setIsAuthenticated(false);
        localStorage.removeItem("@md_chat:token");
        setToken("");
    }, []);

    async function loadUser(token: string) {
        await api
            .get<{ user: User }>("/users/me", {
                headers: { authorization: `${token}` },
            })
            .then((response) => {
                setToken(token);
                setUser(mapUser(response.data.user));
            })
            .catch((error) => {
                console.error(error);
            });
        await api
            .get<{ users: User[] }>("/users", {
                headers: { authorization: `${token}` },
            })
            .then((response) => {
                setUsers(response.data.users.map(mapUser));
            })
            .catch((error) => {
                console.error(error);
            });

        setHasLoaded(true);
    }

    useEffect(() => {
        const token = localStorage.getItem("@md_chat:token");
        if (token) {
            loadUser(token);
        } else {
            setHasLoaded(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                user,
                isAuthenticated,
                hasLoaded,
                signOut,
                users,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be in a AuthContextProvider");
    }
    return context;
};
