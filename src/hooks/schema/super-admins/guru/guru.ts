export interface Guru {
  id: string;
  userId: string;
  namaLengkap: string;
  tanggalLahir: string;
  tempatLahir: string;
  alamat: string;
  agama: string;
  email: string;
  ipk: string;
  isActive: boolean;
  jenisKelamin: string;
  jurusan: string;
  mataPelajaran: string;
  telepon: string;
  tingkatan: string;
  universitas: string;
  createdAt: string;
  updatedAt: string;
}

export const agamaOptions = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
];

export const jenisKelaminOptions = ["Laki-laki", "Perempuan"];

export const jurusanOptions = [
  "Pendidikan Matematika",
  "Pendidikan Fisika",
  "Pendidikan Biologi",
  "Pendidikan Kimia",
  "Pendidikan Bahasa Indonesia",
  "Pendidikan Bahasa Inggris",
];

export const tingkatanOptions = [
  "SD",
  "SMP",
  "SMA",
  "Diploma",
  "S1",
  "S2",
  "S3",
];

export interface GuruFormData extends Partial<Guru> {
  password?: string;
}

// Delete Modal

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

// Guru Form

export interface GuruFormProps {
  formData: GuruFormData;
  setFormData: (data: GuruFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCloseModal: () => void;
  isEditing: boolean;
  isLoading: boolean;
}

// Guru Table

export interface GuruTableProps {
  gurus: Guru[];
  isDataLoading: boolean;
  handleEdit: (guru: Guru) => void;
  setSelectedGuruId: (id: string) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

// Modal

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Pagination

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

// Mata Pelajaran

export interface MataPelajaran {
  id?: string;
  nama: string;
}

export interface MataPelajaranFormProps {
  showForm: boolean;
  isEditing: boolean;
  isLoading: boolean;
  formData: MataPelajaran;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (value: string) => void;
}

export interface MataPelajaranItemProps {
  item: MataPelajaran;
  onEdit: (item: MataPelajaran) => void;
  onDelete: (id: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Kelas

export interface Kelas {
  id: string;
  nama: string;
  created_at: string;
  updated_at: string;
}

export interface Kelas {
  id: string;
  nama: string;
}

export interface FormData {
  nama: string;
}

export interface FormErrors {
  nama?: string;
}
