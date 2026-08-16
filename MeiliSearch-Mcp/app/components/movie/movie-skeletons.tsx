import { Skeleton } from "@/components/ui/skeleton"

export function MovieListSkeleton() {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="grid gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
        >
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-5 w-10 rounded-4xl" />
          </div>
          <Skeleton className="h-4 w-28" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </section>
  )
}

export function MovieDetailsSkeleton() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-6 md:grid-cols-[220px_1fr]">
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        <div className="grid content-start gap-6">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-4xl" />
            <Skeleton className="h-5 w-20 rounded-4xl" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-4 w-full max-w-3xl" />
            <Skeleton className="h-4 w-5/6 max-w-3xl" />
            <Skeleton className="h-4 w-2/3 max-w-3xl" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </section>
    </div>
  )
}
