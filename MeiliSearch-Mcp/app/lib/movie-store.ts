import { desc, eq } from "drizzle-orm"

import { db } from "@/db"
import { movies, type NewMovie } from "@/db/schema"

function textValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

function numberValue(formData: FormData, key: string) {
  const value = textValue(formData, key)
  if (!value) return undefined

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function listValue(formData: FormData, key: string) {
  return (
    textValue(formData, key)
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? []
  )
}

export function movieFromFormData(formData: FormData): NewMovie {
  const title = textValue(formData, "title")
  const overview = textValue(formData, "overview")

  if (!title || !overview) {
    throw new Error("Title and overview are required.")
  }

  return {
    title,
    overview,
    originalTitle: textValue(formData, "originalTitle"),
    tagline: textValue(formData, "tagline"),
    releaseDate: textValue(formData, "releaseDate"),
    runtimeMinutes: numberValue(formData, "runtimeMinutes"),
    status: textValue(formData, "status") ?? "released",
    genres: listValue(formData, "genres"),
    keywords: listValue(formData, "keywords"),
    languages: listValue(formData, "languages"),
    countries: listValue(formData, "countries"),
    directors: listValue(formData, "directors"),
    writers: listValue(formData, "writers"),
    castMembers: listValue(formData, "castMembers"),
    rating: numberValue(formData, "rating"),
    voteCount: numberValue(formData, "voteCount"),
    budget: numberValue(formData, "budget"),
    revenue: numberValue(formData, "revenue"),
    posterUrl: textValue(formData, "posterUrl"),
    backdropUrl: textValue(formData, "backdropUrl"),
    trailerUrl: textValue(formData, "trailerUrl"),
    imdbId: textValue(formData, "imdbId"),
    tmdbId: numberValue(formData, "tmdbId"),
  }
}

export async function listMovies() {
  return db.select().from(movies).orderBy(desc(movies.createdAt))
}

export async function getMovie(id: string) {
  const [movie] = await db.select().from(movies).where(eq(movies.id, id)).limit(1)
  return movie
}

export async function createMovie(movie: NewMovie) {
  const [created] = await db.insert(movies).values(movie).returning()
  return created
}
