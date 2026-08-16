import { Meilisearch } from "meilisearch"

export const MOVIES_INDEX = "movies"

export type MovieSearchDocument = {
  id: string
  title: string
  originalTitle: string | null
  tagline: string | null
  overview: string
  releaseDate: string | null
  runtimeMinutes: number | null
  genres: string[]
  keywords: string[]
  languages: string[]
  countries: string[]
  directors: string[]
  writers: string[]
  castMembers: string[]
  rating: number | null
  voteCount: number | null
  posterUrl: string | null
  imdbId: string | null
  tmdbId: number | null
}

export function getMeilisearch() {
  const host = process.env.MEILISEARCH_URL
  const apiKey = process.env.MEILISEARCH_MASTER_KEY

  if (!host || !apiKey) {
    throw new Error("MEILISEARCH_URL and MEILISEARCH_MASTER_KEY are required.")
  }

  return new Meilisearch({ host, apiKey })
}

export function getMoviesIndex() {
  return getMeilisearch().index<MovieSearchDocument>(MOVIES_INDEX)
}
