"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { AddMovieDialog } from "@/app/movies/add-movie-dialog"
import { useMovieSearch, useMovies } from "@/hooks/use-movies"
import type { MovieRecord } from "@/lib/movie-api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MovieListSkeleton } from "@/components/movie/movie-skeletons"

export function MovieList() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")?.trim() ?? ""
  const movies = useMovies()
  const search = useMovieSearch(query)
  const activeQuery = query.length > 0
  const activeMovies = activeQuery ? search : movies

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-8">
      <MoviePageHeader />
      <MovieSearchForm query={query} />

      {activeMovies.isPending ? <MovieListSkeleton /> : null}
      {activeMovies.isError ? (
        <MovieError message={activeMovies.error.message} />
      ) : null}
      {activeMovies.isSuccess && activeMovies.data.length === 0 ? (
        <EmptyMovies query={activeQuery ? query : undefined} />
      ) : null}
      {activeMovies.isSuccess && activeMovies.data.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {activeMovies.data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : null}
    </main>
  )
}

function MovieSearchForm({ query }: { query: string }) {
  return (
    <form action="/movies" className="flex gap-2">
      <Input
        name="q"
        defaultValue={query}
        placeholder="Search movies, directors, cast..."
        className="h-10"
      />
      <Button type="submit" size="lg">
        <Search />
        Search
      </Button>
    </form>
  )
}

function MoviePageHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Movies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse the database or add a new title.
        </p>
      </div>
      <AddMovieDialog />
    </header>
  )
}

type MovieCardMovie = Pick<
  MovieRecord,
  "id" | "title" | "rating" | "releaseDate" | "runtimeMinutes" | "overview" | "genres"
>

export function MovieCard({ movie }: { movie: MovieCardMovie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="block">
      <Card className="h-full transition-colors hover:bg-muted/40">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg">{movie.title}</CardTitle>
            {movie.rating ? (
              <Badge variant="outline">{movie.rating.toFixed(1)}</Badge>
            ) : null}
          </div>
          <CardDescription>
            {[
              movie.releaseDate?.slice(0, 4),
              movie.runtimeMinutes && `${movie.runtimeMinutes}m`,
            ]
              .filter(Boolean)
              .join(" / ") || "Details pending"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {movie.overview}
          </p>
          {movie.genres.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.slice(0, 3).map((genre) => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  )
}

function EmptyMovies({ query }: { query?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{query ? "No search results" : "No movies yet"}</CardTitle>
        <CardDescription>
          {query
            ? `No movies matched "${query}".`
            : "Add the first movie to get started."}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

function MovieError({ message }: { message: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Could not load movies</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
    </Card>
  )
}
