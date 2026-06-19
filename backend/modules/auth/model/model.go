package auth

import "time"

type LoginAuth struct {
	ID        string    `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Token     string    `json:"token"`
	Password  string    `json:"password"`
	ExpiresAt time.Time `json:"expiresAt"`
}

type RegisterAuth struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
