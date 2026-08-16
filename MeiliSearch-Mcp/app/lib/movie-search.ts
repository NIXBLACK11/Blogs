import type { Movie } from "@/db/schema"
import {
  getMeilisearch,
  getMoviesIndex,
  type MovieSearchDocument,
} from "@/lib/meilisearch"

export function movieToSearchDocument(movie: Movie): MovieSearchDocument {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.originalTitle,
    tagline: movie.tagline,
    overview: movie.overview,
    releaseDate: movie.releaseDate,
    runtimeMinutes: movie.runtimeMinutes,
    genres: movie.genres,
    keywords: movie.keywords,
    languages: movie.languages,
    countries: movie.countries,
    directors: movie.directors,
    writers: movie.writers,
    castMembers: movie.castMembers,
    rating: movie.rating,
    voteCount: movie.voteCount,
    posterUrl: movie.posterUrl,
    imdbId: movie.imdbId,
    tmdbId: movie.tmdbId,
  }
}

export async function indexMovies(movies: Movie[]) {
  const index = getMoviesIndex()
  return index.addDocuments(movies.map(movieToSearchDocument), { primaryKey: "id" })
}

export async function indexMoviesAndWait(movies: Movie[]) {
  const task = await indexMovies(movies)
  await getMeilisearch().tasks.waitForTask(task.taskUid)
  return task
}

export async function searchMovies(query: string) {
  const results = await getMoviesIndex().search(query, {
    attributesToHighlight: ["title", "overview", "directors", "castMembers"],
    limit: 24,
  })

  return results.hits
}
