import { Meilisearch } from "meilisearch"

const host = process.env.MEILISEARCH_URL
const apiKey = process.env.MEILISEARCH_MASTER_KEY

if (!host || !apiKey) {
  throw new Error("MEILISEARCH_URL and MEILISEARCH_MASTER_KEY are required.")
}

export const meilisearch = new Meilisearch({ host, apiKey })
