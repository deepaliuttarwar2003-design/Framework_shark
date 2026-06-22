package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAll() (interface{}, error) {
	return []interface{}{}, nil
}

func (r *Repository) Create(data interface{}) (interface{}, error) {
	return data, nil
}

func (r *Repository) GetByID(id string) (interface{}, error) {
	return map[string]string{"id": id}, nil
}

func (r *Repository) Update(id string, data interface{}) (interface{}, error) {
	return data, nil
}

func (r *Repository) Delete(id string) error {
	_ = context.TODO()
	return nil
}