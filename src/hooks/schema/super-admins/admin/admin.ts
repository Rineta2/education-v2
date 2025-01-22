export interface Admin {
    id: string;
    email: string;
    namaLengkap: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FormData {
    email: string;
    namaLengkap: string;
    password: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// 

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}
