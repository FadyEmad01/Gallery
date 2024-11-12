import { cn } from "@/lib/utils";
import Link from "next/link";

interface MansoryProps {
  userImage: string;
  userName: string;
  title: string;
  image: string;
  postHref?: string;
  userHref?: string;
  showUser: boolean;
  className?: string;
}

export const MasonryCard = (props: MansoryProps) => {

  return (
    <div className={cn("flex flex-col gap-1 bg-transparent w-full flex-nowrap", props.className)}>
      <Link href={props.postHref ?? ''}>
        <div className="flex flex-col gap-1 flex-nowrap">
          <img
            className="w-full rounded-2xl object-cover"
            src={props.image}
            alt={props.title + " image"}
          />
          <h5 className="text-sm">{props.title}</h5>
        </div>
      </Link>
      {props.showUser && (
      <div className="flex items-center justify-between flex-nowrap">
        <Link href={props.userHref ?? ''}>
          <div className="flex items-center gap-2">
            <img
              className="sm:size-8 size-6 rounded-full object-cover"
              src={props.userImage}
              alt={props.userName + " photo"}
            />
            <p className="text-sm text-gray-500">{props.userName}</p>
          </div>
        </Link>
      </div>
      )}
    </div>
  );
};
