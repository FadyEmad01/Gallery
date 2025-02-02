import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Ellipsis, Trash2 } from "lucide-react";
import { deleteBoard } from "@/lib/api";

interface MansoryProps {
  userImage: string;
  userName: string;
  title: string;
  image: string;
  postHref?: string;
  userHref?: string;
  showUser: boolean;
  className?: string;
  dominant_color?: string;
  showDropdown: boolean;
  children?: React.ReactNode;
  imageHeight: number;
  imageWidth: number;
}

export const MasonryCard = (props: MansoryProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // On mount, calculate the width of the container
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  // Calculate the aspect ratio and set the height of the placeholder div
  const aspectRatio = props.imageWidth / props.imageHeight;
  const placeholderHeight = containerWidth / aspectRatio;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-transparent w-full flex-nowrap overflow-hidden",
        props.className
      )}
      ref={containerRef}
    >
      <div className="relative overflow-hidden group">
        <Link href={props.postHref ?? ""}>
          <div className="flex flex-col gap-1 flex-nowrap">
            <div
              className={cn(
                "rounded-2xl animate-customPulse",
                isImageLoaded ? "hidden" : "block" // Show only when image has loaded
                // !isImageLoaded && "block",
                // "hidden" // Initially hidden, shown when image hasn't loaded,
              )}
              style={{
                backgroundColor: props.dominant_color,
                paddingTop: "100%",
                height: placeholderHeight, // Set the height dynamically based on the aspect ratio
              }} // Maintain aspect ratio
            />
            <img
              className={cn(
                "w-full rounded-2xl object-cover",
                isImageLoaded ? "block" : "hidden" // Show only when image has loaded
              )}
              src={props.image}
              alt={`${props.title} image`}
              onLoad={() => setIsImageLoaded(true)}
            />
            {/* <img
            className="w-full rounded-2xl object-cover"
            src={props.image}
            alt={props.title + " image"}
          /> */}
            <h5 className="text-sm">{props.title}</h5>
          </div>
        </Link>
        {props.showDropdown && (
          <DropdownMenu
            open={isDropdownOpen}
            onOpenChange={(open) => setIsDropdownOpen(open)}
          >
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "absolute top-2 ease-in-out duration-100 right-2",
                  isDropdownOpen ? "lg:right-2" : "lg:-right-10 lg:group-hover:right-2"
                )}
              >
                <button className="bg-white/90 rounded-full p-2 ">
                  <Ellipsis />
                </button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="truncate">
                {props.title}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>{props.children}</DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent >
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    New Team
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {props.showUser && (
        <div className="flex items-center justify-between flex-nowrap">
          <Link href={props.userHref ?? ""}>
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
