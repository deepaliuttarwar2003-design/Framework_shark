package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
)

type Repository struct {
	db []model.Invoice
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.Invoice, 0),
	}
}

func (r *Repository) FindAll() []model.Invoice {
	return r.db
}

func (r *Repository) Save(entity model.Invoice) model.Invoice {
	r.db = append(r.db, entity)
	return entity
}

