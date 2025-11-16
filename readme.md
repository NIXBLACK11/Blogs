protoc --proto_path=../grpc-protos \
  --go_out=. \
  --go-grpc_out=. \
  ../grpc-protos/user.proto


  bun init
  choose blank
  bun add @grpc/grpc-js @grpc/proto-loader

bun run client.ts