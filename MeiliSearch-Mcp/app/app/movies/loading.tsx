import { MovieListSkeleton } from "@/components/movie/movie-skeletons"
import { Skeleton } from "@/components/ui/skeleton"

export default function MoviesLoading() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div className="grid gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </header>
      <MovieListSkeleton />
    </main>
  )
}
