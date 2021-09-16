import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/Auth";
import styles from "./../../styles/authPage.module.scss";

type FormData = {
    username: string;
    password: string;
};

const schema = Yup.object().shape({
    username: Yup.string()
        .required()
        .min(3)
        .max(25)
        .matches(/^[_]*[0-9]*[a-zA-Z.]+[a-zA-Z0-9_]*$/, "invalid username"),
    password: Yup.string().required().min(8).max(30),
});

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const { signIn } = useAuth();

    const onSubmit = handleSubmit(async (data: FormData) => {
        const { password, username } = data;
        try {
            await signIn({ password, username });
            toast.success("Logged in successfully!", { autoClose: 2000 });
        } catch (error) {
            try {
                if (error.response.status === 403) {
                    toast.error("Invalid credentials");
                }
            } catch {
                toast.error("Unexpected Error, please try again!");
            }
        }
    });
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div
                        className={`${styles.inputGroup} ${
                            errors.username && styles.error
                        }`}
                    >
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="username"
                            {...register("username")}
                        />
                        {errors.username && (
                            <p>
                                <FiAlertCircle />
                                <span>{errors.username.message}</span>
                            </p>
                        )}
                    </div>

                    <div
                        className={`${styles.inputGroup} ${
                            errors.password && styles.error
                        }`}
                    >
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p>
                                <FiAlertCircle />
                                <span>{errors.password.message}</span>
                            </p>
                        )}
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Not registered yet?{" "}
                    <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
