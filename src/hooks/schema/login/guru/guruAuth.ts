import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getDoc, doc } from "firebase/firestore";

import { auth, db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import { LoginFormValues } from "@/hooks/schema/login/Schema";

import { FirebaseAuthError } from "@/hooks/schema/login/Interface";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { User } from "@/utils/auth/schema/interface";

export const handleGuruLogin = async (
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
        doc(db, "accounts", userCredential.user.uid)
      );

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData?.role === "guru") {
          const userDataForAuth = {
            id: userCredential.user.uid,
            namaLengkap: userData.namaLengkap,
            profilePicture: userData.profilePicture || null,
            role: userData.role,
            email: userData.email
          } as User;

          loginCallback(userDataForAuth);
        } else {
          await signOut(auth);
          toast.error("Akses ditolak. Anda bukan guru.");
        }
      }
    }
  } catch (error: unknown) {
    console.error("Login error:", error);
    if (error && typeof error === "object" && "code" in error) {
      const firebaseError = error as FirebaseAuthError;
      if (firebaseError.code === "auth/invalid-credential") {
        toast.error("Email atau password salah");
      } else {
        toast.error("Terjadi kesalahan saat login");
      }
    }
  }
};
