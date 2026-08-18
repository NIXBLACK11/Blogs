import { join } from "node:path"

import { createGoogle } from "@ai-sdk/google"
import { createMCPClient } from "@ai-sdk/mcp"
import { Experimental_StdioMCPTransport } from "@ai-sdk/mcp/mcp-stdio"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const maxDuration = 30

const google = createGoogle({
  apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

function mcpEnv() {
  return {
    MEILISEARCH_URL: process.env.MEILISEARCH_URL ?? "",
    MEILISEARCH_MASTER_KEY: process.env.MEILISEARCH_MASTER_KEY ?? "",
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const mcp = await createMCPClient({
    transport: new Experimental_StdioMCPTransport({
      command: "bun",
      args: ["src/index.ts"],
      cwd: join(process.cwd(), "../mcp"),
      env: mcpEnv(),
      stderr: "pipe",
    }),
  })
  const tools = await mcp.tools()

  const result = streamText({
    model: google(process.env.GEMINI_MODEL ?? "gemini-2.5-flash"),
    system:
      "You are a concise movie assistant. Use search_movies for questions about movies in the local database. Mention the matched movies briefly after using the tool.",
    messages: await convertToModelMessages(messages, { tools }),
    tools,
    stopWhen: isStepCount(3),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      tools,
      onEnd: () => mcp.close(),
    }),
  })
}
