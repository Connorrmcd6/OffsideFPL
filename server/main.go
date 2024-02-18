package main

import (
	"OffsideFPL/api"
	"OffsideFPL/web"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(api.Handler)
	// CORS is enabled only in prod profile
	cors := os.Getenv("profile") == "prod"
	app := web.NewApp(cors)
	err := app.Serve()
	log.Println("Error", err)
}
