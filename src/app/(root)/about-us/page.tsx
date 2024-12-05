import { Container } from "@/components/Container";
import { Spotlight } from "@/components/core/spotlight";
import { TextEffect } from "@/components/core/text-effect";
import { CursorFirst } from "@/components/CursorFirst";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Container>
        <section className="w-full h-[calc(100dvh-5rem)] py-9 lg:py-9">
          <div className="px-7 py-20 relative w-full h-full bg-[url('/38.png')] bg-no-repeat bg-cover bg-center rounded-3xl">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white rounded-b-xl">
              <span className="text-nowrap">
                Welcome to About us <span>👋🏻</span>
              </span>
            </div>
            <div className="w-full h-full flex justify-center items-center flex-col gap-4">
              <div className="flex items-center gap-x-4 flex-wrap justify-center md:text-6xl text-5xl font-bold text-center">
                <TextEffect
                  className="text-nowrap"
                  per="char"
                  delay={0.1}
                  variants={{
                    container: {
                      hidden: {
                        opacity: 0,
                      },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    },
                    item: {
                      hidden: {
                        opacity: 0,
                        rotateX: 90,
                        y: 10,
                      },
                      visible: {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        transition: {
                          duration: 0.2,
                        },
                      },
                    },
                  }}
                >
                  Welcome to
                </TextEffect>
                <TextEffect
                  per="char"
                  delay={0.5}
                  variants={{
                    container: {
                      hidden: {
                        opacity: 0,
                      },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    },
                    item: {
                      hidden: {
                        opacity: 0,
                        rotateX: 90,
                        y: 10,
                      },
                      visible: {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        transition: {
                          duration: 0.2,
                        },
                      },
                    },
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text pb-1"
                >
                  gallery
                </TextEffect>
                <div className="w-full"></div>
                <TextEffect
                  per="word"
                  delay={0.9}
                  variants={{
                    container: {
                      hidden: {
                        opacity: 0,
                      },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    },
                    item: {
                      hidden: {
                        opacity: 0,
                        rotateX: 90,
                        y: 10,
                      },
                      visible: {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        transition: {
                          duration: 0.2,
                        },
                      },
                    },
                  }}
                >
                  Where Creativity Meets Inspiration!
                </TextEffect>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-5">
              <a className="group" href="#secondSection">
                <div className="flex items-center gap-2 flex-nowrap">
                  <span className="text-nowrap">See us and our vision</span>
                  <span>
                    <ChevronDown className="size-5 animate-bounce opacity-60" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </Container>
      <Container>
        <section id="secondSection" className="w-full my-9">
          <div className="lg:w-3/6 md:w-4/6 sm:w-5/6 w-11/12 mx-auto">
            <h1 className="sm:mb-6 mb-4 text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Team
            </h1>
            <div className="sm:space-y-[10px] space-y-2">
              <p className="text-sm lg:text-base font-normal ">
                Our team is comprised of experienced professionals who are
                passionate about delivering exceptional results. We take pride
                in our
              </p>
              <p className="text-sm lg:text-base font-normal ">
                Hey there, I'm John Doe - a passionate developer, avid writer,
                and a connoisseur of awesome design. Welcome to my corner of the
                digital world!
              </p>
              <p className="text-sm lg:text-base font-normal ">
                Since the early days of my journey, I've been captivated by the
                art of crafting exceptional digital experiences. As a developer,
                I thrive on turning lines of code into functional and elegant
                solutions. My goal is to not just create software, but to build
                digital marvels that seamlessly merge form and function.
              </p>
              <p className="text-sm lg:text-base font-normal ">
                Since the early days of my journey, I've been captivated by the
                art of crafting exceptional digital experiences. As a developer,
                I thrive on turning lines of code into functional and elegant
                solutions. My goal is to not just create software, but to build
                digital marvels that seamlessly merge form and function.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:gap-6 gap-3  my-6">
              <div className="col-span-1">
                <CursorFirst href="/about-us/fady">
                  <img
                    src="/Fady.png"
                    className="w-full aspect-square rounded-2xl object-cover"
                    alt="Fady image"
                  />
                </CursorFirst>
              </div>
              <div className="col-span-1">
                <CursorFirst>
                  <img
                    src="https://i.pinimg.com/236x/7b/2e/c3/7b2ec32654c71caf015c0e2f01a6d61f.jpg"
                    className="w-full aspect-square rounded-2xl object-cover"
                    alt="Fady image"
                  />
                </CursorFirst>
              </div>
              <div className="col-span-1">
                <CursorFirst>
                  <img
                    src="https://i.pinimg.com/236x/03/a3/47/03a34704e435c10e71514364ac4e5a4f.jpg"
                    className="w-full aspect-square rounded-2xl object-cover"
                    alt="Fady image"
                  />
                </CursorFirst>
              </div>
              <div className="col-span-1">
                <div className="w-full aspect-square rounded-2xl flex justify-center items-center flex-col gap-y-2 bg-muted border-2">
                  <Spotlight className="from-zinc-600 via-zinc-400 to-zinc-200" />
                  <div className="relative z-50 sm:w-24 w-14 aspect-square rounded-full bg-white flex justify-center items-center">
                    <Plus className="sm:size-10 size-6" />
                  </div>
                  <p className="relative z-50 sm:text-xl text-sm font-semibold">
                    Join us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default page;
