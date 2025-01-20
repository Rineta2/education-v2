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

    // Wrap checkAuthStatus in useCallback
    const checkAuthStatus = useCallback(() => {
        const userData = Cookies.get(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!);
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setAccounts(parsedUser);
            setIsAuthenticated(true);

            // Get current path
            const currentPath = window.location.pathname;

            // Only redirect if user is on login page or root
            if (currentPath === '/auth/login' || currentPath === '/') {
                switch (parsedUser.role) {
                    case "super_admin":
                        router.push("/super-admins/dashboard");
                        break;
                    case "admin":
                        router.push("/admin/dashboard");
                        break;
                    case "guru":
                        router.push("/guru/dashboard");
                        break;
                    case "siswa":
                        router.push("/siswa/dashboard");
                        break;
                }
            }
        }
    }, [router]); // Add router as dependency

    // Update useEffect to include checkAuthStatus in dependencies
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = (userData: User) => {
        setAccounts(userData);
        setIsAuthenticated(true);
        Cookies.set(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!, JSON.stringify(userData), { expires: 7 });

        // Show welcome message based on user role
        switch (userData.role) {
            case "super_admin":
                toast.success(`Selamat datang Super Admin ${userData.namaLengkap}!`);
                router.push("/super-admins/dashboard");
                break;
            case "admin":
                toast.success(`Selamat datang Admin ${userData.namaLengkap}!`);
                router.push("/admin/dashboard");
                break;
            case "guru":
                toast.success(`Selamat datang Guru ${userData.namaLengkap}!`);
                router.push("/guru/dashboard");
                break;
            case "siswa":
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
    };

    return (
        <AuthContext.Provider value={{ accounts, login, logout, isAuthenticated }}>
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
