"use client";

import React, { useEffect, useState } from "react";
import { Container } from "./Container";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile, logout } from "@/lib/api";

interface NavbarProps {
  className?: string;
}

interface user {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  boards: Board[]; // Array of Board objects (defined later)
  profile_picture?: string; // Optional user profile picture URL (replace with the actual field name if available)
}

interface Board {
  Board_id: string;
  name: string;
  image_url: string;
  description: string;
  price: string;
  created_at: string;
}

export const Navbar = (props: NavbarProps) => {
  const [user, setUser] = useState<user | null>(null); // State for user profile
  const { toast } = useToast();
  // const [open, setOpen] = useState(true); // Assume this controls the AlertDialog open state

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetchProfile();
      if (response.success) {
        setUser(response.user); // Set user data from API
      } else {
        // setError(response.message); // Set error message
        console.log("navbar error: " + response.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
      // setLoading(false); // Set loading to false
    };

    getProfile();
  }, []);

  const handleLogout = () => {
    logout(); // Your logout function
    // setOpen(false); // Close the dialog
    // router.push("/"); // Redirect to the home page
    window.location.href = "/"; // Navigate and refresh
  };

  return (
    <>
      <nav
        className={cn(
          "sticky z-[100] py-4 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all",
          props.className
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex z-40 font-semibold text-lg">
              Our<span className="text-myMedBlue">Website</span>
            </Link>
            <div className="h-full flex items-center space-x-3">
              {user ? (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className={buttonVariants({
                        variant: "ghost",

                        className: "",
                      })}
                    >
                      Sign out
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} asChild>
                          <button className="dialog-button">Continue</button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* {isAdin ? (
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    variant: "ghost",
                    
                    className:"",
                  })}
                >
                  Dashborad ✨
                </Link>
              ) : null} */}
                  <Link
                    href="/show/all"
                    className={buttonVariants({
                      variant: "default",

                      className: " hidden sm:flex items-center gap-1",
                    })}
                  >
                    Browse us
                  </Link>

                  <Avatar className="size-10">
                    <Link href="/profile">
                      <AvatarImage
                        className="object-cover"
                        src={
                          user?.profile_picture ??
                          "https://i.pinimg.com/236x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg"
                        }
                        alt={user?.name + " image"}
                        title={user?.name + " image"}
                      />
                      <AvatarFallback>
                        <Skeleton className="size-10 rounded-full bg-zinc-200" />
                      </AvatarFallback>
                      {/* <AvatarFallback>{userName}</AvatarFallback> */}
                    </Link>
                  </Avatar>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className={buttonVariants({
                      variant: "ghost",

                      className: "",
                    })}
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/auth/login"
                    className={buttonVariants({
                      variant: "ghost",

                      className: "",
                    })}
                  >
                    Login{" "}
                  </Link>
                  <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                  <Link
                    href="/show/all"
                    className={buttonVariants({
                      variant: "default",

                      className: " hidden sm:flex items-center gap-1 ",
                    })}
                  >
                    Browse us
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};
