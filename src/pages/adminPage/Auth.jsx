import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";


function Auth() {
    const { register, handleSubmit } = useForm();
    const navigate = Navigate();
    // Function to handle login
    const handleLogin = async (data) => {
        try {
            //restful api call to attendee DB to check for login 
            const response = await axios.post("https://your-backend-url.com/api/login", {
                email: data.loginEmail,
                password: data.loginPassword,
            });


            const token = response.data.token;


            localStorage.setItem("jwtToken", token);
            navigate("/events")
            console.log("Logged in successfully");

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    // Function to handle sign-up
    const handleSignUp = async (data) => {
        try {
            //restful api to attendee DB for sign in purpose
            const response = await axios.post("https://your-backend-url.com/api/signup", {
                email: data.signinEmail,
                password: data.signinPassword,
            });

            // Assume the token is in response.data.token
            const token = response.data.token;

            // Store the JWT token
            localStorage.setItem("jwtToken", token);

            console.log("Signed up successfully");
            navigate("/events")
        } catch (error) {
            console.error("Sign-up error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Tabs defaultValue="account" className="w-[400px] m-20">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Log In</TabsTrigger>
                    <TabsTrigger value="password">Sign In</TabsTrigger>
                </TabsList>

                {/* Log In Tab */}
                <TabsContent value="account">
                    <form onSubmit={handleSubmit(handleLogin)}> {/* Add form submission handler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Log In</CardTitle>
                                <CardDescription>Start booking</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="loginEmail">Email</Label>
                                    <Input
                                        id="loginEmail"
                                        type="email"
                                        {...register("loginEmail", { required: true })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="loginPassword">Password</Label>
                                    <Input
                                        id="loginPassword"
                                        type="password"
                                        {...register("loginPassword", { required: true })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Login</Button> {/* Set button type to submit */}
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                {/* Sign In Tab */}
                <TabsContent value="password">
                    <form onSubmit={handleSubmit(handleSignUp)}> {/* Add form submission handler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign In</CardTitle>
                                <CardDescription>Create your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="signinEmail">Email</Label>
                                    <Input
                                        id="signinEmail"
                                        type="email"
                                        {...register("signinEmail", { required: true })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="signinPassword">Password</Label>
                                    <Input
                                        id="signinPassword"
                                        type="password"
                                        {...register("signinPassword", { required: true })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Sign In</Button> {/* Set button type to submit */}
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Auth;
