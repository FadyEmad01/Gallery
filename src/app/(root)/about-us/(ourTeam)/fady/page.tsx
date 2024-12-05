import { Container } from "@/components/Container";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Container>
        <div className="h-52 mt-9">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-2xl"
              src="https://i.pinimg.com/564x/4a/89/73/4a8973f42795bc5d4912c01452f21ea4.jpg"
              alt="Fady profile background"
            />
          </div>
        </div>
        <div className="-mt-20 px-6">
          <div className="relative flex size-44 items-center justify-center overflow-hidden rounded-full border-[7px] border-background bg-muted shadow-sm shadow-black/10">
            <Image
              src="/Fady.png"
              className="h-full w-full object-cover"
              width={1200}
              height={1200}
              quality={100}
              alt="Profile image"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default page;
