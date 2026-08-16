import { getMovie } from "@/lib/movies"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const movie = await getMovie(id)

  if (!movie) {
    return Response.json({ message: "Movie not found" }, { status: 404 })
  }

  return Response.json(movie)
}
