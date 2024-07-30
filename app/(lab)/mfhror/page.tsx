"use client";

import * as React from "react";
import { ArrowBigRight, Moon, Star, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../../../S/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../S/components/ui/dropdown-menu";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@mui/material";
import { ArrowRightCircleIcon, StarIcon } from "@heroicons/react/24/outline";

export default function ModeToggle() {
  return (
    <main>
      <div className="flex flex-col gap-2 bg-white dark:bg-black dark:text-slate-50">
        <div className="absolute top-2 left-2 flex flex-row items-center justify-between h-[1rem] z-10 gap-4 p-4 bg-white dark:bg-black rounded-full">
          <h1 className="uppercase ">Mfhror.com</h1>
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-1 gap-10 items-center justify-center pl-6 py-4 lg:px-24">
          <div className="flex flex-col items-center justify-center ">
            <ReviewCard />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-md text-sm uppercase opacity-70">
              TTDI <ArrowRightCircleIcon className="w-5 h-5 inline ml-4" />
            </p>
            <Poloroid />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-md text-sm uppercase opacity-70">
              Ampang <ArrowRightCircleIcon className="w-5 h-5 inline ml-4" />
            </p>
            <Poloroid />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-md text-sm uppercase opacity-70">
              Kota Damansara
              <ArrowRightCircleIcon className="w-5 h-5 inline ml-4" />
            </p>
            <Poloroid />
          </div>
        </div>
      </div>
    </main>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="relative w-[1.2rem] h-[1.2rem]"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-900 bg-white ring-0 focus:none" />
          <Moon className="absolute  w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-200 bg-black  focus:none" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-slate-900 bg-white p-2 flex flex-col gap-2 rounded-md absolute isolate top-2 left-2"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ReviewCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="absolute p-8 right-0 top-4">
        <Button
          className="fixed top-4 right-2 hover:bg-slate-100 bg-slate-50 dark:hover:bg-slate-900 dark:bg-slate-700"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Add Review
        </Button>
        {open === true && (
          <div className="absolute top-10 right-2 z-10">
            <div className="w-[20em] h-auto border border-black dark:border-slate-200/50 dark:shadow-white dark:shadow-sm dark:bg-slate-900 rounded-md p-2 bg-white shadow-xl">
              <Button
                className="absolute top-2 right-1 bg-white dark:bg-slate-900 dark:text-white"
                variant="default"
                onClick={() => setOpen(false)}
              >
                X
              </Button>
              <motion.form
                className="flex flex-col gap-2 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <label htmlFor="photo">Upload Photo</label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  className="w-full px-1"
                />
                <label htmlFor="review">Review</label>
                <textarea
                  name="review"
                  id="review"
                  rows={5}
                  className="w-full border border-black dark:border-slate-200/50 rounded-md px-1 "
                ></textarea>
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  max={10}
                  name="rating"
                  id="rating"
                  className="w-full border border-black dark:border-slate-200/50 rounded-md h-10 px-1"
                />
                <label htmlFor="name">Restaurant</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full border border-black dark:border-slate-200/50 rounded-md h-10 px-1"
                />
                <Button
                  type="submit"
                  variant={"outline"}
                  className="w-full mt-4 border border-black dark:border-slate-200/50 dark:text-slate-50 dark:hover:bg-slate-900 dark:bg-slate-700"
                >
                  Submit
                </Button>
              </motion.form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const reviews = [
  { name: "OAK", rating: 8, review: "Terbaek!", id: 1 },
  {
    name: "Bhai Jaans",
    rating: 10,
    review: "Wonderful pakistani food",
    id: 2,
    imgsrc:
      "https://images.unsplash.com/photo-1690915475901-6c08af925906?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Simply Ribs",
    rating: 8.3,
    review: "Great steak!",
    id: 3,
    imgsrc:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Simply Ribs",
    rating: 8.3,
    review: "Great steak!",
    id: 3,
    imgsrc:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  { name: "OAK", rating: 8, review: "Terbaek!", id: 1 },
  {
    name: "Bhai Jaans",
    rating: 10,
    review: "Wonderful pakistani food",
    id: 2,
    imgsrc:
      "https://images.unsplash.com/photo-1690915475901-6c08af925906?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Simply Ribs",
    rating: 8.3,
    review: "Great steak!",
    id: 3,
    imgsrc:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Simply Ribs",
    rating: 8.3,
    review: "Great steak!",
    id: 3,
    imgsrc:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
function Poloroid() {
  return (
    <div className="flex gap-4 items-center justify-start overflow-x-scroll scrollbar-hide ">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <div className="w-[14rem] h-[auto] border border-black dark:border-slate-200/50 dark:shadow-white dark:shadow-sm dark:bg-slate-900 rounded-md">
            <div className="flex flex-col gap-4 p-4 items-left justify-center">
              <img
                className="w-full h-[16rem] object-cover rounded-md border border-black dark:border-slate-200/50 dark:shadow-white dark:shadow-sm dark:bg-slate-900"
                src={
                  review.imgsrc ||
                  "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&h=8000&auto=format&fit=crop"
                }
                alt="photo"
                width={500}
                height={1000}
              />
              <div className="flex flex-col gap-2">
                <em className="text-sm lowercase">{review.review}</em>
                {review.rating && (
                  <p>
                    {review.rating}{" "}
                    <StarIcon className="h-4 w-4 text-yellow-500 inline" />
                  </p>
                )}
                <h1 className="text-xs font-semibold text-right opacity-50">
                  @ {review.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
