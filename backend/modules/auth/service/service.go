package service

import (
	"errors"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	// events "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
)

type Service struct {
	repo *repository.Repository
}

func NewService(db *mongo.Database) *Service {
	return &Service{
		repo: repository.NewRepository(db),
	}
}

func (s *Service) CreateRegister(input dto.RegisterAuthDTO) (model.RegisterAuth, error) {
	if _, exists := s.repo.FindByEmailOrUsername(input.Email); exists {
		return model.RegisterAuth{}, errors.New("email already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return model.RegisterAuth{}, err
	}

	entity := model.RegisterAuth{
		ID:       GenerateID(),
		Username: input.Username,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	saved := s.repo.Save(entity)
	saved.Password = ""

	return saved, nil
}

func (s *Service) CreateLogin(input dto.LoginAuthDTO) (model.LoginAuth, error) {
	identifier := input.Email
	if identifier == "" {
		identifier = input.Username
	}

	if identifier == "" {
		return model.LoginAuth{}, errors.New("email or username required")
	}

	user, ok := s.repo.FindByEmailOrUsername(identifier)
	if !ok {
		return model.LoginAuth{}, errors.New("invalid email or username or password")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return model.LoginAuth{}, errors.New("invalid email or username or password")
	}

	token, expiresAt, err := IssueToken(user.ID, user.Email, user.Username, DefaultTokenTTL)
	if err != nil {
		return model.LoginAuth{}, err
	}

	return model.LoginAuth{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		Token:     token,
		ExpiresAt: expiresAt,
	}, nil
}
