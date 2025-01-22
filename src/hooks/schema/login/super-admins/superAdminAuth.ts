import { toast } from "react-hot-toast";
import { LoginFormValues } from "@/hooks/schema/login/Schema";
import { User } from "@/utils/auth/schema/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSuperAdminLogin = async (
    data: LoginFormValues,
    router: AppRouterInstance,
    login: (email: string, password: string) => Promise<User>
) => {
    try {
        if (!data.email || !data.password) {
            toast.error("Email dan password harus diisi");
            return false;
        }

        const email = String(data.email).trim();
        const password = String(data.password);

        try {
            const userAccount = await login(email, password);

            if (userAccount.role !== "super-admins") {
                toast.error("Akses ditolak. Anda bukan super admin.");
                return false;
            }

            document.cookie = `user-role=super-admins; path=/`;
            router.push('/super-admins/dashboard');

            return true;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Terjadi kesalahan saat login");
            }
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("Terjadi kesalahan saat login");
        }
        return false;
    }
};

