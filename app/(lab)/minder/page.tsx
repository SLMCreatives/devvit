"use client";
import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { motion, useMotionValue, animate } from "framer-motion";
import {
  Check,
  CheckIcon,
  ChevronsUpDown,
  LinkIcon,
  PopcornIcon,
} from "lucide-react";

import { Button } from "Sulaiman/S/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "Sulaiman/S/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "Sulaiman/S/components/ui/command";
import { cn } from "Sulaiman/S/lib/utils";
import { ThemeToggle } from "../../_components/ThemeToggle";
import { MovieCard } from "./components/MovieCard";
import Loading from "../loading";

const initialItems = [0, 1, 2, 3, 4];
const height = 70;
const padding = 10;
const size = 150;

const genres_names = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV-Film",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export default function Minder() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genre, setGenre] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  function handleReset() {
    setMovies([]);
    setPage(0);
    setGenre("");
  }

  function handleLoad(page: number, genre: string) {
    const options3 = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-MY&page=${page}&with_genres=${genre}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmJkY2MzNGY0MDI1NGRiZDZmODczNWE1ZGQ3Y2E4MCIsIm5iZiI6MTcyMTI1MTE2My4wMzYyMjcsInN1YiI6IjY2OTgzNDc5ODY5MGZiOTBjNWI0ZDEyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMouRlRyZUNugIqcf_5v6k2CjT8Dla822jRUsx9obKA",
      },
    };
    axios
      .request(options3)
      .then(function (response) {
        const movies = response.data.results;
        setMovies(movies);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const y = useMotionValue(0);
  const scrollContainer = 150;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  async function onDelete(index: number, movie: any) {
    const newMovies = [...movies];
    newMovies.splice(index, 1);

    const newScrollHeight = getHeight(newMovies);
    const bottomOffset = -y.get() + scrollContainer;
    const bottomWillBeVisible = newScrollHeight < bottomOffset;
    const isScrollHeightLarger = newScrollHeight >= scrollContainer;

    if (bottomWillBeVisible && isScrollHeightLarger) {
      animate(y, -newScrollHeight + scrollContainer);
    }

    setMovies(newMovies);
  }

  const search = (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between dark:bg-slate-950 dark:hover:text-slate-200"
        >
          {value
            ? genres_names.find((genre) => genre.name === value)?.name
            : "Select genre..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-10 w-[80vw] dark:bg-slate-950">
        <Command>
          <CommandInput
            placeholder="Search genre..."
            className="focus:outline-none"
          />
          <CommandEmpty>No genre found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {genres_names.map((genre) => (
                <CommandItem
                  className="p-1 "
                  key={genre.id}
                  value={genre.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setGenre(currentValue);
                    setPage(1);
                    handleLoad(page, genre.id.toString());
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === genre.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {genre.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Command></Command>
        </Command>
      </PopoverContent>
    </Popover>
  );
  return (
    <main className="w-full h-[100vh] overflow-hidden">
      <div className="w-full absolute z-10">
        <ThemeToggle />
        {movies.length !== 0 && <ResetMovies />}
      </div>
      <div className="w-full">
        <div className="flex flex-col p-6 lg:pt-20 pb-2 lg:items-center justify-center bg-white dark:bg-black text-slate-900 dark:text-white">
          <h1 className="font-black text-6xl">Movie Search by Genre</h1>
        </div>

        {movies.length === 0 && (
          <div className="flex flex-col p-6 lg:pt-20 pb-2 lg:items-center justify-center bg-white dark:bg-black text-slate-900 dark:text-white">
            {search}
          </div>
        )}

        {/* Movies Cards */}
        <section className="flex flex-col min-h-[90vh] p-6 lg:px-64 lg:pt-20  justify-top bg-white dark:bg-gradient-to-b dark:from-black dark:to-slate-700 text-slate-900 dark:text-white relative items-left">
          {movies.length !== 0 && (
            <Suspense fallback={<Loading />}>
              <div
                className="grid grid-cols-1 p-1 lg:px-56 justify-center"
                key={page}
              >
                {/* <h3 className=" text-2xl font-semibold mb-4">Search Results</h3> */}
                <div className="overflow-x-clip overflow-scroll-none scrollbar-hide h-[620px] ">
                  <MovieCard
                    movies={movies}
                    total={movies.length}
                    onDelete={onDelete}
                    key={movies.length}
                  />
                </div>
              </div>
            </Suspense>
          )}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs opacity-50">
              *This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function getHeight(movies: any) {
  const totalHeight = movies.length * height;
  const totalPadding = (movies.length - 1) * padding;
  const totalScroll = totalHeight + totalPadding;
  return totalScroll;
}

function useConstraints(movies: any) {
  const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    setConstraints({ top: size - getHeight(movies), bottom: 0 });
  }, [movies]);

  return constraints;
}

function ResetMovies() {
  return (
    <motion.button
      className="text-sm absolute top-10 right-4"
      initial={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      onClick={() => {
        window.location.reload();
      }}
    >
      <XMarkIcon className="w-[1.2rem] h-[1.2rem] inline text-red-500" />
    </motion.button>
  );
}
