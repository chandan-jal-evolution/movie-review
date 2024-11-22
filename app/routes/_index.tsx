import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { fetchNowPlayingMovies } from "~/services/movies";
import type { NowPlayingMoviesResponse } from "~/types/movies.type";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(): Promise<NowPlayingMoviesResponse> {
  return fetchNowPlayingMovies();
}

export default function Index() {
  const { results: movies } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto px-4 mt-8 md:px-12 max-w-[1240px]">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-10">
        {movies.map((movie) => (
          <Link
            to={movie.id.toString()}
            key={movie.id}
            className="block rounded-md space-y-2"
            aria-label={movie.title}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="rounded-md"
            />
            <h3 className="text-md font-bold">{movie.title}</h3>
            <p className="text-sm line-clamp-3">{movie.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
