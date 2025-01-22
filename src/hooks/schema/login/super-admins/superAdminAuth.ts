import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { LoginFormValues } from "@/hooks/schema/login/Schema";
import { User } from "@/utils/auth/schema/interface";

// Definisikan tipe untuk fungsi login
type LoginFunction = (userData: User) => void;

export const handleSuperAdminLogin = async (
    data: LoginFormValues,
    router: unknown, // Ubah any ke unknown karena router tidak digunakan
    login: LoginFunction
) => {
    try {
        // Set persistence first
        await setPersistence(auth, browserLocalPersistence);

        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, "super_admins", userCredential.user.uid));

        if (!userDoc.exists()) {
            throw new Error("User data not found");
        }

        const userDocData = userDoc.data();

        if (!userCredential.user.email) {
            throw new Error("Email not found");
        }

        // Pastikan interface User memiliki semua properti ini
        const userData: User = {
            email: userCredential.user.email,
            role: "super_admins",
            namaLengkap: userDocData.namaLengkap,
            id: userCredential.user.uid, // Gunakan 'id' alih-alih 'uid' jika sesuai dengan interface
            ...userDocData
        };

        // Call login from AuthContext
        login(userData);

        // Gunakan window.location untuk navigasi hard
        window.location.href = "/super-admins/dashboard";

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error) {
            const firebaseError = error as { code: string };
            if (firebaseError.code === "auth/invalid-credential") {
                toast.error("Email atau password salah");
            } else if (firebaseError.code === "auth/user-not-found") {
                toast.error("Email tidak terdaftar");
            } else if (firebaseError.code === "auth/too-many-requests") {
                toast.error("Terlalu banyak percobaan login. Silakan coba lagi nanti");
            }
        } else {
            toast.error("Terjadi kesalahan. Silakan coba lagi");
        }
    }
};
