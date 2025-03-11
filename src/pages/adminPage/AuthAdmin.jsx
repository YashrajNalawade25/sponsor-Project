import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AuthAdmin() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
    const navigate = useNavigate();

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm();

    const {
        register: registerSignUp,
        handleSubmit: handleSignUpSubmit,
        formState: { errors: signUpErrors },
    } = useForm();

    // Function to handle login
    const handleLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/organizer/login", data);
            const token = response.data;
            console.log(token);
            localStorage.setItem("jwtToken", token);
            navigate("/admin");
            console.log("Logged in successfully");
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    // Function to handle sign-up
    const handleSignUp = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/organizer/register", data);

            if (response.status === 201 || response.status === 200) {
                console.log("Signed up successfully");
                setIsLogin(true); // Switch to the login form after sign-up
            }
        } catch (error) {
            console.error("Sign-up error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-md">
                <div className="flex justify-around">
                    <button
                        className={`text-gray-500 font-semibold focus:outline-none ${isLogin ? "text-indigo-600" : ""}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Log In
                    </button>
                    <button
                        className={`text-gray-500 font-semibold focus:outline-none ${!isLogin ? "text-indigo-600" : ""}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Conditionally render either the login or sign-up form */}
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-6">
                        <div>
                            <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="loginEmail"
                                type="email"
                                {...registerLogin("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                        message: "Enter a valid @gmail.com email address",
                                    },
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                            {loginErrors.email && <p className="text-red-500">{loginErrors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="loginPassword"
                                type="password"
                                {...registerLogin("password", {
                                    required: "Password is required",
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            {loginErrors.password && <p className="text-red-500">{loginErrors.password.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSignUpSubmit(handleSignUp)} className="space-y-6">
                        <div>
                            <label htmlFor="organizername" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="organizername"
                                type="text"
                                {...registerSignUp("name", { required: "Name is required" })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Karan"
                            />
                            {signUpErrors.name && <p className="text-red-500">{signUpErrors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="signinEmail" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="signinEmail"
                                type="email"
                                {...registerSignUp("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                            {signUpErrors.email && <p className="text-red-500">{signUpErrors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="signinPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="signinPassword"
                                type="password"
                                {...registerSignUp("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            {signUpErrors.password && <p className="text-red-500">{signUpErrors.password.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthAdmin;
