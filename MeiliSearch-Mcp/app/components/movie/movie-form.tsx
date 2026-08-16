"use client"

import { Save } from "lucide-react"

import { useCreateMovie } from "@/hooks/use-movies"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function MovieForm({ cancel }: { cancel: React.ReactNode }) {
  const createMovie = useCreateMovie()

  return (
    <form
      action={(formData) => createMovie.mutate(formData)}
      className="grid gap-6"
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required disabled={createMovie.isPending} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          name="overview"
          required
          disabled={createMovie.isPending}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Original title" name="originalTitle" disabled={createMovie.isPending} />
        <Field label="Tagline" name="tagline" disabled={createMovie.isPending} />
        <Field label="Release date" name="releaseDate" type="date" disabled={createMovie.isPending} />
        <Field label="Runtime minutes" name="runtimeMinutes" type="number" disabled={createMovie.isPending} />
        <Field label="Rating" name="rating" type="number" step="0.1" disabled={createMovie.isPending} />
        <Field label="Vote count" name="voteCount" type="number" disabled={createMovie.isPending} />
        <Field label="Budget" name="budget" type="number" disabled={createMovie.isPending} />
        <Field label="Revenue" name="revenue" type="number" disabled={createMovie.isPending} />
        <Field label="Poster URL" name="posterUrl" type="url" disabled={createMovie.isPending} />
        <Field label="Trailer URL" name="trailerUrl" type="url" disabled={createMovie.isPending} />
        <Field label="IMDb ID" name="imdbId" disabled={createMovie.isPending} />
        <Field label="TMDB ID" name="tmdbId" type="number" disabled={createMovie.isPending} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Genres" name="genres" placeholder="Action, Drama" disabled={createMovie.isPending} />
        <Field label="Keywords" name="keywords" placeholder="space, mystery" disabled={createMovie.isPending} />
        <Field label="Languages" name="languages" placeholder="English" disabled={createMovie.isPending} />
        <Field label="Countries" name="countries" placeholder="United States" disabled={createMovie.isPending} />
        <Field label="Directors" name="directors" disabled={createMovie.isPending} />
        <Field label="Writers" name="writers" disabled={createMovie.isPending} />
        <Field label="Cast" name="castMembers" disabled={createMovie.isPending} />
        <Field label="Status" name="status" placeholder="released" disabled={createMovie.isPending} />
      </div>

      <div className="flex justify-end gap-2 border-t pt-6">
        {cancel}
        <Button type="submit" disabled={createMovie.isPending}>
          <Save />
          Save movie
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  ...props
}: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
    </div>
  )
}
