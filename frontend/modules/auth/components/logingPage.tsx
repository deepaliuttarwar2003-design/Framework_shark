
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "../Api/userApiSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser, { isLoading }] = useLoginUserMutation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await loginUser({
                email,
                password,
            }).unwrap();

            if (res?.token) {
                localStorage.setItem("token", res.token);
            }

            alert("Login Successful");

            router.push("/");
        } catch (error: any) {
            console.error(error);

            alert(
                error?.data?.message ||
                "Invalid email or password"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white">
                <CardHeader className="pb-6">
                    <CardTitle className="text-center text-3xl font-bold">
                        Login
                    </CardTitle>

                    <p className="text-center text-sm text-muted-foreground">
                        Sign in to continue
                    </p>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email Address
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="h-12"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="h-12"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading
                                ? "Logging in..."
                                : "Login"}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/auth/registerPage")
                                }
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                Create New Account
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

