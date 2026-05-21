package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

func (s *Service) AddComment(req dto.CreateCommentDTO) error {

	data := model.Comment{
		CRMID:   req.CRMID,
		Message: req.Message,
		Author:  req.Author,
	}

	return s.repo.AddComment(data)
}
