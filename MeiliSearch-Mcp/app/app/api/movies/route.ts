import { createMovie, listMovies, movieFromFormData } from "@/lib/movies"
import { indexMoviesAndWait } from "@/lib/movie-search"

export const dynamic = "force-dynamic"

export async function GET() {
  return Response.json(await listMovies())
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? ""
  const movie =
    contentType.includes("application/json")
      ? await createMovie(await request.json())
      : await createMovie(movieFromFormData(await request.formData()))

  await indexMoviesAndWait([movie])

  return Response.json(movie, { status: 201 })
}
