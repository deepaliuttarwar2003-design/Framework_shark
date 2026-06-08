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

func (r *Repository) FindByID(id string) (model.ContractManagement, bool) {
    for _, entity := range r.db {
        if entity.ID == id {
            return entity, true
        }
    }
    return model.ContractManagement{}, false
}

func (r *Repository) Save(entity model.ContractManagement) model.ContractManagement {
    r.db = append(r.db, entity)
    return entity
}

func (r *Repository) Update(id string, entity model.ContractManagement) (model.ContractManagement, bool) {
    for idx, existing := range r.db {
        if existing.ID == id {
            r.db[idx] = entity
            return entity, true
        }
    }
    return model.ContractManagement{}, false
}

func (r *Repository) Delete(id string) bool {
    for idx, existing := range r.db {
        if existing.ID == id {
            r.db = append(r.db[:idx], r.db[idx+1:]...)
            return true
        }
    }
    return false
}
