import { fetchBoardById, getAllPosts } from "@/lib/api";
import View from "./view";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const board = await getAllPosts();

  return {
    title: board ? `${board.data?.boards[1].name} | gallery` : "Loading...",
    description: board.data?.boards[1].description || "View this amazing board on gallery",
    openGraph: {
      title: board ? `${board.data?.boards[1].name} | gallery` : "gallery Board",
      description: board.data?.boards[1].description || "View this amazing board on gallery",
      images: [
        {
          url: board.data?.boards[1].image.image_url || "/default-og-image.jpg",
          width: 800,
          height: 600,
        },
      ],
      url: `https://gallery-gilt-kappa.vercel.app/post/${id}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const BoardId = id; // Explicitly convert id to a number
  
  return (
    <>
      <View params={{ id: id }}></View>
    </>
  );
}
