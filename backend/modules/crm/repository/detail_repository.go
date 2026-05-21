package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

func (r *Repository) AddDetail(data model.Detail) error {

	_, err := r.collection.InsertOne(context.Background(), data)

	return err
}
