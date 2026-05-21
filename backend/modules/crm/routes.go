package crm

import "github.com/gin-gonic/gin"

func (m *CRMModule) RegisterRoutes(r *gin.RouterGroup) {

	r.GET("/leads", m.GetLeads)

	r.POST("/leads", m.CreateLead)

	r.PUT("/leads/:id", m.UpdateLead)

	r.DELETE("/leads/:id", m.DeleteLead)
}