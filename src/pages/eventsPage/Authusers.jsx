import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Authusers() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signinEmail, setSigninEmail] = useState("");
    const [signinPassword, setSigninPassword] = useState("");
    const [attendeeName, setAttendeeName] = useState(""); // Changed from organizerName
    const [error, setError] = useState(""); // To display error messages
    const navigate = useNavigate();

    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const cred = {
                email: loginEmail,
                password: loginPassword,
            };
            const response = await axios.post("http://localhost:8080/attendee/login", cred);
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
    // Function to handle sign-up
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const response = await axios.post("http://localhost:8080/attendee/register", {
                name: attendeeName,
                email: signinEmail,
                password: signinPassword,
            });

            if (response.status === 201 || response.status === 200) { // Check if the sign-up was successful
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
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="loginEmail"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="loginPassword"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                required
                            />
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
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div>
                            <label htmlFor="attendeeName" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="attendeeName"
                                type="text"
                                value={attendeeName}
                                onChange={(e) => setAttendeeName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Karan"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="signinEmail" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="signinEmail"
                                type="email"
                                value={signinEmail}
                                onChange={(e) => setSigninEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="signinPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="signinPassword"
                                type="password"
                                value={signinPassword}
                                onChange={(e) => setSigninPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                required
                            />
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
