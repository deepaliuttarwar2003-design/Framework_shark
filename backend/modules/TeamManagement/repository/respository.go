package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/model"
)

type Repository struct {
	db []model.TeamManagement
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.TeamManagement, 0),
	}
}

func (r *Repository) FindAll() []model.TeamManagement {
	return r.db
}

func (r *Repository) Save(entity model.TeamManagement) model.TeamManagement {
	r.db = append(r.db, entity)
	return entity
}