export interface GuruInterface {
  // Personal Information
  namaLengkap: string;
  email: string;
  password?: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  agama: "Islam" | "Kristen" | "Katolik" | "Hindu" | "Buddha" | "Konghucu";
  alamat: string;
  telepon: string;

  // Educational Background
  universitas: string;
  jurusan: string;
  ipk: string;

  // Teaching Information
  tingkatan: "SD" | "SMP" | "SMA" | "D3" | "S1" | "S2" | "S3";
  mataPelajaran:
    | "Matematika"
    | "IPA"
    | "IPS"
    | "Bahasa Indonesia"
    | "Bahasa Inggris";

  // System Fields
  userId?: string;
  createdAt?: string;
  role?: "guru";
  isActive?: boolean;
  lastLogin?: string;
  profilePicture?: string;
}
