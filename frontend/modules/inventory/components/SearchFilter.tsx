import React from 'react'

interface SearchFilterProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    categories: string[];
    status: string;
    setStatus: (value: string) => void;
}

const SearchFilter = ({ search, setSearch, category, setCategory, categories, status, setStatus }: SearchFilterProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                    <option>Low Stock</option>
                </select>
            </div>
        </div>
    )
}

export default SearchFilter
