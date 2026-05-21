package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

type Repository struct {
	db []model.Crm
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.Crm, 0),
	}
}

func (r *Repository) FindAll() []model.Crm {
	return r.db
}

func (r *Repository) Save(entity model.Crm) model.Crm {
	r.db = append(r.db, entity)
	return entity
}