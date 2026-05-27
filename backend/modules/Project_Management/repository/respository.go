package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/model"
)

type Repository struct {
	db []model.ProjectManagement
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.ProjectManagement, 0),
	}
}

func (r *Repository) FindAll() []model.ProjectManagement {
	return r.db
}

func (r *Repository) Save(entity model.ProjectManagement) model.ProjectManagement {
	r.db = append(r.db, entity)
	return entity
}