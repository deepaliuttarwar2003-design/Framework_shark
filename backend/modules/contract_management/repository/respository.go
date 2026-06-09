package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/model"
)

type Repository struct {
	db []model.ContractManagement
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.ContractManagement, 0),
	}
}

func (r *Repository) FindAll() []model.ContractManagement {
	return r.db
}

func (r *Repository) Save(entity model.ContractManagement) model.ContractManagement {
	r.db = append(r.db, entity)
	return entity
}