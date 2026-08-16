import {
  bigint,
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const movies = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  originalTitle: text("original_title"),
  tagline: text("tagline"),
  overview: text("overview").notNull(),

  releaseDate: date("release_date", { mode: "string" }),
  runtimeMinutes: integer("runtime_minutes"),
  status: text("status").default("released"),

  genres: text("genres").array().notNull().default([]),
  keywords: text("keywords").array().notNull().default([]),
  languages: text("languages").array().notNull().default([]),
  countries: text("countries").array().notNull().default([]),

  directors: text("directors").array().notNull().default([]),
  writers: text("writers").array().notNull().default([]),
  castMembers: text("cast_members").array().notNull().default([]),

  rating: numeric("rating", { precision: 3, scale: 1, mode: "number" }),
  voteCount: integer("vote_count").default(0),

  budget: bigint("budget", { mode: "number" }),
  revenue: bigint("revenue", { mode: "number" }),

  posterUrl: text("poster_url"),
  backdropUrl: text("backdrop_url"),
  trailerUrl: text("trailer_url"),

  imdbId: text("imdb_id"),
  tmdbId: integer("tmdb_id"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Movie = typeof movies.$inferSelect
export type NewMovie = typeof movies.$inferInsert
