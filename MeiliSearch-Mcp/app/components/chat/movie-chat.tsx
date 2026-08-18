"use client"

import { DefaultChatTransport, type UIMessage } from "ai"
import { Send } from "lucide-react"
import { useState } from "react"
import { useChat } from "@ai-sdk/react"

import { MovieCard } from "@/components/movie/movie-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { MovieRecord } from "@/lib/movie-api"

type ChatMovie = Pick<
  MovieRecord,
  "id" | "title" | "rating" | "releaseDate" | "runtimeMinutes" | "overview" | "genres"
>

function asTextContent(value: unknown) {
  if (!value || typeof value !== "object" || !("content" in value)) return undefined

  const content = (value as { content?: unknown }).content
  if (!Array.isArray(content)) return undefined

  return content.find(
    (item): item is { type: "text"; text: string } =>
      item &&
      typeof item === "object" &&
      "type" in item &&
      item.type === "text" &&
      "text" in item &&
      typeof item.text === "string"
  )?.text
}

function isChatMovie(value: unknown): value is ChatMovie {
  return (
    !!value &&
    typeof value === "object" &&
    "id" in value &&
    "title" in value &&
    "overview" in value &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.overview === "string"
  )
}

function moviesFromToolOutput(output: unknown) {
  const text = asTextContent(output)
  if (!text) return []

  try {
    const parsed: unknown = JSON.parse(text)
    return Array.isArray(parsed) ? parsed.filter(isChatMovie) : []
  } catch {
    return []
  }
}

function MovieToolResult({ output }: { output: unknown }) {
  const movies = moviesFromToolOutput(output)
  if (movies.length === 0) return null

  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

function MessagePart({ part }: { part: UIMessage["parts"][number] }) {
  if (part.type === "text") {
    return <p className="whitespace-pre-wrap text-sm leading-6">{part.text}</p>
  }

  if (
    part.type === "dynamic-tool" &&
    part.toolName === "search_movies" &&
    part.state === "output-available"
  ) {
    return <MovieToolResult output={part.output} />
  }

  if (part.type === "tool-search_movies" && part.state === "output-available") {
    return <MovieToolResult output={part.output} />
  }

  return null
}

export function MovieChat() {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })
  const isSending = status === "submitted" || status === "streaming"

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="border-b pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Movie Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask about movies in your Meilisearch database.
        </p>
      </header>

      <section className="flex flex-1 flex-col gap-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Try: “find space movies” or “show Christopher Nolan films”.
          </p>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "ml-auto max-w-[80%] rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                : "max-w-full"
            }
          >
            {message.parts.map((part, index) => (
              <MessagePart key={`${message.id}-${index}`} part={part} />
            ))}
          </div>
        ))}

        {error ? <p className="text-sm text-destructive">{error.message}</p> : null}
      </section>

      <form
        className="sticky bottom-4 flex gap-2 bg-background py-2"
        onSubmit={(event) => {
          event.preventDefault()
          const text = input.trim()
          if (!text) return

          sendMessage({ text })
          setInput("")
        }}
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          placeholder="Ask for a movie..."
          disabled={isSending}
          className="h-10"
        />
        <Button type="submit" size="lg" disabled={isSending || !input.trim()}>
          <Send />
          Send
        </Button>
      </form>
    </main>
  )
}
