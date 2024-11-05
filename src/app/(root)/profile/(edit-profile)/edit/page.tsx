"use client";
import { Container } from "@/components/Container";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";
import { LoaderCircle } from "lucide-react";

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

const profileFormSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z
    .string()
    .regex(/^(\+20|0)?1[0-9]{9}$/, "Invalid Egyptian phone number"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsProfilePage() {
  const [loading, setLoading] = useState(true); // Loading state
  const [user, setUser] = useState<user | null>(null); // State for user profile
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      userName: "Your Profile Name",
      email: "Your Email Address",
      phone: "Your Phone Number",
    },
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;
  // api
  useEffect(() => {
    const getProfile = async () => {
      const response = await fetchProfile();
      if (response.success) {
        setUser(response.user); // Set user data from API
        reset({
          userName: response.user?.name || "Your Profile Name",
          email: response.user?.email || "Your Email Address",
          phone: response.user?.phone || "Your Phone Number",
        });
        setLoading(false); // Set loading to false
      } else {
        // setError(response.message); // Set error message
        console.log("Profile error: " + response.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
      // setLoading(false); // Set loading to false
    };

    getProfile();
  }, [reset]);
  // end api

  function onSubmit(data: ProfileFormValues) {
    console.log("Submitted data:", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      {loading ? (
        <LoaderCircle className="mx-auto animate-spin size-10" />
      ) : (
        <Container>
          <Toaster />
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome:{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                  {user?.name}
                </span>{" "}
                to your Profile edit
              </h1>
              {/* <h3 className="text-lg font-medium">Profile</h3> */}
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Separator />
            {/* <ProfileForm /> */}
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Profile Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real
                        name or a pseudonym. You can only change this once every
                        30 days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Email Address" {...field} />
                      </FormControl>
                      <FormDescription>
                        You can manage verified email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Phone Number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please enter your phone number in the format
                        +20XXXXXXXXXX.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid} type="submit">
                  Update profile
                </Button>
              </form>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
}
