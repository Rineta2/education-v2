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

// PaginationProps

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

// AddEditModalProps

export interface AddEditModalProps {
    isOpen: boolean;
    isEditing: boolean;
    isLoading: boolean;
    formData: FormData;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onFormChange: (formData: FormData) => void;
}

// AdminTableProps

export interface AdminTableProps {
    admins: Admin[];
    isLoading: boolean;
    searchTerm: string;
    onEdit: (admin: Admin) => void;
    onDelete: (id: string) => void;
}

// DeleteModalProps

export interface DeleteModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
