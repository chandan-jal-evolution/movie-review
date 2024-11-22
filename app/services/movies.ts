import { MovieDetail, NowPlayingMoviesResponse } from "~/types/movies.type";

export async function fetchNowPlayingMovies(): Promise<NowPlayingMoviesResponse> {
  const url = process.env.MOVIE_API_URL + "/3/movie/now_playing";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.MOVIE_API_KEY}`,
    },
  };

  const response = await fetch(url, options);
  return response.json();
}

export async function getMovieDetail(id: string): Promise<MovieDetail> {
  const url = process.env.MOVIE_API_URL + `/3/movie/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.MOVIE_API_KEY}`,
    },
  };

  const response = await fetch(url, options);
  return response.json();
}
