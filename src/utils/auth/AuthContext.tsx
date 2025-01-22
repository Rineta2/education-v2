import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/utils/firebase';
import { Role } from './schema/auth';
import { User } from './schema/interface';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    hasRole: (roles: string | string[]) => boolean;
    getDashboardUrl: () => string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (email: string, password: string): Promise<User> => {
        try {
            if (!email || !password) {
                throw new Error('Email dan password harus diisi');
            }

            const emailString = String(email).trim();
            const userCredential = await signInWithEmailAndPassword(auth, emailString, password);

            const userDoc = await getDoc(doc(db, 'accounts', userCredential.user.uid));
            const userData = userDoc.data() as User;

            if (!userData) {
                throw new Error('User account not found');
            }

            setUser(userData);
            const welcomeMessage = getWelcomeMessage(userData.role);
            toast.success(welcomeMessage);
            return userData;
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Login gagal: ' + error.message);
                throw new Error('Login gagal: ' + error.message);
            }
            toast.error('Terjadi kesalahan saat login');
            throw new Error('Terjadi kesalahan saat login');
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success('Anda berhasil logout');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Terjadi kesalahan saat logout');
        }
    };

    const hasRole = (roles: string | string[]): boolean => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const getDashboardUrl = () => {
        if (!user?.role) return '/';

        switch (user.role) {
            case Role.SUPER_ADMIN:
                return '/super-admins/dashboard';
            case Role.ADMIN:
                return '/admin/dashboard';
            case Role.GURU:
                return '/guru/dashboard';
            case Role.SISWA:
                return '/siswa/dashboard';
            default:
                return '/';
        }
    };

    const getWelcomeMessage = (role: string): string => {
        switch (role) {
            case Role.SUPER_ADMIN:
                return 'Selamat datang, Super Admin!';
            case Role.ADMIN:
                return 'Selamat datang, Admin!';
            case Role.GURU:
                return 'Selamat datang, Guru!';
            case Role.SISWA:
                return 'Selamat datang, Siswa!';
            default:
                return 'Selamat datang!';
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, 'accounts', firebaseUser.uid));
                const userData = userDoc.data() as User;
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        getDashboardUrl
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};