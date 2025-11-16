import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve("../grpc-protos/user.proto");

// Load the .proto definition
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the proto descriptor
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = (grpcObject as any).user;

// Create a client instance
const client = new userPackage.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Call GreetUser RPC with correct parameter name
client.greetUser({ name: "Siddharth" }, (err: grpc.ServiceError | null, response: any) => {
  if (err) {
    console.error("❌ Error:", err.message);
  } else {
    console.log("✅ Server Response:", response.message);
  }
});
