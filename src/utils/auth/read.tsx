"use client";

import { db } from "@/utils/firebase";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

interface AdminData extends DocumentData {
    role?: string;
}

type NextFn = (error: Error | null, data: AdminData | null) => void;

export function useAdmin({ uid }: { uid: string | null }) {
    const { data, error } = useSWRSubscription(
        uid ? [`admins/${uid}`] : null,
        ([path]: [string], { next }: { next: NextFn }) => {
            if (!uid) {
                next(null, null);
                return;
            }

            try {
                const ref = doc(db, path);

                const unsub = onSnapshot(
                    ref,
                    (snapshot) => {
                        next(null, snapshot.exists() ? snapshot.data() as AdminData : null);
                    },
                    (error: { code?: string; message?: string }) => {
                        if (error.code === "permission-denied") {
                            console.log("User is not an admin");
                            next(null, { role: "siswa" });
                        } else {
                            console.error("Snapshot error:", error);
                            next(new Error(error?.code || error?.message || 'Unknown error'), null);
                        }
                    }
                );

                return () => unsub();
            } catch (err: unknown) {
                console.error("Subscription error:", err);
                const error = err instanceof Error ? err : new Error(String(err));
                next(error, null);
            }
        }
    );

    return {
        data,
        error,
        isLoading: !error && data === undefined,
    };
}