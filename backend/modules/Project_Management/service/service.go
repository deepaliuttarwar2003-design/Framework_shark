package service

import (
	"fmt"
	"time"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func (s *Service) GetAll() ([]model.ProjectManagement, error) {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateProjectManagementDTO) (model.ProjectManagement, error) {

	if input.ProjectTitle == "" {
		return model.ProjectManagement{},
			fmt.Errorf("Project title required")
	}

	if input.Client == "" {
		return model.ProjectManagement{},
			fmt.Errorf("Client name required")
	}

	if input.Manager == "" {
		return model.ProjectManagement{},
			fmt.Errorf("Manager name required")
	}

	if input.DateOfAssign == "" {
		return model.ProjectManagement{},
			fmt.Errorf("Date of assign required")
	}

	if input.DateOfCompletion == "" {
		return model.ProjectManagement{},
			fmt.Errorf("Date of completion required")
	}

	if input.Budget == 0 {
		return model.ProjectManagement{},
			fmt.Errorf("Budget should not be Zero")
	}

	assignDate, err := time.Parse("02-01-2006", input.DateOfAssign)
	if err != nil {
		return model.ProjectManagement{},
			fmt.Errorf("invalid assign date format")
	}

	completionDate, err := time.Parse("02-01-2006", input.DateOfCompletion)
	if err != nil {
		return model.ProjectManagement{},
			fmt.Errorf("invalid completion date format")
	}

	entity := model.ProjectManagement{
		ID:               primitive.NewObjectID(),
		ProjectTitle:     input.ProjectTitle,
		Description:      input.Description,
		Client:           input.Client,
		Manager:          input.Manager,
		DateOfAssign:     assignDate.Format("02-01-2006"),
		DateOfCompletion: completionDate.Format("02-01-2006"),
		Budget:           input.Budget,
		Status:           input.Status,
	}

	result, err := s.repo.Create(entity)
	if err != nil {
		return model.ProjectManagement{}, err
	}
	// events.Publish("Project_Management.created", result)

	return result, nil
}

func (s *Service) Update(id string, input dto.CreateProjectManagementDTO) (*model.ProjectManagement, error) {

	entity := model.ProjectManagement{
		ProjectTitle:     input.ProjectTitle,
		Description:      input.Description,
		Client:           input.Client,
		Manager:          input.Manager,
		DateOfAssign:     input.DateOfAssign,
		DateOfCompletion: input.DateOfCompletion,
		Status:           input.Status,
		Budget:           input.Budget,
	}

	updated, err := s.repo.Update(id, entity)

	if err != nil {
		return nil, err
	}

	return &updated, nil
}

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}
