import { GuruInterface } from "@/hooks/schema/register/guru/Interface";

import * as z from "zod";

export const guruSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  tempatLahir: z.string().min(3, "Tempat lahir minimal 3 karakter"),
  tanggalLahir: z.string().min(1, "Tanggal lahir harus diisi"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Pilih jenis kelamin",
  }),
  agama: z.enum(
    ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"],
    {
      required_error: "Pilih agama",
    }
  ),
  universitas: z.string().min(3, "Universitas minimal 3 karakter"),
  jurusan: z.string().min(3, "Jurusan minimal 3 karakter"),
  ipk: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) <= 4.0, {
      message: "IPK tidak valid (maksimal 4.0)",
    }),
  alamat: z.string().min(10, "Alamat minimal 10 karakter"),
  telepon: z.string().min(10, "Nomor HP minimal 10 digit"),
  tingkatan: z.enum(["SD", "SMP", "SMA", "D3", "S1", "S2", "S3"], {
    required_error: "Pilih tingkatan",
  }),
  mataPelajaran: z.enum(
    ["Matematika", "IPA", "IPS", "Bahasa Indonesia", "Bahasa Inggris"],
    {
      required_error: "Pilih mata pelajaran",
    }
  ),
  profileImage: z.instanceof(File).optional(),
}) satisfies z.ZodType<
  Omit<
    GuruInterface,
    | "userId"
    | "createdAt"
    | "role"
    | "isActive"
    | "lastLogin"
    | "profilePicture"
  >
>;
