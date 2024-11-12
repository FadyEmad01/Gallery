"use client";
import { Container } from "@/components/Container";
import { MasonryCard } from "@/components/MasonryCard";
// import { MasonryCard } from "@/components/MasonryCard";
import { PostCard } from "@/components/PostCard";
// import { Button } from "@/components/ui/button";
// import { Navbar } from "@/components/Navbar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";
import {
  fetchBoardById,
  getAllPosts,
  getSavedBoards,
  saveBoardById,
  unsaveBoardById,
} from "@/lib/api";
import { Bookmark, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface board {
  Board_id: string;
  name: string;
  author_id: string;
  image_url: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
  author: Author_GetBoardById; // Including author details in the board
}
// interface boardSavedes {
//   Board_id: string;
//   name: string;
//   author_id: string;
//   image_url: string;
//   description: string;
//   price: string;
//   created_at: string;
//   updated_at: string;
// }

interface Author_GetBoardById {
  name: string;
  email: string;
  profile_picture: string | null;
  boards: board[]; // Author has an array of boards
}

interface PageProps {
  params: {
    id: string;
  };
}

interface PostData {
  Board_id: string;
  image_url: string;
  description: string;
  price: string;
  author: {
    user_id: string;
    email: string;
    name: string;
    profile_picture: string | null;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const BoardId = id; // Explicitly convert id to a number
  // const user = userData.find((user) => user.id === userId); // Find the user by id

  const [posts, setPosts] = useState<PostData[]>([]);
  const [board, setBoard] = useState<board | null>(null); // State for user profile
  const [loading, setLoading] = useState(true); // Loading state
  const [isSaved, setIsSaved] = useState(false); // Track if the board is saved
  // const [savedBoards, setSavedBoards] = useState<boardSavedes[]>([]); // Store saved boards
  const { toast } = useToast();

  useEffect(() => {
    const getBoard = async () => {
      const response = await fetchBoardById(BoardId);
      if (response.success) {
        setBoard(response.board);
        // console.log(response.board);
      } else {
        console.log("Board error: " + response.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
      setLoading(false); // Set loading to false
    };
    const getAllSavedBoards = async () => {
      const savedBoardsResponse = await getSavedBoards();
      // setSavedBoards(savedBoardsResponse); // Set saved boards in state
      let isBoardSaved = false; // Flag to track if the board is saved
      for (let i = 0; i < savedBoardsResponse.length; i++) {
        const element = savedBoardsResponse[i]; // Access each element in the savedBoards array
        if (element.board_id === BoardId) {
          console.log("Board is saved");
          isBoardSaved = true; // If BoardId matches, set isBoardSaved to true
          break; // Exit the loop early once we find the match
        }
      }
      setIsSaved(isBoardSaved); // Update the isSaved state accordingly
    };
    const fetchPosts = async () => {
      const response = await getAllPosts();
      if (response.success) {
        setPosts(response.data?.boards || []); // Adjust according to the structure of `response.data`
      } else {
        // setError(response.message || "Failed to fetch posts");
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
      setLoading(false); // Set loading to false
    };

    fetchPosts();
    getAllSavedBoards(); // Fetch saved boards
    getBoard();
  }, []);

  const handleSaveToggle = async () => {
    if (isSaved) {
      // Unsave the board if already saved
      const response = await unsaveBoardById(BoardId);
      if (response.success) {
        setIsSaved(false);
        toast({
          variant: "default",
          title: "Removed",
          description: response.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } else {
      const response = await saveBoardById(BoardId);
      if (response.success) {
        setIsSaved(true);
        toast({
          variant: "default",
          title: "Success",
          description: response.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    }
  };

  // Format created_at date if board data is available
  const formattedDate = board?.created_at
    ? new Date(board.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <>
      {loading ? (
        <>
          <LoaderCircle className="mx-auto animate-spin size-10 mt-9" />
        </>
      ) : (
        <>
          <Container>
            <Toaster />
            <div className="my-9 md:columns-2 columns-1 gap-x-4">
              <PostCard
                className="mx-auto mb-9"
                Board_image={board?.image_url}
                Board_name={board?.name}
                Board_description={board?.description}
                Board_price={board?.price}
                created_at={formattedDate}
                updated_at={board?.updated_at}
                Author_name={board?.author.name}
                Author_profile_picture={
                  board?.author.profile_picture ?? "/avatarPlaceholder.jpg"
                }
              >
                <button
                  className={`${
                    isSaved ? "" : ""
                  } rounded-full p-2 bg-white shadow-md`}
                  onClick={handleSaveToggle}
                >
                  {isSaved ? (
                    <Bookmark className="text-myMedBlue fill-myLightBlue" />
                  ) : (
                    <Bookmark className="text-myMedBlue" />
                  )}
                  {/* <Bookmark className="" /> */}
                </button>
              </PostCard>
              <div className="columns-2 gap-x-4">
                {posts.map((data) => (
                  <MasonryCard
                    className="mb-4 inline-flex"
                    key={data.Board_id}
                    showUser={true}
                    image={data.image_url}
                    title={data.description}
                    userImage={
                      data.author.profile_picture || "/avatarPlaceholder.jpg"
                    }
                    userName={data.author.name}
                    postHref={`/post/${data.Board_id}`}
                    userHref={`/user/${data.author.user_id}`}
                  />
                ))}
              </div>
            </div>
          </Container>

          <Container>
            <div></div>
          </Container>
        </>
      )}
    </>
  );
}
