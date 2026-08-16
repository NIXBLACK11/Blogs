"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

import { AddMovieDialog } from "@/app/movies/add-movie-dialog"
import { useMovie } from "@/hooks/use-movies"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MovieDetailsSkeleton } from "@/components/movie/movie-skeletons"

export function MovieDetails({ id }: { id: string }) {
  const movie = useMovie(id)

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <Link
            href="/movies"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "-ml-2 mb-3",
            })}
          >
            <ArrowLeft />
            Movies
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">
            {movie.data?.title ?? "Movie"}
          </h1>
          {movie.data?.tagline ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {movie.data.tagline}
            </p>
          ) : null}
        </div>
        <AddMovieDialog />
      </header>

      {movie.isPending ? <MovieDetailsSkeleton /> : null}
      {movie.isError ? <MovieDetailsError message={movie.error.message} /> : null}
      {movie.isSuccess ? (
        <>
          <section className="grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="overflow-hidden rounded-lg border bg-muted">
              {movie.data.posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={movie.data.posterUrl}
                  alt={`${movie.data.title} poster`}
                  className="aspect-[2/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center px-6 text-center text-sm text-muted-foreground">
                  No poster
                </div>
              )}
            </div>

            <div className="grid gap-6">
              <div className="flex flex-wrap gap-2">
                {movie.data.genres.map((genre) => (
                  <Badge key={genre}>{genre}</Badge>
                ))}
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                {movie.data.overview}
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Released" value={movie.data.releaseDate ?? "Unknown"} />
                <Stat
                  label="Runtime"
                  value={
                    movie.data.runtimeMinutes
                      ? `${movie.data.runtimeMinutes} min`
                      : "Unknown"
                  }
                />
                <Stat
                  label="Rating"
                  value={movie.data.rating ? movie.data.rating.toFixed(1) : "Unrated"}
                />
                <Stat
                  label="Votes"
                  value={movie.data.voteCount?.toLocaleString() ?? "0"}
                />
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Info
              title="People"
              rows={[
                ["Directors", movie.data.directors],
                ["Writers", movie.data.writers],
                ["Cast", movie.data.castMembers],
              ]}
            />
            <Info
              title="Metadata"
              rows={[
                ["Languages", movie.data.languages],
                ["Countries", movie.data.countries],
                ["Keywords", movie.data.keywords],
                ["IMDb", movie.data.imdbId],
                ["TMDB", movie.data.tmdbId?.toString()],
              ]}
            />
          </section>

          {movie.data.trailerUrl ? (
            <Link
              href={movie.data.trailerUrl}
              target="_blank"
              className={buttonVariants({ variant: "outline", className: "w-fit" })}
            >
              <ExternalLink />
              Trailer
            </Link>
          ) : null}
        </>
      ) : null}
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-xl font-semibold">{value}</CardContent>
    </Card>
  )
}

function Info({
  title,
  rows,
}: {
  title: string
  rows: Array<[string, string | string[] | null | undefined]>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        {rows.map(([label, value]) => {
          const text = Array.isArray(value) ? value.join(", ") : value

          return (
            <div key={label} className="grid gap-1">
              <div className="text-muted-foreground">{label}</div>
              <div>{text || "None"}</div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function MovieDetailsError({ message }: { message: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Could not load movie</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{message}</CardContent>
    </Card>
  )
}
