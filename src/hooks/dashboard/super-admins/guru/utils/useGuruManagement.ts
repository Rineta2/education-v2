import { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase";

interface Guru {
  id: string;
  userId: string;
  namaLengkap: string;
  tanggalLahir: string;
  tempatLahir: string;
  alamat: string;
  agama: string;
  email: string;
  ipk: string;
  isActive: boolean;
  jenisKelamin: string;
  jurusan: string;
  mataPelajaran: string;
  telepon: string;
  tingkatan: string;
  universitas: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  namaLengkap: string;
  tanggalLahir: string;
  tempatLahir: string;
  alamat: string;
  agama: string;
  email: string;
  ipk: string;
  isActive: boolean;
  jenisKelamin: string;
  jurusan: string;
  mataPelajaran: string;
  telepon: string;
  tingkatan: string;
  universitas: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 10;

export const useGuruManagement = () => {
  const [gurus, setGurus] = useState<Guru[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: "",
    tanggalLahir: "",
    tempatLahir: "",
    alamat: "",
    agama: "",
    email: "",
    ipk: "",
    isActive: true,
    jenisKelamin: "",
    jurusan: "",
    mataPelajaran: "",
    telepon: "",
    tingkatan: "",
    universitas: "",
    password: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedGuruId, setSelectedGuruId] = useState<string | null>(null);

  const fetchGurus = async () => {
    setIsDataLoading(true);
    try {
      const accountsRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string
      );
      const querySnapshot = await getDocs(accountsRef);
      const guruList: Guru[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === process.env.NEXT_PUBLIC_ROLE_GURU) {
          guruList.push({
            id: doc.id,
            userId: doc.id,
            namaLengkap: data.namaLengkap || "",
            tanggalLahir: data.tanggalLahir || "",
            tempatLahir: data.tempatLahir || "",
            alamat: data.alamat || "",
            agama: data.agama || "",
            email: data.email || "",
            ipk: data.ipk || "",
            isActive: data.isActive ?? true,
            jenisKelamin: data.jenisKelamin || "",
            jurusan: data.jurusan || "",
            mataPelajaran: data.mataPelajaran || "",
            telepon: data.telepon || "",
            tingkatan: data.tingkatan || "",
            universitas: data.universitas || "",
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
          } as Guru);
        }
      });

      setGurus(
        guruList.sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap))
      );
    } catch (error) {
      console.error("Error fetching gurus:", error);
      toast.error("Gagal mengambil data guru");
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateDoc(
          doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string,
            editId
          ),
          {
            ...formData,
            isActive: Boolean(formData.isActive),
            updatedAt: serverTimestamp(),
          }
        );
        toast.success("Data guru berhasil diupdate");
        handleCloseModal();
        fetchGurus();
      } else {
        if (!formData.password) {
          toast.error("Password harus diisi");
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error("Password minimal 6 karakter");
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch("/api/create-guru", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              namaLengkap: formData.namaLengkap,
              role: process.env.NEXT_PUBLIC_ROLE_GURU,
              tanggalLahir: formData.tanggalLahir,
              tempatLahir: formData.tempatLahir,
              alamat: formData.alamat,
              agama: formData.agama,
              ipk: formData.ipk,
              isActive: true,
              jenisKelamin: formData.jenisKelamin,
              jurusan: formData.jurusan,
              mataPelajaran: formData.mataPelajaran,
              telepon: formData.telepon,
              tingkatan: formData.tingkatan,
              universitas: formData.universitas,
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(
              data.error ||
                data.details ||
                "Terjadi kesalahan saat membuat akun guru"
            );
          }

          toast.success("Guru berhasil ditambahkan");
          handleCloseModal();
          await fetchGurus();
        } catch (error) {
          console.error("Error creating guru:", error);
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Terjadi kesalahan saat membuat akun guru");
          }
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Terjadi kesalahan saat menyimpan data guru");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!window.confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
        return;
      }

      setIsLoading(true);

      const response = await fetch("/api/delete-guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Gagal menghapus guru");
      }

      toast.success(data.message || "Guru berhasil dihapus");
      await fetchGurus();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menghapus guru"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (guru: Guru) => {
    setFormData({
      namaLengkap: guru.namaLengkap,
      tanggalLahir: guru.tanggalLahir,
      tempatLahir: guru.tempatLahir,
      alamat: guru.alamat,
      agama: guru.agama,
      email: guru.email,
      ipk: guru.ipk,
      isActive: guru.isActive,
      jenisKelamin: guru.jenisKelamin,
      jurusan: guru.jurusan,
      mataPelajaran: guru.mataPelajaran,
      telepon: guru.telepon,
      tingkatan: guru.tingkatan,
      universitas: guru.universitas,
      createdAt: guru.createdAt,
      updatedAt: guru.updatedAt,
    });
    setIsEditing(true);
    setEditId(guru.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      namaLengkap: "",
      tanggalLahir: "",
      tempatLahir: "",
      alamat: "",
      agama: "",
      email: "",
      ipk: "",
      isActive: true,
      jenisKelamin: "",
      jurusan: "",
      mataPelajaran: "",
      telepon: "",
      tingkatan: "",
      universitas: "",
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
    setEditId("");
  };

  // Filter and pagination logic
  const filteredGurus = gurus.filter(
    (guru) =>
      guru.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentGurus = filteredGurus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGurus.length / ITEMS_PER_PAGE);

  const handleConfirmDelete = async () => {
    if (!selectedGuruId) return;

    try {
      setIsLoading(true);

      const response = await fetch("/api/delete-guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: selectedGuruId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Gagal menghapus guru");
      }

      toast.success(data.message || "Guru berhasil dihapus");
      await fetchGurus();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menghapus guru"
      );
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedGuruId(null);
    }
  };

  useEffect(() => {
    fetchGurus();
  }, []);

  return {
    gurus: currentGurus,
    isModalOpen,
    setIsModalOpen,
    formData,
    isEditing,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDataLoading,
    totalPages,
    filteredGurus,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleCloseModal,
    setFormData,
    selectedGuruId,
    setSelectedGuruId,
    handleConfirmDelete,
  };
};
