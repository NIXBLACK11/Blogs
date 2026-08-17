import { McpServer } from "@modelcontextprotocol/server"
import { serveStdio } from "@modelcontextprotocol/server/stdio"
import { z } from "zod/v4"

import { meilisearch } from "./meilisearch"

const server = new McpServer({
  name: "movies-search",
  version: "1.0.0",
})

server.registerTool(
  "search_movies",
  {
    description:
      "Search the movie database. Use this to find movies by title, description, genre, director, cast, or other movie information.",
    inputSchema: z.object({
      query: z.string().describe("The movie search query"),
    }),
  },
  async ({ query }) => {
    const results = await meilisearch.index("movies").search(query, {
      limit: 10,
    })

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results.hits),
        },
      ],
    }
  },
)

await serveStdio(() => server)
