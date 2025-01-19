export interface SiswaInterface {
  // Personal Information
  nama: string;
  email: string;
  password?: string;
  no_telepon?: string;
  alamat?: string;
  tanggal_lahir?: string;
  kelas: string;

  // System Fields
  userId?: string;
  created_at?: string;
  updated_at?: string;
  role?: "siswa";
  isActive?: boolean;
  lastLogin?: string;
  profilePicture?: string;
}
