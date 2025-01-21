import React from 'react'

interface SearchBarProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
    return (
        <div className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari admin..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-background focus:ring-2 focus:ring-primary/20 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}