import { ReactNode } from "react";

export interface User {
  id?: string;
  userId?: string;
  email: string;
  role: "super-admins" | "admin" | "guru" | "siswa";
  namaLengkap: string;
  profilePicture?: string | null;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

export interface AuthContextType {
  accounts: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  checkRole: (allowedRole: string) => boolean;
}

// Providers Props

export interface ProvidersProps {
  children: ReactNode;
}
