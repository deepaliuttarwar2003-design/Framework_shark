package inventory

type CreateInventoryDTO struct {
	SKU      string  `json:"sku" binding:"required"`
	Name     string  `json:"name" binding:"required"`
	Stock    int     `json:"stock" binding:"required"`
	Price    float64 `json:"price" binding:"required"`
	Category string  `json:"category" binding:"required"`
	Status   string  `json:"status"`
}

type CreateCategoryDTO struct {
	CategoryName string `json:"name" binding:"required"`
}
