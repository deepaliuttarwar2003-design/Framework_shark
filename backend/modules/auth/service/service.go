package service

import (
	"errors"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"

	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	repo *repository.Repository
}

func NewService(db *mongo.Database) *Service {
	return &Service{
		repo: repository.NewRepository(db),
	}
}

func (s *Service) Register(input dto.RegisterDTO) (interface{}, error) {

	user := model.Auth{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	return s.repo.Register(user)
}

func (s *Service) Login(input dto.LoginDTO) (*model.Auth, error) {

	user, err := s.repo.FindByEmail(input.Email)

	if err != nil {
		return nil, errors.New("user not found")
	}

	if user.Password != input.Password {
		return nil, errors.New("invalid password")
	}

	return user, nil
}
