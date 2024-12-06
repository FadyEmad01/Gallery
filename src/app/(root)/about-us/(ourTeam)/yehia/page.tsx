"use client";
import { Container } from "@/components/Container";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setIsOpen(true);
  };
  return (
    <>
      <Container className="mb-9">
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
              <div className="w-full h-full max-w-md transform overflow-hidden align-middle transition-all">
                <img
                  src={selectedImage || "/avatarPlaceholder.jpg"}
                  alt="Selected profile"
                  className="w-full h-auto object-contain rounded-3xl"
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
        <div className="h-52 mt-9">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <img
              onClick={() =>
                handleImageClick(
                  "https://i.pinimg.com/564x/4a/89/73/4a8973f42795bc5d4912c01452f21ea4.jpg"
                )
              }
              className="h-full w-full object-cover rounded-2xl"
              src="https://i.pinimg.com/564x/4a/89/73/4a8973f42795bc5d4912c01452f21ea4.jpg"
              alt="Yehia profile background"
            />
          </div>
        </div>
        <div className="-mt-12 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-x-4 items-center">
            <div className="relative flex size-44 items-center justify-center overflow-hidden rounded-full border-[7px] border-background bg-muted shadow-sm shadow-black/10">
              <Image
                onClick={() => handleImageClick("/Yehia.jpg")}
                src="/Yehia.jpg"
                className="h-full w-full object-cover"
                width={1200}
                height={1200}
                quality={100}
                alt="Profile image"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start relative z-50">
              <h1 className="text-4xl mt-2 tracking-tight font-semibold">
                Yehia Mohamed
              </h1>
              <p className="text-muted-foreground mt-1">Back-End Developer</p>
            </div>
          </div>
        </div>
        <div className="sm:px-6 mt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="sm:col-span-1 col-span-full">
              <div className="w-full rounded-2xl bg-muted shadow px-4 py-3">
                <p className="text-xl font-semibold">Social media</p>
                <div className="flex gap-3 flex-wrap mt-2">                
                  <a
                    href="https://www.linkedin.com/in/yehia-mohamed-9b86b524b/"
                    target="_blank"
                  >
                    <img
                      className="size-8"
                      src="/Linkedin.svg"
                      alt="Yehia Linkedin"
                    />
                  </a>
                  <a href="https://github.com/yehiamoh" target="_blank">
                    <img
                      className="size-8"
                      src="/github.svg"
                      alt="Yehia github"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
