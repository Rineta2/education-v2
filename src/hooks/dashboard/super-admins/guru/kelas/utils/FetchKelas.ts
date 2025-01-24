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

const COLLECTION_NAME = "kelas";

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
      console.error("Error creating kelas:", error);
      throw error;
    }
  },

  // Read
  async getAllKelas() {
    try {
      console.log("Fetching from collection:", COLLECTION_NAME);
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      console.log("Query snapshot:", querySnapshot);
      console.log("Number of documents:", querySnapshot.size);
      console.log(
        "Documents:",
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const kelas = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Document data:", data);
        return {
          id: doc.id,
          nama: data.nama,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      }) as Kelas[];

      console.log("Processed kelas data:", kelas);

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

      console.log("Final sorted kelas:", sortedKelas);
      return sortedKelas;
    } catch (error) {
      console.error("Error getting kelas:", error);
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
      console.error("Error updating kelas:", error);
      throw error;
    }
  },

  // Delete
  async deleteKelas(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Error deleting kelas:", error);
      throw error;
    }
  },
};
