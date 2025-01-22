export enum Role {
    SUPER_ADMIN = "super-admins",
    ADMIN = "admin",
    GURU = "guru",
    SISWA = "siswa"
}

export interface UserAccount {
    uid: string;
    email: string;
    displayName: string;
    role: Role;
    photoURL?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface AuthContextType {
    user: UserAccount | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<UserAccount>;
    logout: () => Promise<void>;
    hasRole: (roles: Role | Role[]) => boolean;
    getDashboardUrl: () => string;
}