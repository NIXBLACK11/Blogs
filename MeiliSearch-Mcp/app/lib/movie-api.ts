import type { Movie, NewMovie } from "@/db/schema"

export type MovieRecord = Omit<Movie, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message ?? "Something went wrong.")
  }

  return data as T
}

export async function fetchMovies() {
  const response = await fetch("/api/movies")
  return parseResponse<MovieRecord[]>(response)
}

export async function fetchMovie(id: string) {
  const response = await fetch(`/api/movies/${id}`)
  return parseResponse<MovieRecord>(response)
}

export async function searchMoviesRequest(query: string) {
  const response = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`)
  return parseResponse<MovieRecord[]>(response)
}

export async function createMovieRequest(movie: NewMovie) {
  const response = await fetch("/api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })

  return parseResponse<MovieRecord>(response)
}
