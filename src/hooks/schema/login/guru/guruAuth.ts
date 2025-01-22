import { signOut } from "firebase/auth";

import { auth } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import { LoginFormValues } from "@/hooks/schema/login/Schema";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { User } from "@/utils/auth/schema/interface";

export const handleGuruLogin = async (
  data: LoginFormValues,
  router: AppRouterInstance,
  login: (email: string, password: string) => Promise<User>
) => {
  try {
    const userData = await login(data.email, data.password);

    if (userData.role !== "guru") {
      await signOut(auth);
      toast.error("Akses ditolak. Anda bukan guru.");
      return;
    }

    router.push("/guru/dashboard");

  } catch (error: unknown) {
    console.error("Login error:", error);
  }
};
