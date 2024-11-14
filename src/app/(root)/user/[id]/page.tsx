"use client";
import { Container } from "@/components/Container";
import { MasonryCard } from "@/components/MasonryCard";
// import { Navbar } from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";
import { fetchUserById } from "@/lib/api";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
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

interface createdPostMasonry {
  image_url: string;
  name: string;
  Board_id: string;
}
export default function Page({ params }: PageProps) {
  const { id } = params;
  const userId = id; // Explicitly convert id to a number
  // const user = userData.find((user) => user.id === userId); // Find the user by id

  const [tabs, setTabs] = useState("created");
  const [user, setUser] = useState<user | null>(null); // State for user profile
  const [loading, setLoading] = useState(true); // Loading state
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserById(userId);
      if (response.success) {
        setUser(response.user); // Set user data from API
      } else {
        // setError(response.message); // Set error message
        console.log("Profile error: " + response.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
      setLoading(false); // Set loading to false
    };

    getUser();
  }, []);

  return (
    <>
     <Toaster />
      <Container>
       
        <div className="flex flex-col gap-2 justify-center items-center my-9">
          <Avatar className="size-36">
            <AvatarImage
              className="object-cover"
              src={user?.profile_picture || "/avatarPlaceholder.jpg"}
              alt={user?.name + " image"}
              title={user?.name + " image"}
            />
            <AvatarFallback>
              <Skeleton className="size-36 rounded-full bg-zinc-200" />
            </AvatarFallback>
            {/* <AvatarFallback>{userName}</AvatarFallback> */}
          </Avatar>
          {loading ? (
            <Skeleton className="w-36 h-8 rounded-lg bg-zinc-200" />
          ) : (
            <h1 className="text-4xl font-semibold">{user?.name}</h1>
          )}
          {loading ? (
            <Skeleton className="w-44 h-4 rounded-sm bg-zinc-200" />
          ) : (
            <p className="text-sm font-semibold text-gray-400">{user?.email}</p>
          )}
          {/* <Button className="mt-4" variant={"secondary"}>
            Edit Profile
          </Button> */}

          <div className="flex gap-4 justify-center items-center w-full h-4 mt-8">
            {/* <Button
              onClick={() => setTabs("saved")}
              variant={tabs === "saved" ? "secondary" : "ghost"}
            >
              Saved
            </Button> */}

            <Button
              onClick={() => setTabs("created")}
              variant={tabs === "created" ? "secondary" : "ghost"}
            >
              Created
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        {tabs === "saved" ? null : null}
        {tabs === "created" ? (
          user && user.boards && user.boards.length > 0 ? (
            <>
              <p className="text-xl mb-4 font-semibold">Created Post</p>
              <div className="masonry mb-9">
                {user?.boards
                  .slice()
                  .reverse()
                  .map((data: createdPostMasonry) => (
                    <MasonryCard
                      showUser={false}
                      image={data.image_url}
                      title={data.name}
                      userImage={
                        user?.profile_picture || "/avatarPlaceholder.jpg"
                      } // Replace with the correct field name if available
                      userName={user?.name}
                      postHref={`/post/${data.Board_id}`}
                      key={data.Board_id}
                      showDropdown={false}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="mt-14 w-full flex flex-col justify-center items-center">
              <p className="text-sm mb-4 ">Nothing to show...yet!</p>
            </div>
          )
        ) : null}
      </Container>
    </>
  );
}
