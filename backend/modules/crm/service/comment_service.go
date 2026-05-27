package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
)

type CommentService struct {
	repo *repository.CommentRepository
}

func NewCommentService(repo *repository.CommentRepository) *CommentService {
	return &CommentService{
		repo: repo,
	}
}

func (s *CommentService) AddComment(data model.Comment) error {
	return s.repo.AddComment(data)
}

func (s *CommentService) GetAllComments() ([]model.Comment, error) {
	return s.repo.GetAllComments()
}
