import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { MataPelajaran } from "@/hooks/schema/super-admins/guru/guru";

export const mataPelajaranService = {
  fetchAll: async () => {
    const querySnapshot = await getDocs(
      collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_MATA_PELAJARAN as string
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MataPelajaran[];
  },

  create: async (data: MataPelajaran) => {
    return await addDoc(
      collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_MATA_PELAJARAN as string
      ),
      data
    );
  },

  update: async (id: string, data: Partial<MataPelajaran>) => {
    return await updateDoc(
      doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_MATA_PELAJARAN as string, id),
      data
    );
  },

  delete: async (id: string) => {
    return await deleteDoc(
      doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_MATA_PELAJARAN as string, id)
    );
  },
};
