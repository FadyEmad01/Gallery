"use client";
import { Container } from "@/components/Container";
import { MasonryCard } from "@/components/MasonryCard";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { getAllPosts } from "@/lib/api";
import { log } from "console";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
// import { Navbar } from "@/components/Navbar";

interface PostData {
  Board_id: string;
  image_url: string;
  description: string;
  name: string;
  price: string;
  author: {
    user_id: string;
    email: string;
    name: string;
    profile_picture: string | null;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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
  }, []);

  // const fakeData = [
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "John Doe",
  //     title: "Sample Title 1",
  //     image: "https://via.placeholder.com/300x200", // 3:2 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Jane Smith",
  //     title: "Sample Title 2",
  //     image: "https://via.placeholder.com/400x300", // 4:3 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Alice Johnson",
  //     title: "Sample Title 3",
  //     image: "https://via.placeholder.com/500x500", // 1:1 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Bob Brown",
  //     title: "Sample Title 4",
  //     image: "https://via.placeholder.com/600x400", // 3:2 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Charlie Black",
  //     title: "Sample Title 5",
  //     image: "https://via.placeholder.com/200x400", // 1:2 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Eve White",
  //     title: "Sample Title 6",
  //     image: "https://via.placeholder.com/800x600", // 4:3 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Frank Green",
  //     title: "Sample Title 7",
  //     image: "https://via.placeholder.com/400x500", // 4:5 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Grace Blue",
  //     title: "Sample Title 8",
  //     image: "https://via.placeholder.com/500x300", // 5:3 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Henry Yellow",
  //     title: "Sample Title 9",
  //     image: "https://via.placeholder.com/250x400", // 5:8 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  //   {
  //     userImage: "https://via.placeholder.com/100x100",
  //     userName: "Ivy Orange",
  //     title: "Sample Title 10",
  //     image: "https://via.placeholder.com/400x250", // 8:5 ratio
  //     postHref: "https://via.placeholder.com/300x200",
  //     userHref: "https://via.placeholder.com/100x100",
  //   },
  // ];

  return (
    <>
      {/* <Navbar/> */}
      <Toaster />
      <Container>
        {loading ? (
          <LoaderCircle className="mx-auto animate-spin size-10 mt-9" />
        ) : (
          <div className="masonry my-9">
            {posts.map((data) => (
              <MasonryCard
                key={data.Board_id}
                showUser={true}
                image={data.image_url}
                title={data.name}
                userImage={
                  data.author.profile_picture || "/avatarPlaceholder.jpg"
                }
                userName={data.author.name}
                postHref={`/post/${data.Board_id}`}
                userHref={`/user/${data.author.user_id}`}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
