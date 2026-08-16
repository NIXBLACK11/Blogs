"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  createMovieRequest,
  fetchMovie,
  fetchMovies,
  searchMoviesRequest,
  type MovieRecord,
} from "@/lib/movie-api"
import type { NewMovie } from "@/db/schema"

const moviesKey = ["movies"] as const

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

export function useMovies() {
  return useQuery({
    queryKey: moviesKey,
    queryFn: fetchMovies,
  })
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: [...moviesKey, id],
    queryFn: () => fetchMovie(id),
  })
}

export function useMovieSearch(query: string) {
  const trimmedQuery = query.trim()

  return useQuery({
    queryKey: [...moviesKey, "search", trimmedQuery],
    queryFn: () => searchMoviesRequest(trimmedQuery),
    enabled: trimmedQuery.length > 0,
  })
}

export function useCreateMovie() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (formData: FormData) => createMovieRequest(movieFromFormData(formData)),
    onMutate: () => toast.loading("Saving movie..."),
    onSuccess: async (movie: MovieRecord, _variables, toastId) => {
      toast.success("Movie saved.", { id: toastId })
      await queryClient.invalidateQueries({ queryKey: moviesKey })
      queryClient.setQueryData([...moviesKey, movie.id], movie)
      router.push(`/movies/${movie.id}`)
    },
    onError: (error, _variables, toastId) => {
      toast.error(error.message, { id: toastId })
    },
  })
}
