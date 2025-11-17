import * as grpc from "@grpc/grpc-js";
import { UserServiceClient } from "./user";
import { GreetRequest } from "./user";

const client = new UserServiceClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const req: GreetRequest = { name: "Siddharth" };

client.greetUser(req, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server Response:", response.message);
});
