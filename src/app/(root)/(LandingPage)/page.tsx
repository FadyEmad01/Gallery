"use client";

import { BentoCard } from "@/components/BentoCard";
import { Container } from "@/components/Container";
import { Cursor2 } from "@/components/CursorFigma";
import { DialogBasicForImageCard } from "@/components/DialogBasicForImageCard";
// import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import { ArtWeSell } from "@/Data/ArtWeSell";
import { ImagesSection2 } from "@/Data/ImageSection2";
import { ImagesSlide } from "@/Data/ImageSlider";
import { ImagesSlide2 } from "@/Data/ImageSlider2";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const firstRow = ImagesSlide.slice(ImagesSlide2.length / 10);
  const secondRow = ImagesSlide2.slice(ImagesSlide2.length / 10);

  const Section2Data = ImagesSection2;
  const ourArt = ArtWeSell;

  const [imageSrc, setImageSrc] = useState("/p1.jpeg");

  // Create refs for each section
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  // Track visibility of each section
  const isInView1 = useInView(ref1, { margin: "-50% 0px" });
  const isInView2 = useInView(ref2, { margin: "-50% 0px" });
  const isInView3 = useInView(ref3, { margin: "-50% 0px" });

  // Use effects to update image based on section in view
  useEffect(() => {
    if (isInView1) {
      setImageSrc("/p1.jpeg");
    } else if (isInView2) {
      setImageSrc(Section2Data[0].img);
    } else if (isInView3) {
      setImageSrc("/card-bg.png");
    } else {
      // setImageSrc("/p1.jpeg"); // Default image when none are in view
    }
  }, [isInView1, isInView2, isInView3]);

  return (
    <>
      {/* hero section */}
      <section>
        <Container>
          <div className="flex justify-center mb-6 mt-28">
            <Badge className="text-sm" variant={"outline"}>
              <span className="md:mb-1 text-lg">💵</span>{" "}
              <ArrowRight className="size-4" /> OurWebsite.com{" "}
              <ArrowRight className="size-4" />{" "}
              <span className="text-lg">🖼️</span>
            </Badge>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-center tracking-tighter">
              Discover Your Next Masterpiece
            </h1>
            <p className="text-center ">
              Explore our exquisite collection of art paintings, where every{" "}
              <br className="max-sm:hidden" />
              brushstroke tells a story. From vibrant abstracts to serene
            </p>
          </div>
          <div className="flex justify-center">
            <Button className="mt-6">
              <Link href="/show/all">Browse us</Link>
            </Button>
          </div>
        </Container>

        <div className="mt-9 relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow?.map((ImagesSlide) => (
              <img
                className="rounded-xl object-cover h-48 min-w-32"
                key={ImagesSlide?.name}
                alt={ImagesSlide?.name}
                src={ImagesSlide?.img}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow?.map((ImagesSlide) => (
              <img
                className="rounded-xl object-cover h-48 min-w-32"
                key={ImagesSlide?.name}
                alt={ImagesSlide?.name}
                src={ImagesSlide?.img}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </section>
      {/* end hero section */}

      {/* secend section */}
      <section className="my-20">
        <Container>
          <div className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-full lg:col-span-6  flex flex-col gap-4">
              <h1 className="text-5xl text-start tracking-tighter">
                Discover Your Next Masterpiece By{" "}
                <span className="inline-block">
                  <Cursor2
                    mouseFill="fill-blue-500"
                    bgColor="bg-blue-500"
                    className="top-28 left-24"
                    imageAttribute={
                      <img
                        className="w-40 py-2 object-cover"
                        src={Section2Data[0].theArtistImage}
                      />
                    }
                  >
                    Fady Emad
                  </Cursor2>
                </span>
              </h1>
              <span className="text-start ">
                Where every brushstroke tells a story. From vibrant abstracts to
                serene landscapes, including our stunning pieces inspired by{" "}
                <span className="rounded-sm inline-block bg-blue-500 text-white px-1">
                  <Cursor2
                    mouseFill="fill-blue-500"
                    bgColor="bg-blue-500"
                    className="top-28 left-24"
                    imageAttribute={
                      <img
                        className="w-40 py-2 object-cover"
                        src={Section2Data[0].madeByImage}
                      />
                    }
                  >
                    Van Gogh's
                  </Cursor2>
                </span>{" "}
                "Starry Night," each artwork is a unique expression of
                creativity. Discover the enchanting reimaginings by Fady Emad
                that capture the beauty and emotion of this timeless
                masterpiece, perfect for transforming your space.
              </span>
              <div className="flex justify-start">
                <Button className="">Buy It Now</Button>
              </div>
            </div>

            <div className="col-span-full lg:col-span-6">
              <Cursor2
                mouseFill="fill-blue-500"
                bgColor="bg-blue-500"
                name={Section2Data[0].imgName}
              >
                <img
                  className="w-full rounded-2xl"
                  src={Section2Data[0].img}
                  alt=""
                />
              </Cursor2>
            </div>
          </div>
        </Container>
      </section>
      {/* end secend section */}

      {/* section 3 */}
      <section className="my-20">
        <Container>
          <div className="flex items-start lg:justify-around">
            <div className="lg:w-5/12 w-full hidden lg:block lg:sticky lg:top-28">
              <img
                className="w-full rounded-2xl "
                // src={Section2Data[0].img}
                src={imageSrc}
                alt=""
              />
            </div>

            <div className="lg:w-5/12 w-full">
              <div className="flex flex-col gap-4 pt-14 w-full" ref={ref1}>
                <h1 className="text-5xl text-start tracking-tighter">
                  Discover Your Next Masterpiece By{" "}
                  <span className="inline-block">Fady Emad</span>
                </h1>
                <span className="text-start ">
                  Where every brushstroke tells a story. From vibrant abstracts
                  to serene landscapes, including our stunning pieces inspired
                  by{" "}
                  <span className="rounded-sm inline-block bg-blue-500 text-white px-1">
                    Van Gogh's
                  </span>{" "}
                  "Starry Night," each artwork is a unique expression of
                  creativity. Discover the enchanting reimaginings by Fady Emad
                  that capture the beauty and emotion of this timeless
                  masterpiece, perfect for transforming your space.
                </span>
                <img
                  className="max-w-[564px] lg:hidden rounded-2xl "
                  src="/p1.jpeg"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4 mt-20 mb-8 w-full" ref={ref2}>
                <h1 className="text-5xl text-start tracking-tighter">
                  Discover Your Next Masterpiece By{" "}
                  <span className="inline-block">Fady Emad</span>
                </h1>
                <span className="text-start ">
                  Where every brushstroke tells a story. From vibrant abstracts
                  to serene landscapes, including our stunning pieces inspired
                  by{" "}
                  <span className="rounded-sm inline-block bg-blue-500 text-white px-1">
                    Van Gogh's
                  </span>{" "}
                  "Starry Night," each artwork is a unique expression of
                  creativity. Discover the enchanting reimaginings by Fady Emad
                  that capture the beauty and emotion of this timeless
                  masterpiece, perfect for transforming your space.
                </span>
                <img
                  className="max-w-[564px] lg:hidden rounded-2xl "
                  src={Section2Data[0].img}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4 mt-20 mb-7 w-full" ref={ref3}>
                <h1 className="text-5xl text-start tracking-tighter">
                  Discover Your Next Masterpiece By{" "}
                  <span className="inline-block">Fady Emad</span>
                </h1>
                <span className="text-start ">
                  Where every brushstroke tells a story. From vibrant abstracts
                  to serene landscapes, including our stunning pieces inspired
                  by{" "}
                  <span className="rounded-sm inline-block bg-blue-500 text-white px-1">
                    Van Gogh's
                  </span>{" "}
                  "Starry Night," each artwork is a unique expression of
                  creativity. Discover the enchanting reimaginings by Fady Emad
                  that capture the beauty and emotion of this timeless
                  masterpiece, perfect for transforming your space.
                </span>
                <img
                  className="max-w-[564px] lg:hidden rounded-2xl "
                  src={Section2Data[0].img}
                  alt=""
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* end section 3 */}

      {/* section 4 */}

      <section className="my-20">
        <h1 className="text-5xl text-center tracking-tighter mb-9">
          The Art We Sell
        </h1>

        <Container className="">
          <div className="grid grid-cols-12 grid-rows-12 gap-4 w-full">
            {/* card 1 */}

            <BentoCard className=" sm:col-span-6 col-span-full row-span-6 py-3 overflow-hidden bg-myLightBlue">
              <p className="mb-4 text-2xl font-bold px-4">
                Discover the elegance of Arts here
              </p>
              <div className="flex -space-x-9">
                <DialogBasicForImageCard
                  DialogContentdescribtion1={ourArt[2].items[0].description1}
                  DialogContentdescribtion2={ourArt[2].items[0].description2}
                  DialogContentArtistName={ourArt[2].items[0].Artist}
                  DialogContentLink={ourArt[2].items[0].learnMoreLink}
                  DialogContentImageName={ourArt[2].items[0].name}
                  DialogImageTriggerSrc={ourArt[2].items[0].img}
                >
                  <div className="relative size-44 p-2 rounded-xl bg-[#F6F5F8] border border-[#F0F0F2] rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-10">
                    <img
                      className="w-full h-full object-cover rounded-lg object-cover"
                      src={ourArt[2].items[0].img}
                      alt=""
                    />
                  </div>
                </DialogBasicForImageCard>

                <DialogBasicForImageCard
                  DialogContentdescribtion1={ourArt[0].items[1].description1}
                  DialogContentdescribtion2={ourArt[0].items[1].description2}
                  DialogContentArtistName={ourArt[0].items[1].Artist}
                  DialogContentLink={ourArt[0].items[1].learnMoreLink}
                  DialogContentImageName={ourArt[0].items[1].name}
                  DialogImageTriggerSrc={ourArt[0].items[1].img}
                >
                  <div className="relative size-44 p-2 rounded-xl bg-[#F6F5F8] border border-[#F0F0F2] rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-10">
                    <img
                      className="w-full h-full object-cover rounded-lg object-cover"
                      src={ourArt[0].items[1].img}
                      alt=""
                    />
                  </div>
                </DialogBasicForImageCard>
                <DialogBasicForImageCard
                  DialogContentdescribtion1={ourArt[1].items[0].description1}
                  DialogContentdescribtion2={ourArt[1].items[0].description2}
                  DialogContentArtistName={ourArt[1].items[0].Artist}
                  DialogContentLink={ourArt[1].items[0].learnMoreLink}
                  DialogContentImageName={ourArt[1].items[0].name}
                  DialogImageTriggerSrc={ourArt[1].items[0].img}
                >
                  <div className="relative size-44 p-2 rounded-xl bg-[#F6F5F8] border border-[#F0F0F2] rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-10">
                    <img
                      className="w-full h-full object-cover rounded-lg object-cover"
                      src={ourArt[1].items[0].img}
                      alt=""
                    />
                  </div>
                </DialogBasicForImageCard>
                <DialogBasicForImageCard
                  DialogContentdescribtion1={ourArt[0].items[0].description1}
                  DialogContentdescribtion2={ourArt[0].items[0].description2}
                  DialogContentArtistName={ourArt[0].items[0].Artist}
                  DialogContentLink={ourArt[0].items[0].learnMoreLink}
                  DialogContentImageName={ourArt[0].items[0].name}
                  DialogImageTriggerSrc={ourArt[0].items[0].img}
                >
                  <div className="relative size-44 p-2 rounded-xl bg-[#F6F5F8] border border-[#F0F0F2] rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-10">
                    <img
                      className="w-full h-full object-cover rounded-lg object-cover"
                      src={ourArt[0].items[0].img}
                      alt=""
                    />
                  </div>
                </DialogBasicForImageCard>
              </div>

              {/* <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" /> */}
            </BentoCard>

            {/* end card 1 */}
            {/* card 2 */}
            <BentoCard className="sm:col-span-6 col-span-full row-span-6 transition-transform duration-300 bg-[#2C459E] bg-[url('/gif.gif')] bg-cover bg-top bg-no-repeat hover:bg-white hover:bg-none">
              <div className="flex h-full items-end">
                <p className=" text-2xl font-bold text-black px-4 pb-3">
                  Discover the elegance of animation here
                </p>
              </div>

              {/* <div className="flex -space-x-9">
             
              </div> */}
              {/* <div>   
                  <img className="w-100 xl:h-36" src="/gif.gif"></img>
              </div> */}
              {/* <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" /> */}
            </BentoCard>
            {/* end card 2 */}

            {/* card 3 */}
            <BentoCard className=" col-span-full row-span-8 py-3 bg-[url('/47-1.png')] bg-cover bg-center bg-no-repeat">
              <p className="mb-4 text-xl font-bold px-4 text-myBlueDark">
                Discover the elegance of {ourArt[1].category} here
              </p>
              <img className="w-64 mx-auto" src="/Group 57.svg" alt="" />
            </BentoCard>
            {/* end card 3 */}
          </div>
        </Container>
      </section>

      {/* end section 4 */}
    </>
  );
}
