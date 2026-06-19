package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/model"
)

type Repository struct {
	db []model.UserManagement
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.UserManagement, 0),
	}
}

func (r *Repository) FindAll() []model.UserManagement {
	return r.db
}

func (r *Repository) Save(entity model.UserManagement) model.UserManagement {
	r.db = append(r.db, entity)
	return entity
}