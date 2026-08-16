import { MovieDetailsSkeleton } from "@/components/movie/movie-skeletons"
import { Skeleton } from "@/components/ui/skeleton"

export default function MovieDetailsLoading() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div className="grid gap-3">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </header>
      <MovieDetailsSkeleton />
    </main>
  )
}
