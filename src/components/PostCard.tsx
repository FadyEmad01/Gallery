import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { Maximize2, X } from "lucide-react";

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
  imageHeight?: number;
  imageWidth?: number;
  dominant_color?: string;
}
export const PostCard = (props: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // On mount, calculate the width of the container
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  // Calculate the aspect ratio and set the height of the placeholder div
  const aspectRatio = (props.imageWidth || 1) / (props.imageHeight || 1);
  const placeholderHeight = containerWidth / aspectRatio;

  return (
    <>
      <div
        className={cn(
          "w-[100%] rounded-[2rem] shadow-2xl inline-block",
          props.className
        )}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div className="flex items-center justify-between">
            <div className="flex group items-center gap-2">
              <Link href={props.Author_Href ?? ""}>
                <img
                  className="size-10 rounded-full object-cover "
                  src={props.Author_profile_picture}
                  alt={props.Author_name + " photo"}
                />
              </Link>
              <div className="flex flex-col">
                <Link href={props.Author_Href ?? ""}>
                  <p className="text-base font-medium text-gray-950 font-sans my-0 py-0 group-hover:underline group-hover:underline-offset-2 hover:underline hover:underline-offset-2">
                    {props.Author_name}
                  </p>
                </Link>
                <span className="text-[13px] text-gray-500 my-0 py-0">
                  {props.created_at}
                </span>
              </div>
            </div>
            {props.children}
          </div>
          <div className="mt-3">
            <h3 className="text-2xl tracking-tight">{props.Board_name}</h3>
            <p className="text-sm tracking-wide">{props.Board_description}</p>
          </div>
          <div className="w-full mt-3 relative" ref={containerRef}>
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
                "object-cover w-full rounded-2xl h-auto",
                isImageLoaded ? "block" : "hidden" // Show only when image has loaded
              )}
              src={props.Board_image}
              alt={props.Board_name}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="absolute top-3 right-3">
              <button
                className={cn(
                  "bg-white/75 rounded-full p-2 ",
                  isImageLoaded ?  "block" :"hidden"
                )}
                onClick={() => setIsOpen(true)}
              >
                <Maximize2 />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////// */}
      {/* <div className={cn("w-[80%] rounded-[2rem] shadow-2xl md:block hidden", props.className)}>
        <div className="grid grid-cols-2 gap-5 p-3 md:p-0">
          <div className="relative w-full h-full col-span-2 md:col-span-1">
            <img
              className=" rounded-3xl md:rounded-s-[2rem] md:rounded-e-2xl  object-cover w-full "
              src={props.Board_image}
              alt={props.Board_name}
            />
            <div className="absolute top-3 right-3">
              <button
                className="bg-white/75 rounded-full p-2 "
                onClick={() => setIsOpen(true)}
              >
                <Maximize2 />
              </button>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 py-9 pe-5">
            
            <div className="flex items-center justify-between">
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
              {props.children}
            </div>

            <div className="mt-4">
              <h3 className="text-2xl tracking-tight">{props.Board_name}</h3>
              <p className="text-sm tracking-wide">{props.Board_description}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm tracking-wide">
                Price: {props.Board_price}
              </p>
            </div>


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
      </div> */}
      {/* Dialog for displaying the image */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[100] w-[100vw] h-[100vh]"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-xs">
            <div className="absolute top-3 right-3">{props.children}</div>
            <div className="w-full h-full max-w-md transform overflow-hidden align-middle transition-all">
              <img
                src={props.Board_image}
                alt={props.Board_name}
                className="w-full h-fill-available object-contain rounded-3xl"
              />
            </div>
          </Dialog.Panel>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 left-3 text-gray-950 bg-white rounded-full p-1 hover:bg-gray-200 transition-all"
          >
            <X />
          </button>
        </div>
      </Dialog>
    </>
  );
};
