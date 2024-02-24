package hello

import (
	"errors"
)

var (
	InvalidNameError = "No name provided"
)

func SayHelloLambda(name string) (string, error) {
	if name != "" {
		return "Hello " + name + " from lambda!", nil
	}
	return "", errors.New(InvalidNameError)
}
