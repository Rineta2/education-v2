import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

import Cookies from "js-cookie";

import { toast } from "react-hot-toast";

import { User, AuthContextType } from "@/utils/auth/schema/interface";

import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accounts, setAccounts] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    // Helper to get role names from .env.local
    const roles = {
        SUPER_ADMIN: process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN,
        ADMIN: process.env.NEXT_PUBLIC_ROLE_ADMIN,
        GURU: process.env.NEXT_PUBLIC_ROLE_GURU,
        SISWA: process.env.NEXT_PUBLIC_ROLE_SISWA,
    };

    // Check authentication status
    const checkAuthStatus = useCallback(() => {
        const userData = Cookies.get(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!);
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setAccounts(parsedUser);
            setIsAuthenticated(true);
            return parsedUser;
        } else {
            setAccounts(null);
            setIsAuthenticated(false);
            return null;
        }
    }, []);

    // Check role authorization
    const checkRole = useCallback(
        (allowedRole: string) => {
            const userData = checkAuthStatus();
            if (!userData || userData.role !== allowedRole) {
                toast.error("Akses ditolak: Anda tidak memiliki izin untuk mengakses halaman ini.");
                router.push("/");
                return false;
            }
            return true;
        },
        [checkAuthStatus, router]
    );

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Login logic
    const login = (userData: User) => {
        setAccounts(userData);
        setIsAuthenticated(true);
        Cookies.set(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!, JSON.stringify(userData), { expires: 7 });

        // Redirect user based on role
        switch (userData.role) {
            case roles.SUPER_ADMIN:
                router.push("/super-admins/dashboard");
                toast.success(`Selamat datang Super Admin ${userData.namaLengkap}!`);
                break;
            case roles.ADMIN:
                router.push("/admins/dashboard");
                toast.success(`Selamat datang Admin ${userData.namaLengkap}!`);
                break;
            case roles.GURU:
                router.push("/guru/dashboard");
                toast.success(`Selamat datang Guru ${userData.namaLengkap}!`);
                break;
            case roles.SISWA:
                router.push("/siswa/dashboard");
                toast.success(`Selamat datang Siswa ${userData.namaLengkap}!`);
                break;
            default:
                toast.error("Role tidak dikenali. Hubungi administrator.");
        }
    };

    // Logout logic
    const logout = () => {
        setAccounts(null);
        setIsAuthenticated(false);
        Cookies.remove(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!);
        toast.success("Anda telah berhasil logout!");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ accounts, login, logout, isAuthenticated, checkRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
