import { SiswaInterface } from "./interfaceSiswa";

import * as z from "zod";

export const siswaSchema = z.object({
  nama: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  no_telepon: z.string().min(10, "Nomor HP minimal 10 digit").optional(),
  alamat: z.string().min(10, "Alamat minimal 10 karakter").optional(),
  tanggal_lahir: z.string().min(1, "Tanggal lahir harus diisi").optional(),
  kelas: z.string().min(1, "Kelas harus diisi"),
  profileImage: z.instanceof(File).optional(),
}) satisfies z.ZodType<
  Omit<
    SiswaInterface,
    | "userId"
    | "created_at"
    | "updated_at"
    | "role"
    | "isActive"
    | "lastLogin"
    | "profilePicture"
  >
>;
