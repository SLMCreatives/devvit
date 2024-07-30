"use client";
import * as React from "react";
import { Key } from "react";
import {
  ClockIcon,
  PlayIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion, useAnimate } from "framer-motion";
import { ExternalLinkIcon, Star } from "lucide-react";

const variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

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

export function MovieCard({ movies, index, onDelete }: any) {
  const [scope, animate] = useAnimate();

  function handleDragEnd(_: any, info: any) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      animate(scope.current, { x: "-100%" }, { duration: 0.2 });
      setTimeout(() => onDelete(scope.current.index), 200);
    } else {
      animate(scope.current, { x: 0, opacity: 1 }, { duration: 0.5 });
    }
  }
  return (
    <motion.div>
      {movies.length !== 0 &&
        movies?.map((movie: any) => (
          <motion.div
            className="grid grid-cols-1 gap-36 p-6 pb-52"
            whileTap={{ cursor: "grabbing" }}
            layout
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 30,
            }}
          >
            <motion.div
              className="p-6 flex flex-col justify-top bg-slate-50 ring-1 ring-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl group shadow-xl dark:shadow-gray-500/50 max-h-[600px]"
              variants={variants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              drag="x"
              dragDirectionLock
              onDragEnd={handleDragEnd}
              ref={scope}
              viewport={{ once: true }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 absolute mt-4 ml-4 text-md">
                  <span className=" bg-slate-950/50 px-3 py-1 text-nowrap rounded-xl text-white font-black">
                    {movie.vote_average.toFixed(1) * 10}%
                  </span>
                </div>
                <img
                  className="rounded-lg ring-1 ring-slate-300 dark:ring-slate-700 shadow-md"
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                  }
                  alt={movie.title}
                  width={500}
                  height={300}
                />
              </div>

              <div
                className="flex flex-col gap-4 mt-4 justify-center items-ceenter"
                key={movie.title}
              >
                <p className=" text-2xl font-bold   ">
                  {movie.title}{" "}
                  <span className="opacity-50 font-medium text-lg">
                    ({movie.release_date.slice(0, 4)})
                  </span>
                </p>

                <div className=" text-xs flex flex-wrap gap-2 overflow-auto scrollbar-hide">
                  {movie.genre_ids.map((genreId: Key | null | undefined) => {
                    const genre = genres_names.find(
                      (items) => items.id === genreId
                    );
                    return (
                      <span
                        className="bg-slate-200 dark:bg-slate-700 px-3 py-1 text-nowrap rounded-xl"
                        key={genreId}
                      >
                        {genre ? genre.name : "Unknown"}
                      </span>
                    );
                  })}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <p className="col-span-3 text-sm font-light line-clamp-5 ">
                    {movie.overview}
                  </p>
                  <div className="flex flex-col gap-2 justify-center items-around">
                    <div className="flex flex-col-2 items-center justify-left gap-2">
                      <ClockIcon className="w-6 h-6 inline opacity-50" />
                      <p className=" text-sm font-light">2h 30m</p>
                    </div>
                    <div className="flex flex-col-2 items-center justify-left gap-2">
                      <StarIcon className="w-6 h-6 inline opacity-50" />
                      <p className=" text-sm font-light">
                        {(movie.vote_average * 10).toFixed(0)} %
                      </p>
                    </div>
                    <div className="flex flex-col-2 items-center justify-left gap-2">
                      <ExternalLinkIcon className="w-6 h-6 inline opacity-50" />
                      <a
                        href={
                          `https://www.themoviedb.org/movie/${movie.id}` +
                          `_blank`
                        }
                        className=" text-sm font-light"
                      >
                        TMDB
                      </a>
                    </div>
                  </div>
                </div>
                {/*  <div className="flex flex-col gap-2">
                  <p className=" text-sm font-light">
                    {movie.overview.slice(0, 150)}
                  </p>
                </div> */}

                {/* <div className="grid grid-cols-6 gap-2 mt-2">
                  <button
                    className="text-red-700 dark:text-red-200 hover:bg-red-100 font-bold py-3 rounded-xl col-span-2"
                    onClick={() => onDelete(scope.current.index)}
                  >
                    <XMarkIcon className="w-6 h-6 inline" />
                  </button>
                  <button
                    className="dark:text-slate-100 text-sm py-3 rounded-xl col-span-2 hover:bg-slate-200 "
                    onClick={() =>
                      window.open(
                        `https://www.themoviedb.org/movie/${movie.id}` +
                          `_blank`
                      )
                    }
                  >
                    <PlayIcon className="w-6 h-6 inline text-green-700" />
                  </button>
                  <button
                    className="dark:text-slate-100 text-sm py-3 rounded-xl col-span-2 hover:bg-slate-200 "
                    onClick={() =>
                      window.open(
                        `https://www.themoviedb.org/movie/${movie.id}` +
                          `_blank`
                      )
                    }
                  >
                    <ExternalLinkIcon className="w-4 h-4 inline" />
                  </button>
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        ))}{" "}
    </motion.div>
  );
}
