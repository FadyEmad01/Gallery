import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface PostCardProps {
  children?: React.ReactNode;
  className?: string;
  Board_image?: string;
  Board_name?: string;
  Board_description?: string;
  Board_price?: string;
  created_at?: string;
  updated_at?: string;
  Author_name?: string;
  Author_profile_picture?: string;
  Author_Href?: string;
  Author_WhatsApp_Number?: string;
}
export const PostCard = (props: PostCardProps) => {
  return (
    <div className={cn("w-[80%] rounded-[2rem] shadow-2xl", props.className)}>
      <div className="grid grid-cols-2 gap-5">
        <img
          className="col-span-1 rounded-s-[2rem] rounded-e-2xl object-cover w-full"
          src={props.Board_image}
          alt={props.Board_name}
        />
        <div className="col-span-1 py-9 pe-5">
          {props.children}
          <div className="flex">
            <div className="flex group items-center gap-2">
              <Link href={props.Author_Href ?? ""}>
                <img
                  className="sm:size-10 size-8 rounded-full object-cover "
                  src={props.Author_profile_picture}
                  alt={props.Author_name + " photo"}
                />
              </Link>
              <div className="flex flex-col">
                <Link href={props.Author_Href ?? ""}>
                  <p className="text-sm font-medium text-gray-950 font-sans my-0 py-0 group-hover:underline group-hover:underline-offset-2 hover:underline hover:underline-offset-2">
                    {props.Author_name}
                  </p>
                </Link>
                <span className="text-[13px] text-gray-500 my-0 py-0">
                  {props.created_at}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-2xl tracking-tight">{props.Board_name}</h3>
            <p className="text-sm tracking-wide">{props.Board_description}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm tracking-wide">Price: {props.Board_price}</p>
          </div>

          {/* <div className="mt-4">
            <p className="text-sm tracking-wide">
              Updated at:{" "}
              <span className="text-gray-500">{props.updated_at}</span>
            </p>
          </div> */}
          <div className="mt-4 flex items-center gap-2">
            <p className="text-sm tracking-wide">Contact:</p>
            <Link
              href={`https://wa.me/${props.Author_WhatsApp_Number}`}
              className="bg-[#25D366] hover:bg-[#22c05c]  text-white rounded-full p-2 flex justify-center items-center"
            >
              <FaWhatsapp className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
