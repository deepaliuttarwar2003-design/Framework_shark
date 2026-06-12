package service

import (
	"errors"
	"fmt"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"
	utils "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/utils"

	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *repository.Repository
}

func NewService(db *mongo.Database) *Service {
	return &Service{
		repo: repository.NewRepository(db),
	}
}

// ==================== REGISTER ====================

func (s *Service) Register(input dto.RegisterDTO) (interface{}, error) {

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(input.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return nil, err
	}

	user := model.Auth{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	result, err := s.repo.Register(user)
	if err != nil {
		return nil, err
	}

	fmt.Println("===== USER REGISTERED =====")
	fmt.Println(result)

	return result, nil
}

// ==================== LOGIN ====================

func (s *Service) Login(input dto.LoginDTO) (string, error) {

	fmt.Println("===== LOGIN START =====")
	fmt.Println("Email:", input.Email)

	user, err := s.repo.FindByEmail(input.Email)
	if err != nil {
		fmt.Println("User Not Found")
		return "", err
	}

	fmt.Println("===== USER FOUND =====")
	fmt.Println("ID:", user.ID.Hex())
	fmt.Println("Name:", user.Name)
	fmt.Println("Email:", user.Email)

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(input.Password),
	)

	if err != nil {
		fmt.Println("Password Mismatch")
		return "", errors.New("invalid credentials")
	}

	fmt.Println("Password Matched")

	token, err := utils.GenerateToken(
		user.ID.Hex(),
		user.Email,
	)

	fmt.Println("After GenerateToken")

	if err != nil {
		fmt.Println("TOKEN ERROR:", err)
		return "", err
	}

	fmt.Println("Generated Token:", token)

	return token, nil
}

func (s *Service) GetProfile(userID string) (interface{}, error) {

	fmt.Println("Service User ID:", userID)

	user, err := s.repo.FindByID(userID)
	if err != nil {
		return nil, err
	}

	return user, nil
}
