package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

func (r *Repository) AddChecklist(data model.Checklist) error {

	_, err := r.collection.InsertOne(context.Background(), data)

	return err
}
