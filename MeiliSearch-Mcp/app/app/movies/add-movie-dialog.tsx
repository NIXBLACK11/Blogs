"use client"

import { Plus } from "lucide-react"

import { MovieForm } from "@/components/movie/movie-form"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AddMovieDialog() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        <Plus />
        Add movie
      </DialogTrigger>
      <DialogContent className="h-[90svh] max-h-[90svh] w-[90vw] max-w-[90vw] gap-0 overflow-hidden rounded-xl p-0 sm:max-w-[90vw]">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Add movie
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Create a movie entry in the database.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto px-6 py-6">
          <MovieForm
            cancel={
              <DialogClose className={buttonVariants({ variant: "outline" })}>
                Cancel
              </DialogClose>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
