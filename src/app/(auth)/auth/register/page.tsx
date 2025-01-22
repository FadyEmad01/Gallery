"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { UserAuthForm } from "@/components/UserAuthForm";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";
// import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // api
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  // const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await register({
        email: email,
        password: password,
        name: name,
        phone: phone,
      });
      if (response.success) {
        // Handle successful login, e.g., redirect to a different page`
        window.location.href = '/profile';
        // router.push('/profile');
      } else {
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
                Create an account
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
                      <Label className="" htmlFor="name">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Andy john"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="" htmlFor="phone">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="01111111111"
                        type="tel"
                        autoCapitalize="none"
                        autoComplete="telephone"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="" htmlFor="email">
                        Email
                      </Label>
                      <Input
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
                    Sign In
                  </Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or if you have account
                  </span>
                </div>
              </div>
              <Button variant="outline" type="button" disabled={isLoading}>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
            {/* ////// end form ///// */}
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
