import { searchMovies } from "@/lib/movie-search"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    return Response.json([])
  }

  return Response.json(await searchMovies(query))
}
