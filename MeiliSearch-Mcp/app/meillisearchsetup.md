we haev to add meilli search to our next as well as mcp repo
the mcp will have just the setup rn the next will have setup + seeding it with the postgresql data script + and endpoint that uses it to search too
keep this initial steps in mind

make env.example for both too
### 1. Create the repo

```bash
cd mcp

git init
bun init -y
```

Install Meilisearch:

```bash
bun add meilisearch
bun add -d typescript @types/bun
```

### 3. Add `.env`

```env
MEILISEARCH_URL=http://localhost:7700
MEILISEARCH_MASTER_KEY=local-master-key
```

And make sure you have:

```gitignore
.env
meili_data/
node_modules/
```

### 4. Create a tiny structure

```text
mcp/
│
├── src/
│   ├── meilisearch.ts
│   └── index.ts
│
├── meili_data/
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

### 5. `src/meilisearch.ts`

Create the client:

```ts
import { MeiliSearch } from "meilisearch";

export const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_URL!,
  apiKey: process.env.MEILISEARCH_MASTER_KEY!,
});
```

That's basically all the SDK setup you need.

### 6. Add a few movies

For now, put everything in `src/index.ts`:

```ts
import { meilisearch } from "./meilisearch";

const movies = from psotgresql

async function main() {
  const index = meilisearch.index("movies");

  const task = await index.addDocuments(movies);

  console.log("Indexing task:", task);
}

main();
```

Then:

```bash
bun src/index.ts
```

Meilisearch's indexing operations are asynchronous, so `addDocuments()` returns a task rather than meaning the documents have necessarily finished indexing at that exact instant. ([Meilisearch][3])

### 7. Search it

Now change `main()`:

```ts
async function main() {
  const index = meilisearch.index("movies");

  const results = await index.search("space");

  console.log(results.hits);
}
```

Run:

```bash
bun src/index.ts
```

You should get something containing **Interstellar** and probably **Dune**, depending on ranking.

Try deliberately bad searches too:

```ts
await index.search("intersteler");
```

or:

```ts
await index.search("christopher nolan");
```

Meilisearch's typo-tolerant full-text search is one of its core features. ([Meilisearch][4])


