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
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { fetchProfile, patchUserProfile } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";
import { ImagePlus, LoaderCircle } from "lucide-react";

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
  image: {
    image_url: string;
    dominant_color: string;
    width: number;
    height: number;
  };
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
  image: z.instanceof(File).optional(), // Optional image field as File
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsProfilePage() {
  const [loading, setLoading] = useState(true); // Loading state
  const [BtnLoading, setBtnLoading] = useState(false); // Loading state
  const [user, setUser] = useState<user | null>(null); // State for user profile
  // const [profilePicture, setProfilePicture] = useState<File | null>(null); // State for profile picture

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
    formState: { isValid, isDirty },
  } = form;

  const { field: imageField } = useController({
    control,
    name: "image",
  });

  // api
  useEffect(() => {
    const getProfile = async () => {
      const response = await fetchProfile();
      if (response.success) {
        setUser(response.user); // Set user data from API
        // console.log(response);
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

  // Handle profile picture change
  // Submit Profile Data
  function handleProfileSubmit(
    formValues: ProfileFormValues
    // profilePicture?: File
  ) {
    const formData = new FormData();
    formData.append("name", formValues.userName);
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);

    if (formValues.image) {
      formData.append("image", formValues.image);
    }
    setBtnLoading(true);

    patchUserProfile(formData)
      .then((response) => {
        if (response.success) {
          console.log(response);
          setBtnLoading(false);
          console.log("Profile updated successfully:", response.data);
          toast({
            title: "Profile Updated",
            description: response.message,
          });
          window.location.href = "/profile";
        } else {
          console.error("Profile update error:", response.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
          setBtnLoading(false);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
        setBtnLoading(false);
      });
  }

  return (
    <>
      {loading ? (
        <LoaderCircle className="mx-auto animate-spin size-10" />
      ) : (
        <>
          <Toaster />
          <Container>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome{" "}
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
                <form
                  onSubmit={handleSubmit(handleProfileSubmit)}
                  className="space-y-8"
                >
                  {/* Profile Picture Upload */}

                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <div className="flex items-center gap-4">
                      <img
                        className="size-36 rounded-full object-cover"
                        // {...(profilePicture
                        //   ? { src: URL.createObjectURL(profilePicture) }
                        //   : { src: user?.profile_picture })}
                        // src={user?.profile_picture}
                        src={
                          imageField.value
                            ? URL.createObjectURL(imageField.value)
                            : user?.profile_picture
                        }
                        alt={user?.name + "image"}
                      />
                      <div className="relative size-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                        <ImagePlus className="size-5" />
                        <Input
                          className="opacity-0 absolute w-full h-full cursor-pointer"
                          type="file"
                          // onChange={(e) =>
                          //   setProfilePicture(e.target.files?.[0] || null)
                          // }
                          onChange={(e) =>
                            imageField.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </div>
                    </div>
                    {/* <FormControl>
                      <Input
                        type="file"
                        onChange={(e) =>
                          setProfilePicture(e.target.files?.[0] || null)
                        }
                      />
                    </FormControl> */}
                    <FormDescription>Upload a profile picture.</FormDescription>
                    {/* {profilePicture && (
                      <img
                        src={URL.createObjectURL(profilePicture)}
                        alt="Profile Preview"
                        className="mt-2 w-20 h-20 rounded-full object-cover"
                      />
                    )} */}
                    <FormMessage />
                  </FormItem>

                  <FormField
                    control={control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Profile Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
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

                  <Button
                    disabled={!isValid || !isDirty || BtnLoading}
                    type="submit"
                  >
                    {BtnLoading ? (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {BtnLoading ? "Updating..." : "Update profile"}
                  </Button>
                </form>
              </Form>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
