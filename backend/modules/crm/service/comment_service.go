package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
)

type CommentService struct {
	repo *repository.CommentRepository
}

func NewCommentService(db *mongo.Database) *CommentService {
	return &CommentService{
		repo: repository.NewCommentRepository(db),
	}
}



func (s *CommentService) AddComment(data model.Comment) error {
	return s.repo.AddComment(data)
}



// / CREATE
// func (r *CategoryRepository) Save(entity model.Category) (model.Category, error) {

// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

// 	defer cancel()

// 	_, err := r.collection.InsertOne(ctx, entity)

// 	if err != nil {
// 		return model.Category{}, err
// 	}

// 	return entity, nil
// }

func (s *CommentService) GetAllComments() ([]model.Comment, error) {
	return s.repo.GetAllComments()
}
