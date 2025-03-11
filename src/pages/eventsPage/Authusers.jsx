import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Authusers() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
    const [error, setError] = useState(""); // To display error messages
    const navigate = useNavigate();

    // React Hook Form setup
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
    } = useForm();

    const {
        register: registerSignUp,
        handleSubmit: handleSubmitSignUp,
        formState: { errors: signupErrors },
    } = useForm();

    // Function to handle login
    const handleLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/attendee/login", data);
            const token = response.data; // Make sure the response has a token field
            localStorage.setItem("jwtToken", token);
            navigate("/events"); // Redirect to events page
            console.log("Logged in successfully");
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    // Function to handle sign-up
    const handleSignUp = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/attendee/register", data);

            if (response.status === 201 || response.status === 200) {
                console.log("Signed up successfully");
                setIsLogin(true); // Switch to the login form after sign-up
            }
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
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

                {/* Display error message */}
                {error && <div className="text-red-500 text-sm">{error}</div>}

                {/* Conditionally render either the login or sign-up form */}
                {isLogin ? (
                    <form onSubmit={handleSubmitLogin(handleLogin)} className="space-y-6">
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
                                placeholder="you@gmail.com"
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
                                {...registerLogin("password", { required: "Password is required" })}
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
                    <form onSubmit={handleSubmitSignUp(handleSignUp)} className="space-y-6">
                        <div>
                            <label htmlFor="attendeeName" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="attendeeName"
                                type="text"
                                {...registerSignUp("name", { required: "Name is required" })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Karan"
                            />
                            {signupErrors.name && <p className="text-red-500">{signupErrors.name.message}</p>}
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
                                        message: "Enter a valid @gmail.com email address",
                                    },
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@gmail.com"
                            />
                            {signupErrors.email && <p className="text-red-500">{signupErrors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="signinPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="signinPassword"
                                type="password"
                                {...registerSignUp("password", { required: "Password is required" })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            {signupErrors.password && <p className="text-red-500">{signupErrors.password.message}</p>}
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

export default Authusers;
