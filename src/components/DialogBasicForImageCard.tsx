import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogContainer,
} from "@/components/core/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface PropDialog {
  className?: string;
  children?: React.ReactNode;
  DialogImageTriggerSrc: string;
  DialogTriggerClassName?: string;
  DialogContentArtistName?: string;
  DialogContentImageName?: string;
  DialogContentdescribtion1?: string;
  DialogContentdescribtion2?: string;
  DialogContentLink?: string;
}

export function DialogBasicForImageCard(props: PropDialog) {
  return (
    <Dialog
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
      }}
    >
      <DialogTrigger className={cn("", props.DialogTriggerClassName)}>
        {props.children}
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "12px",
          }}
          className="relative h-auto w-[500px] border border-gray-100 bg-white"
        >
          <ScrollArea className="h-[90vh]" type="scroll">
            <div className="relative p-6">
              <div className="flex justify-center py-10">
                <DialogImage
                  src={props.DialogImageTriggerSrc}
                  alt="image"
                  className="h-auto w-[200px]"
                />
              </div>
              <div className="">
                <DialogTitle className="text-black">
                  {props.DialogContentImageName
                    ? props.DialogContentImageName
                    : "The name of the painting is not known"}
                </DialogTitle>
                <DialogSubtitle className="font-light text-gray-400">
                  {props.DialogContentArtistName
                    ? props.DialogContentArtistName
                    : "The name of the artist is not known"}
                </DialogSubtitle>
                <div className="mt-4 text-sm text-gray-700 flex flex-col gap-3">
                  <p>{props.DialogContentdescribtion1}</p>
                  <p>{props.DialogContentdescribtion2}</p>
                  <div className="flex">
                    <a
                      className="flex gap-1 items-center focus:ring-0 focus:outline-none underline underline-offset-2 text-myBlueDark"
                      target="_blank"
                      href={props.DialogContentLink}
                    >
                      Learn More <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogClose className="text-zinc-500" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
