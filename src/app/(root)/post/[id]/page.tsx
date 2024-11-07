"use client";
import { Container } from "@/components/Container";
// import { MasonryCard } from "@/components/MasonryCard";
import { PostCard } from "@/components/PostCard";
// import { Navbar } from "@/components/Navbar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";
import { fetchBoardById } from "@/lib/api";
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

export default function Page({ params }: PageProps) {
  const { id } = params;
  const BoardId = id; // Explicitly convert id to a number
  // const user = userData.find((user) => user.id === userId); // Find the user by id

  const [board, setBoard] = useState<board | null>(null); // State for user profile
  const [loading, setLoading] = useState(true); // Loading state
  const { toast } = useToast();

  useEffect(() => {
    const getBoard = async () => {
      const response = await fetchBoardById(BoardId);
      if (response.success) {
        setBoard(response.board);
        console.log(response.board);
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

    getBoard();
  }, []);

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
      <Container>
        <Toaster />
        <PostCard
          className="mx-auto my-9"
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
        ></PostCard>
      </Container>

      <Container>
        <div></div>
      </Container>
    </>
  );
}
