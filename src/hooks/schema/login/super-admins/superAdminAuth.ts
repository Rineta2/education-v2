import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getDoc, doc } from "firebase/firestore";

import { auth, db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import { LoginFormValues } from "@/hooks/schema/login/Schema";

import { User } from "@/utils/auth/schema/interface";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { FirebaseAuthError } from "@/hooks/schema/login/Interface";

export const handleSuperAdminLogin = async (
    data: LoginFormValues,
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
            const userData = userDoc.data();

            if (userData?.role === process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN) {
                loginCallback(userData as User);
                return true;
            } else {
                await signOut(auth);
                toast.error("Akses ditolak. Anda bukan super admin.");
                router.replace('/auth/login/super-admins');
                return false;
            }
        }
        return false;
    } catch (error: unknown) {
        console.error(error);
        if (error && typeof error === "object" && "code" in error) {
            const firebaseError = error as FirebaseAuthError;
            if (firebaseError.code === "auth/invalid-credential") {
                toast.error("Email atau password salah");
            } else {
                toast.error("Terjadi kesalahan saat login");
            }
        }
        router.replace('/auth/login/super-admins');
        return false;
    }
};
