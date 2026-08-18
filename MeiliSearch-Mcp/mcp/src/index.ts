import { createMcpHandler, McpServer } from "@modelcontextprotocol/server"
import { z } from "zod/v4"

import { meilisearch } from "./meilisearch"

function createMoviesSearchServer() {
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
      console.log(results)
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

  return server
}

const mcpHandler = createMcpHandler(createMoviesSearchServer, {
  onerror: (error) => {
    console.error("MCP server error:", error)
  },
})

const port = Number(process.env.MCP_PORT ?? 8787)

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/health") {
      return Response.json({ ok: true })
    }

    if (url.pathname === "/mcp") {
      return mcpHandler.fetch(request)
    }

    return new Response("Not found", { status: 404 })
  },
})

console.log(`MCP HTTP server listening on http://localhost:${port}/mcp`)
