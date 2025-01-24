import { useState } from "react";
import {
  Kelas,
  FormData,
  FormErrors,
} from "@/hooks/schema/super-admins/guru/guru";
import { kelasService } from "@/hooks/dashboard/super-admins/guru/kelas/utils/FetchKelas";

export const useKelas = () => {
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({ nama: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama kelas wajib diisi";
    } else if (formData.nama.length < 3) {
      newErrors.nama = "Nama kelas minimal 3 karakter";
    } else if (formData.nama.length > 50) {
      newErrors.nama = "Nama kelas maksimal 50 karakter";
    } else if (!/^[a-zA-Z0-9\s-]+$/.test(formData.nama)) {
      newErrors.nama =
        "Nama kelas hanya boleh berisi huruf, angka, spasi, dan tanda hubung";
    } else {
      const isDuplicate = kelas.some(
        (k) =>
          k.nama.toLowerCase() === formData.nama.toLowerCase() &&
          (!isEditing || k.id !== editId)
      );
      if (isDuplicate) {
        newErrors.nama = "Nama kelas sudah ada";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing && editId) {
        await kelasService.updateKelas(editId, formData);
      } else {
        await kelasService.createKelas(formData);
      }
      setFormData({ nama: "" });
      setErrors({});
      setIsEditing(false);
      setEditId(null);

      // Reload data after submission
      setIsLoading(true);
      const data = await kelasService.getAllKelas();
      setKelas(data);
      setIsLoading(false);

      return true;
    } catch {
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
      try {
        await kelasService.deleteKelas(id);

        // Reload data after deletion
        setIsLoading(true);
        const data = await kelasService.getAllKelas();
        setKelas(data);
        setIsLoading(false);

        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return {
    kelas,
    isLoading,
    formData,
    isEditing,
    editId,
    errors,
    isSubmitting,
    setKelas,
    setIsLoading,
    setFormData,
    setIsEditing,
    setEditId,
    setErrors,
    handleSubmit,
    handleDelete,
  };
};
