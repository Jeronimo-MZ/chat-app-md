import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/Auth";
import styles from "./../../styles/authPage.module.scss";

type FormData = {
    email: string;
    username: string;
    password: string;
};

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    username: Yup.string()
        .required()
        .min(3)
        .max(25)
        .matches(/^[_]*[0-9]*[a-zA-Z.]+[a-zA-Z0-9_]*$/, "invalid username"),
    password: Yup.string().required().min(8).max(30),
});

const SignUp: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const { signUp } = useAuth();

    const onSubmit = handleSubmit(async (data: FormData) => {
        const { email, password, username } = data;
        try {
            await signUp({ email, password, username });
            toast.success("Account created successfully!", { autoClose: 2000 });
        } catch (error) {
            try {
                if (error.response.status === 403) {
                    toast.error("Username or email already used");
                }
            } catch {
                toast.error("Unexpected Error, please try again!");
            }
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>SignUp</h2>
                <form onSubmit={onSubmit}>
                    <div
                        className={`${styles.inputGroup} ${
                            errors.email && styles.error
                        }`}
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p>
                                <FiAlertCircle />
                                <span>{errors.email.message}</span>
                            </p>
                        )}
                    </div>

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

                    <button type="submit">SignUp</button>
                </form>
                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
