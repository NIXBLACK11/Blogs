import { indexMovies } from "@/lib/movie-search"
import { listMovies } from "@/lib/movie-store"

const movies = await listMovies()
const task = await indexMovies(movies)

console.log(`Queued ${movies.length} movies for Meilisearch indexing.`)
console.log("Indexing task:", task)
