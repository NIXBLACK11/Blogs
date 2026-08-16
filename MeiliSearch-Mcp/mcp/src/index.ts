import { meilisearch } from "./meilisearch"

const index = meilisearch.index("movies")
const query = process.argv.slice(2).join(" ").trim()

if (query) {
  const results = await index.search(query)
  console.log(results.hits)
} else {
  console.log("Meilisearch movies index is ready.")
  console.log("Run `bun src/index.ts space` to try a search.")
}
