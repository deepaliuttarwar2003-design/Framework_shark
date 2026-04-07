package config

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port  string
	DBUri string
}

func Load() *Config {

	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	return &Config{
		Port:  clean(getEnv("PORT", "8080")),
		DBUri: clean(getEnv("MONGO_URI", "mongodb://localhost:27017")),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func clean(val string) string {
	return strings.TrimSpace(val)
}
