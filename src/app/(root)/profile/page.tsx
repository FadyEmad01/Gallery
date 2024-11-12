"use client";
import { Container } from "@/components/Container";
import { MasonryCard } from "@/components/MasonryCard";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
// import { userData } from "@/Data/user";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile, getSavedBoards } from "@/lib/api";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface createdPostMasonry {
  image_url: string;
  name: string;
  Board_id: string;
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
interface SavedBoard {
  board_id: string;
  name: string;
  author: {
    author_id: string,
    name: string,
    profile_picture: string
  }
  image_url: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const [user, setUser] = useState<user | null>(null); // State for user profile
  const [tabs, setTabs] = useState("saved");
  const [loading, setLoading] = useState(true); // Loading state
  // const [error, setError] = useState<string | null>(null); // Error handling
  const [savedBoards, setSavedBoards] = useState<SavedBoard[]>([]); // Saved boards data
  const { toast } = useToast();

  // Fetch user profile and saved boards
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch user profile
        const profileResponse = await fetchProfile();
        if (profileResponse.success) {
          setUser(profileResponse.user); // Set user data from API
        } else {
          console.log("Profile error: " + profileResponse.message);
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "An unexpected error occurred. " + profileResponse.message,
          });
        }

        // Step 2: Fetch saved boards only if the "Saved" tab is active and user data exists
        if (profileResponse.success && tabs === "saved") {
          const savedBoardsResponse = await getSavedBoards();
          setSavedBoards(savedBoardsResponse);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load data. Please try again later.",
        });
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, [tabs]);

  return (
    <>
      <Container>
        <Toaster />
        <div className="flex flex-col gap-2 justify-center items-center my-9">
          <>
            <Avatar className="size-36">
              <AvatarImage
                className="object-cover"
                src={user?.profile_picture ?? "/avatarPlaceholder.jpg"}
                alt={user?.name + " image"}
                title={user?.name + " image"}
              />
              <AvatarFallback>
                <Skeleton className="size-36 rounded-full bg-zinc-200" />
              </AvatarFallback>
            </Avatar>
            {loading ? (
              <Skeleton className="w-36 h-8 rounded-lg bg-zinc-200" />
            ) : (
              <h1 className="text-4xl font-semibold">{user?.name}</h1>
            )}
            {loading ? (
              <Skeleton className="w-44 h-4 rounded-sm bg-zinc-200" />
            ) : (
              <p className="text-sm font-semibold text-gray-400">
                {user?.email}
              </p>
            )}
          </>
          {/* <Avatar className="size-36">
            <AvatarImage
              className="object-cover"
              src={user?.image}
              alt={user?.name + " image"}
              title={user?.name + " image"}
            />
            <AvatarFallback>
              <Skeleton className="size-36 rounded-full bg-zinc-400" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-semibold">{user?.name}</h1>
          <p className="text-sm font-semibold text-gray-400">{user?.email}</p> */}

          <Button className="mt-4" variant={"secondary"}>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>

          <div className="flex gap-4 justify-center items-center w-full h-4 mt-8">
            <Button
              onClick={() => setTabs("saved")}
              variant={tabs === "saved" ? "secondary" : "ghost"}
            >
              Saved
            </Button>

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
        {tabs === "saved" ? (
          savedBoards && savedBoards.length > 0 ? (
            <>
              <p className="text-xl mb-4 font-semibold">Saved Posts</p>
              <div className="masonry mb-9">
                {savedBoards
                  .slice()
                  .reverse()
                  .map((board) => (
                    <MasonryCard
                      key={board.board_id}
                      image={board.image_url}
                      title={board.name}
                      showUser={true}
                      postHref={`/post/${board.board_id}`}
                      userImage={board.author.profile_picture} // Adjust this if necessary
                      userName={board.author.name} // Adjust this if necessary
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="mt-14 w-full flex flex-col justify-center items-center">
              <p className="text-sm mb-4 text-center">
                Nothing to show...yet! Browse us and save some.
              </p>
              <Link
                href="/show/all"
                className={buttonVariants({
                  variant: "default",

                  className: "flex items-center gap-1 ",
                })}
              >
                Browse us
              </Link>
            </div>
          )
        ) : null}
        {tabs === "created" ? (
          user && user.boards && user.boards.length > 0 ? (
            <>
              <div className="flex justify-between items-center w-full mb-2">
                <p className="text-xl font-semibold">Created Post</p>
                <Link
                  href="/profile/create/post"
                  className={buttonVariants({
                    variant: "default",
                    className: "flex items-center gap-1 ",
                  })}
                >
                  Add new
                  <Plus />
                </Link>
              </div>
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
                        user?.profile_picture ?? "/avatarPlaceholder.jpg"
                      } // Replace with the correct field name if available
                      userName={user?.name}
                      key={data.Board_id}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="mt-14 w-full flex flex-col justify-center items-center">
              <p className="text-sm mb-4 text-center">
                Nothing to show...yet! Pins you create will live here.
              </p>
              <Link
                href="/profile/create/post"
                className={buttonVariants({
                  variant: "default",

                  className: "flex items-center gap-1 ",
                })}
              >
                Create
              </Link>
            </div>
          )
        ) : null}
      </Container>
    </>
  );
}
