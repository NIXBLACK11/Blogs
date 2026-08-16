import { MovieDetails } from "@/components/movie/movie-details"

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <MovieDetails id={id} />
}
