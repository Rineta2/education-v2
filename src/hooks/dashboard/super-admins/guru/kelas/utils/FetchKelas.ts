import { db } from "@/utils/firebase";

import { Timestamp as FirebaseTimestamp } from "firebase/firestore";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import type { Kelas } from "@/hooks/schema/super-admins/guru/guru";

const COLLECTION_NAME = process.env.NEXT_PUBLIC_COLLECTIONS_KELAS as string;

type TimestampType = FirebaseTimestamp | string | null | undefined;

export const kelasService = {
  // Create
  async createKelas(data: Omit<Kelas, "id" | "created_at" | "updated_at">) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Read
  async getAllKelas() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const kelas = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nama: data.nama,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      }) as Kelas[];

      // Sort by created_at timestamp, newest first
      const sortedKelas = kelas.sort((a, b) => {
        const getTime = (timestamp: TimestampType) => {
          if (!timestamp) return 0;
          if (typeof timestamp === "object" && "toDate" in timestamp) {
            return timestamp.toDate().getTime();
          }
          return new Date(timestamp).getTime();
        };

        const timeA = getTime(a.created_at);
        const timeB = getTime(b.created_at);
        return timeB - timeA;
      });

      return sortedKelas;
    } catch (error) {
      throw error;
    }
  },

  // Update
  async updateKelas(
    id: string,
    data: Partial<Omit<Kelas, "id" | "created_at">>
  ) {
    try {
      const kelasRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(kelasRef, {
        ...data,
        updated_at: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete
  async deleteKelas(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      throw error;
    }
  },
};
