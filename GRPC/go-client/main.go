package main

import (
	"context"
	"fmt"
	"log"
	"time"

	pb "go-client/user/userpb"
	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("could not connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewUserServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	resp, err := client.GreetUser(ctx, &pb.GreetRequest{Name: "Siddharth"})
	if err != nil {
		log.Fatalf("error calling GreetUser: %v", err)
	}

	fmt.Println("Server Response:", resp.Message)
}
