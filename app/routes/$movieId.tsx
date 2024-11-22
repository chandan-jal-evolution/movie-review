import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { getMovieDetail } from "~/services/movies";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.movieId, "Missing movieId");
  const movie = await getMovieDetail(params.movieId);
  const reviews = await prisma.review.findMany({
    where: { movieId: Number(params.movieId) },
    orderBy: { createdAt: "desc" },
  });

  return json({ movie, reviews });
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.movieId, "Missing movieId");
  const formData = await request.formData();
  const review = formData.get("review");
  const rating = formData.get("rating");
  const movieId = params.movieId;

  return prisma.review.create({
    data: {
      review: String(review),
      movieId: Number(movieId),
      rating: Number(rating),
    },
  });
}

export default function MovieDetails() {
  const { movie, reviews } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="mx-auto px-4 md:px-12 max-w-[1240px]">
      <div className="flex mt-7">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="rounded-md w-60"
        />

        <div className="ml-12 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>

          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <Form method="post">
        <input
          type="number"
          name="rating"
          max={5}
          min={0}
          defaultValue={0}
          className="mt-4 px-4 py-2 border"
        />
        <input name="review" className="mt-4 px-4 py-2 border" />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </Form>

      <hr className="my-6" />

      {reviews.map((review) => (
        <div key={review.id} className="mt-4 space-y-2 border p-4">
          <div className="flex items-center">
            {Array.from({ length: review.rating }).map((_, index) => (
              <span key={index}>⭐️</span>
            ))}{" "}
          </div>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
}
