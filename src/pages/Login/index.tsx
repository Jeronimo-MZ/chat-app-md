import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Login: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Login</h2>
                <form action="">
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="username"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Doesn't have an account yet?{" "}
                    <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
