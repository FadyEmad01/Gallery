import { ReactNode, SVGProps } from "react";
import { Cursor } from "@/components/core/cursor";
import { cn } from "@/lib/utils";

interface PropsFigmaCusror {
  children: ReactNode;
  className?: string;
  name?: string;
  imageAttribute?: ReactNode;
  bgColor: string;
  mouseFill:string;
}
const MouseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={31}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          //   fill={"#3b82f6"}
          fillRule="evenodd"
          stroke={"#fff"}
          strokeLinecap="square"
          strokeWidth={2}
          d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            //    fill={"#3b82f6"}
            d="M0 0h26v31H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export function Cursor2(Props: PropsFigmaCusror) {
  return (
    <div className="flex relative">
      <div className="">
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.15,
          }}
          className={cn("left-12 top-4", Props.className)}
        >
          <div>
            <MouseIcon className={cn("h-6 w-6" ,  Props.mouseFill)} />
            <div className={cn("ml-4 mt-1 rounded-[4px] px-2 py-0.5 text-neutral-50" , Props.bgColor)} >
              {/* {Props.name} */}
              {Props.imageAttribute ? Props.imageAttribute : null}
              {Props.name ? Props.name : null}
            </div>
          </div>
        </Cursor>
        {/* <img
          src='https://i.pinimg.com/564x/a0/6a/5f/a06a5f814569fcf4a67f3ad89ae1babf.jpg'
          alt='Green herbs'
          className='h-40 w-full max-w-32 rounded-[8px] object-cover'
        /> */}
        {Props.children}
      </div>
    </div>
  );
}
