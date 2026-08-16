First we will start a meilisearch local instance:

Install the latezst version:
docker pull getmeili/meilisearch:latest

RUn meilisearch with docker
docker run -it --rm \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY='1ef1f8b77db97cf5ac9b55f417980af9dfe1ff7dd6ce310297e54080745e2ba2'\
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest

  we will pass the master key here for it x



create mcp 

mkdir mcp
cd mcp
bun init -y

bun add meilisearch
bun add -d typescript @types/bun


bunx --bun shadcn@latest init --preset b1s9IGMLI --template next --pointer