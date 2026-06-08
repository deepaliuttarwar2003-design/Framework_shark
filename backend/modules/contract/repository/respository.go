package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract/model"
)

type Repository struct {
	db []model.Contract
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.Contract, 0),
	}
}

func (r *Repository) FindAll() []model.Contract {
	return r.db
}

func (r *Repository) Save(entity model.Contract) model.Contract {
	r.db = append(r.db, entity)
	return entity
}