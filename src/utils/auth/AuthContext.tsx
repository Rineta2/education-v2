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

    const checkRole = useCallback((allowedRole: string) => {
        const userData = checkAuthStatus();
        if (!userData || userData.role !== allowedRole) {
            router.push("/");
            return false;
        }
        return true;
    }, [checkAuthStatus, router]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = (userData: User) => {
        setAccounts(userData);
        setIsAuthenticated(true);
        Cookies.set(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!, JSON.stringify(userData), { expires: 7 });

        // Gunakan router.replace alih-alih router.push untuk menghindari history
        switch (userData.role) {
            case process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN:
                router.replace("/super-admins/dashboard");
                toast.success(`Selamat datang Super Admin ${userData.namaLengkap}!`);
                break;
            case process.env.NEXT_PUBLIC_ROLE_ADMIN:
                toast.success(`Selamat datang Admin ${userData.namaLengkap}!`);
                router.push("/admins/dashboard");
                break;
            case process.env.NEXT_PUBLIC_ROLE_GURU:
                toast.success(`Selamat datang Guru ${userData.namaLengkap}!`);
                router.push("/guru/dashboard");
                break;
            case process.env.NEXT_PUBLIC_ROLE_SISWA:
                toast.success(`Selamat datang Siswa ${userData.namaLengkap}!`);
                router.push("/siswa/dashboard");
                break;
            default:
                toast.success(`Selamat datang ${userData.namaLengkap}!`);
        }
    };

    const logout = () => {
        setAccounts(null);
        setIsAuthenticated(false);
        // Remove user data from cookies
        Cookies.remove(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!);
        toast.success("Anda telah berhasil logout!");
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ accounts, login, logout, isAuthenticated, checkRole }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook untuk menggunakan AuthContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
