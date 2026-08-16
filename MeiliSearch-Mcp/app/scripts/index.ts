import "dotenv/config"

import { db } from "../db"
import { movies } from "../db/schema"

const seedMovies: Array<typeof movies.$inferInsert> = [
  {
    title: "Spirited Away",
    originalTitle: "Sen to Chihiro no Kamikakushi",
    tagline: "The tunnel led Chihiro to a mysterious town.",
    overview:
      "A young girl enters a hidden spirit world and must find the courage to save her parents and return home.",
    releaseDate: "2001-07-20",
    runtimeMinutes: 125,
    genres: ["Animation", "Adventure", "Fantasy"],
    keywords: ["spirit world", "coming of age", "rescue"],
    languages: ["Japanese"],
    countries: ["Japan"],
    directors: ["Hayao Miyazaki"],
    writers: ["Hayao Miyazaki"],
    castMembers: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    rating: 8.6,
    voteCount: 9000,
    budget: 19000000,
    revenue: 395800000,
    posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    imdbId: "tt0245429",
    tmdbId: 129,
  },
  {
    title: "The Matrix",
    tagline: "Welcome to the Real World.",
    overview:
      "A hacker discovers that reality is a simulated prison and joins a rebellion against its controllers.",
    releaseDate: "1999-03-31",
    runtimeMinutes: 136,
    genres: ["Action", "Science Fiction"],
    keywords: ["simulation", "artificial intelligence", "chosen one"],
    languages: ["English"],
    countries: ["United States"],
    directors: ["Lana Wachowski", "Lilly Wachowski"],
    writers: ["Lana Wachowski", "Lilly Wachowski"],
    castMembers: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    rating: 8.7,
    voteCount: 26000,
    budget: 63000000,
    revenue: 467200000,
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    imdbId: "tt0133093",
    tmdbId: 603,
  },
]

await db.insert(movies).values(seedMovies)

console.log(`Seeded ${seedMovies.length} movies.`)
