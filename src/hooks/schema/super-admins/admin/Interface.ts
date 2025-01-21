export interface Admin {
    userId: string;
    email: string;
    namaLengkap: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

// Tipe untuk form input
export interface AdminFormData {
    email: string;
    password: string;
    namaLengkap: string;
    isActive: boolean;
}

// Tipe untuk response data
export interface AdminResponse extends Admin {
    userId: string;
}

export interface AdminFormModalProps {
    isOpen: boolean
    onClose: () => void
    formData: AdminFormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    error: string
    isSubmitting: boolean
    selectedAdmin: Admin | null
}