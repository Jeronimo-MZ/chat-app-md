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
    name: string;
}

export interface User {
    _id: string;
    username: string;
    name: string;
    profilePicture?: string;
    contacts: string[];
    bio?: string;
    online: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthContextData {
    signUp(data: SignUpData): Promise<void>;
    signIn(data: SignInData): Promise<void>;
    signOut(): Promise<void>;
    user: User;
    isAuthenticated: boolean;
    hasLoaded: boolean;
}

const mapUser = (user: User): User => ({
    _id: user._id,
    username: user.username,
    active: user.active,
    contacts: user.contacts,
    bio: user.bio,
    online: user.online,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    profilePicture: user.profilePicture,
    name: user.name,
});

const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>(null as unknown as User);
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    const signUp = useCallback(
        async ({ username, name, password }: SignUpData) => {
            await api
                .post<{ user: User; token: string }>("/users", {
                    username,
                    name,
                    password,
                })
                .then((response) => {
                    localStorage.setItem("@chat:token", response.data.token);
                    setUser(mapUser(response.data.user));
                });
        },
        []
    );

    const signIn = useCallback(async ({ username, password }: SignInData) => {
        await api
            .post<{ user: User; token: string }>("/sessions", {
                username,
                password,
            })
            .then((response) => {
                localStorage.setItem("@chat:token", response.data.token);
                setUser(mapUser(response.data.user));
            });
    }, []);

    const signOut = useCallback(async () => {
        setUser(null as unknown as User);
        setIsAuthenticated(false);
        localStorage.removeItem("@chat:token");
    }, []);

    async function loadUser(token: string) {
        await api
            .get<{ user: User }>("/users/me", {
                headers: { authorization: `BEARER ${token}` },
            })
            .then((response) => {
                setUser(mapUser(response.data.user));
            })
            .catch((error) => {
                console.error(error);
            });
        setHasLoaded(true);
    }

    useEffect(() => {
        const token = localStorage.getItem("@chat:token");
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
