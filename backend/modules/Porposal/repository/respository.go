package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/model"
)

type Repository struct {
	db []model.Porposal
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.Porposal, 0),
	}
}

func (r *Repository) FindAll() []model.Porposal {
	return r.db
}

func (r *Repository) Save(entity model.Porposal) model.Porposal {
	r.db = append(r.db, entity)
	return entity
}