import React from 'react'

interface InventoryStatsProps {
  products: any[];
}

const InventoryStats = ({ products }: InventoryStatsProps) => {
  const totalProducts = products.length;
  const inStock = products.filter(p => p.status === 'In Stock' || p.status === 'Active').length;
  const outOfStock = products.filter(p => p.status === 'Out of Stock' || p.status === 'Inactive').length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-600 text-sm">Total Products</p>
        <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-600 text-sm">In Stock</p>
        <p className="text-2xl font-bold text-green-600">{inStock}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-600 text-sm">Out of Stock</p>
        <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
      </div>
    </div>
  )
}

export default InventoryStats