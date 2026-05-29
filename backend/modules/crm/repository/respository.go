package repository
import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {

	return &Repository{
		db: db,
	}
}

func (r *Repository) Create(data model.Crm) (interface{}, error) {

	collection := r.db.Collection("crm")

	result, err := collection.InsertOne(
		context.Background(),
		data,
	)

	return result, err
}

func (r *Repository) GetAll() ([]model.Crm, error) {

	collection := r.db.Collection("crm")

	cursor, err := collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var crm []model.Crm

	err = cursor.All(context.Background(), &crm)

	return crm, err
}
