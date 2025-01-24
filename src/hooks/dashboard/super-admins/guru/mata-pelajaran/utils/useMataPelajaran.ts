import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { MataPelajaran } from "@/hooks/schema/super-admins/guru/guru";

import { mataPelajaranService } from "@/hooks/dashboard/super-admins/guru/mata-pelajaran/utils/mataPelajaran";

export function useMataPelajaran() {
  const [mataPelajaranList, setMataPelajaranList] = useState<MataPelajaran[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<MataPelajaran>({ nama: "" });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm]);

  const fetchMataPelajaran = async () => {
    setIsDataLoading(true);
    try {
      const data = await mataPelajaranService.fetchAll();
      setMataPelajaranList(data);
    } catch {
      toast.error("Gagal memuat data");
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchMataPelajaran();
  }, []);

  const filteredMataPelajaran = mataPelajaranList.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMataPelajaran.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredMataPelajaran.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await mataPelajaranService.update(editId, { nama: formData.nama });
        toast.success("Mata pelajaran berhasil diperbarui!");
        setIsEditing(false);
        setEditId("");
      } else {
        await mataPelajaranService.create(formData);
        toast.success("Mata pelajaran berhasil ditambahkan!");
      }
      setFormData({ nama: "" });
      setShowForm(false);
      fetchMataPelajaran();
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: MataPelajaran) => {
    setIsEditing(true);
    setEditId(item.id!);
    setFormData({ nama: item.nama });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus mata pelajaran ini?")) {
      setIsLoading(true);
      try {
        await mataPelajaranService.delete(id);
        toast.success("Mata pelajaran berhasil dihapus!");
        fetchMataPelajaran();
      } catch {
        toast.error("Terjadi kesalahan saat menghapus.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ nama: "" });
    setIsEditing(false);
    setEditId("");
  };

  return {
    mataPelajaranList,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    formData,
    showForm,
    setShowForm,
    isEditing,
    isLoading,
    isDataLoading,
    paginatedData,
    totalPages,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCloseForm,
    setFormData,
  };
}
