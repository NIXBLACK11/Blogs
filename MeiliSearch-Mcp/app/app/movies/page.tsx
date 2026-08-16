import { Suspense } from "react"

import { MovieList } from "@/components/movie/movie-list"
import { MovieListSkeleton } from "@/components/movie/movie-skeletons"

export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-8">
          <MovieListSkeleton />
        </main>
      }
    >
      <MovieList />
    </Suspense>
  )
}
