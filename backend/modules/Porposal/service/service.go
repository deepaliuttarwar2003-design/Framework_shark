package service

import (
	"time"

	"github.com/google/uuid"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		repo: repo,
	}
}

// Create Proposal
func (s *Service) Create(req dto.CreateProposalRequest) error {

	proposal := &model.Proposal{
		ProposalID:          uuid.New().String(),
		ProposalTitle:       req.ProposalTitle,
		ProposalType:        req.ProposalType,
		ClientName:          req.ClientName,
		ContactPerson:       req.ContactPerson,
		Email:               req.Email,
		MobileNumber:        req.MobileNumber,
		LeadReference:       req.LeadReference,
		SalesRepresentative: req.SalesRepresentative,

		Currency:    req.Currency,
		Subtotal:    req.Subtotal,
		Discount:    req.Discount,
		Tax:         req.Tax,
		TotalAmount: req.TotalAmount,

		Description:     req.Description,
		TermsConditions: req.TermsConditions,
		Notes:           req.Notes,

		Status:       "Draft",
		ProposalDate: time.Now(),
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	return s.repo.Create(proposal)
}

// Get All Proposals
func (s *Service) GetAll() ([]model.Proposal, error) {
	return s.repo.GetAll()
}

// Get Proposal By ID
func (s *Service) GetByID(id string) (*model.Proposal, error) {
	return s.repo.GetByID(id)
}

// Update Proposal
func (s *Service) Update(id string, req dto.UpdateProposalRequest) error {

	proposal, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}

	proposal.ProposalTitle = req.ProposalTitle
	proposal.ProposalType = req.ProposalType
	proposal.Status = req.Status
	proposal.ClientName = req.ClientName
	proposal.ContactPerson = req.ContactPerson
	proposal.Email = req.Email
	proposal.MobileNumber = req.MobileNumber
	proposal.LeadReference = req.LeadReference
	proposal.SalesRepresentative = req.SalesRepresentative

	proposal.Currency = req.Currency
	proposal.Subtotal = req.Subtotal
	proposal.Discount = req.Discount
	proposal.Tax = req.Tax
	proposal.TotalAmount = req.TotalAmount

	proposal.Description = req.Description
	proposal.TermsConditions = req.TermsConditions
	proposal.Notes = req.Notes

	proposal.UpdatedAt = time.Now()

	return s.repo.Update(id, proposal)
}

// Delete Proposal
func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}