"use client";
import { Container } from "@/components/Container";
import { MasonryCard } from "@/components/MasonryCard";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
// import { userData } from "@/Data/user";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile } from "@/lib/api";
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

export default function Page() {
  const [user, setUser] = useState<user | null>(null); // State for user profile
  const [tabs, setTabs] = useState("saved");
  const [loading, setLoading] = useState(true); // Loading state
  // const [error, setError] = useState<string | null>(null); // Error handling
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetchProfile();
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

    getProfile();
  }, []);

  // const fakeData = [{}];
  // const fakeData = [
  //   {
  //     userImage:
  //       "https://i.pinimg.com/236x/00/a0/1a/00a01abd46e8dd504135af47ca59a2b5.jpg",
  //     userName: "John Doe",
  //     title: "Sample Title 1",
  //     image:
  //       "https://i.pinimg.com/236x/00/a0/1a/00a01abd46e8dd504135af47ca59a2b5.jpg", // 3:2 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Jane Smith",
  //     title: "Sample Title 2",
  //     image:
  //       "https://i.pinimg.com/236x/5b/5f/d3/5b5fd370e8d91874668cda9127f07a0a.jpg", // 4:3 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Alice Johnson",
  //     title: "Sample Title 3",
  //     image:
  //       "https://i.pinimg.com/originals/91/e0/17/91e017c2852c68768318ecf09da54614.gif", // 1:1 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Bob Brown",
  //     title: "Sample Title 4",
  //     image:
  //       "https://i.pinimg.com/236x/d6/44/f4/d644f4394ec89d85d7316f4548e80ef3.jpg", // 3:2 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Charlie Black",
  //     title: "Sample Title 5",
  //     image:
  //       "https://i.pinimg.com/236x/1d/85/fa/1d85fac0d5ae309a165e1eafaebd0ab8.jpg", // 1:2 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Charlie Black",
  //     title: "Sample Title 5",
  //     image:
  //       "https://i.pinimg.com/236x/98/24/97/9824978694d68c09fd6b9e813ff39e5e.jpg", // 1:2 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Charlie Black",
  //     title: "Sample Title 5",
  //     image:
  //       "https://i.pinimg.com/236x/16/c7/82/16c782a6ca94390ffc57a6453670bc5d.jpg", // 1:2 ratio
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Charlie Black",
  //     title: "Sample Title 5",
  //     image:
  //       "https://i.pinimg.com/236x/59/92/02/5992021ac3b1cbc69d22f5c126deaee1.jpg", // 1:2 ratio
  //   },
  // ];

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
          // fakeData && fakeData.length > 0 ? (
          //   <>
          //     <p className="text-xl mb-4 font-semibold">Saved Posts</p>
          //     <div className="masonry mb-9">
          //       {fakeData.map((data, index) => (
          //         <MasonryCard
          //           image={data.image}
          //           title={data.title}
          //           userImage={data.userImage}
          //           userName={data.userName}
          //           key={index}
          //         />
          //       ))}
          //     </div>
          //   </>
          // ) :
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
                href="/create/post"
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
