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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";

function Auth() {
    // Use react-hook-form for managing form state
    const { register, handleSubmit } = useForm();

    // Function to handle form submission
    const onSubmit = (data) => {
        console.log(data); // Log the input data
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
                    <form onSubmit={handleSubmit(onSubmit)}> {/* Add form submission handler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Log In</CardTitle>
                                <CardDescription>start booking</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="loginEmail">Email</Label>
                                    <Input id="loginEmail" type="email" {...register("loginEmail")} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="loginPassword">Password</Label>
                                    <Input id="loginPassword" type="password" {...register("loginPassword")} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Login</Button> {/* Set button type to submit */}
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>


                <TabsContent value="password">
                    <form onSubmit={handleSubmit(onSubmit)}> {/* Add form submission handler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign In</CardTitle>
                                <CardDescription>Create your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="signinEmail">Email</Label>
                                    <Input id="signinEmail" type="email" {...register("signinEmail")} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="signinPassword">Password</Label>
                                    <Input id="signinPassword" type="password" {...register("signinPassword")} />
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
