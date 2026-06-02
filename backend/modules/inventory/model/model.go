package inventory

import "go.mongodb.org/mongo-driver/bson/primitive"

type Inventory struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	SKU        string             `bson:"sku" json:"sku"`
	Name       string             `bson:"name" json:"name"`
	Stock      int                `bson:"stock" json:"stock"`
	Price      float64            `bson:"price" json:"price"`
	CategoryID primitive.ObjectID `bson:"categoryID" json:"categoryID"`
	Status     string             `bson:"status" json:"status"`
	category   *Category          `bson:"-" json:"category,omitempty"`
}
