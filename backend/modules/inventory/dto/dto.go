package inventory

type CreateInventoryDTO struct {
	SKU string `json:"sku" binding:"required"`
	Name string `json:"name" binding:"required"`
	Stock int `json:"stock" binding:"required"`
	Price float64 `json:"price" binding:"required"`
	CategoryID string `json:"categoryID" binding:"required"`

}

type CreateCategoryDTO struct{
	CategoryName string `json:"categoryname" binding:"required"`
}