"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { UserAuthForm } from "@/components/UserAuthForm";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { login } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
// import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // api
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { toast } = useToast();
  // const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    // setErrorMessage(null); // Reset any previous error
    try {
      const response = await login({ email: email, password: password });
      if (response.success) {
        // Handle successful login, e.g., redirect to a different page
        // console.log("Login successful:", response.data);
        window.location.href = '/show/all';
        // router.push('/show/all');
      } else {
        // Display error message
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
    } catch (error) {
      // setErrorMessage("An unexpected error occurred." + error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred." + error,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster />

      <div className="relative h-[100dvh] py-10 lg:py-0 flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0">
        <div className="relative hidden lg:block h-full w-full flex-col bg-muted p-10 text-white dark:border-r">
          <div
            className="absolute hidden lg:block inset-0 bg-[url('/47-1.png')] bg-no-repeat bg-center bg-cover"
            aria-hidden="true"
          />
        </div>
        <div className="lg:p-8 h-full flex justify-center items-center">
          <div className="mx-auto flex w-[290px] flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back <span className="text-3xl">👋🏻</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            {/* /////// form //////// */}
            <div className="grid gap-4">
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <div className="grid gap-3">
                    <div>
                      <Label className="" htmlFor="email">
                        Email
                      </Label>
                      <Input
                        required
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="" htmlFor="password">
                        Password
                      </Label>
                      <Input
                        required
                        id="password"
                        placeholder="*********"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="mt-4" disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Login
                  </Button>
                </div>
                {/* {errorMessage && (
                  <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                )} */}
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or if you don't have an account
                  </span>
                </div>
              </div>
              <Button variant="outline" type="button" disabled={isLoading}>
                <Link href="/auth/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
