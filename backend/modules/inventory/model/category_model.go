package inventory

type Category struct {
	// ID   primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	CategoryName string        	    `bson:"categoryname" json:"categoryname"`
}