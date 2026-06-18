package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
)

type Repository struct {
	db []model.Auth
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.Auth, 0),
	}
}

func (r *Repository) FindAll() []model.Auth {
	return r.db
}

func (r *Repository) Save(entity model.Auth) model.Auth {
	r.db = append(r.db, entity)
	return entity
}