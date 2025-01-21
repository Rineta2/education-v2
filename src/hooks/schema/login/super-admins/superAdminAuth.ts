import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getDoc, doc } from "firebase/firestore";

import { auth, db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import { User } from "@/utils/auth/schema/interface";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface LoginData {
    email: string;
    password: string;
}

export const handleSuperAdminLogin = async (
    data: LoginData,
    router: AppRouterInstance,
    loginCallback: (userData: User) => void
) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        if (userCredential.user) {
            const userDoc = await getDoc(
                doc(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string,
                    userCredential.user.uid
                )
            );

            const userData = userDoc.data() as User | undefined;

            if (userData?.role === "super_admins") {
                loginCallback(userData as User);
                return true;
            } else {
                await signOut(auth);
                toast.error("Akses ditolak. Anda bukan super admin.");
                return false;
            }
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        toast.error("Email atau password salah");
        return false;
    }
};
