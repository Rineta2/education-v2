import { useState, useEffect } from 'react';

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';

import { toast } from 'react-hot-toast';

import { db } from '@/utils/firebase';

import { Admin, FormData } from '@/hooks/schema/super-admins/admin/admin';

const ITEMS_PER_PAGE = 10;

export const useAdminManagement = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        namaLengkap: '',
        password: '',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const fetchAdmins = async () => {
        setIsDataLoading(true);
        try {
            const q = query(
                collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
                where('role', '==', process.env.NEXT_PUBLIC_ROLE_ADMIN as string)
            );
            const querySnapshot = await getDocs(q);
            const adminList: Admin[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                adminList.push({
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt || new Date().toISOString(),
                    updatedAt: data.updatedAt || new Date().toISOString(),
                } as Admin);
            });
            setAdmins(adminList);
        } catch {
            toast.error('Gagal mengambil data admin');
        } finally {
            setIsDataLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditing) {
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, editId), {
                    email: formData.email,
                    namaLengkap: formData.namaLengkap,
                    isActive: formData.isActive,
                    updatedAt: new Date().toISOString(),
                });
                toast.success('Admin berhasil diupdate');
                handleCloseModal();
                fetchAdmins();
            } else {
                if (formData.password.length < 6) {
                    toast.error('Password minimal 6 karakter');
                    setIsLoading(false);
                    return;
                }

                const adminData = {
                    email: formData.email,
                    namaLengkap: formData.namaLengkap,
                    role: process.env.NEXT_PUBLIC_ROLE_ADMIN as string,
                    isActive: formData.isActive,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                const docRef = await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string), adminData);

                try {
                    const response = await fetch('/api/create-admin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                            uid: docRef.id,
                            namaLengkap: formData.namaLengkap
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        await deleteDoc(docRef);
                        throw new Error(data.error || data.details || 'Terjadi kesalahan saat membuat admin');
                    }

                    if (data.success) {
                        toast.success('Admin berhasil ditambahkan');
                        handleCloseModal();
                        await fetchAdmins();
                    }
                } catch {
                    await deleteDoc(docRef);
                    toast.error('Terjadi kesalahan saat membuat admin');
                }
            }
        } catch {
            toast.error('Terjadi kesalahan saat membuat admin');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setAdminToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!adminToDelete) return;
        setIsDeleteLoading(true);

        try {
            const adminDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, adminToDelete));
            if (!adminDoc.exists()) {
                toast.error('Data admin tidak ditemukan');
                return;
            }

            const adminData = adminDoc.data();
            const uid = adminData.uid;

            try {
                const response = await fetch('/api/delete-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Gagal menghapus user dari Authentication');
                }

                await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, adminToDelete));
                toast.success('Admin berhasil dihapus');
                fetchAdmins();
            } catch {
                toast.error('Gagal menghapus admin');
            }
        } catch {
            toast.error('Gagal menghapus admin');
        } finally {
            setIsDeleteLoading(false);
            setIsDeleteModalOpen(false);
            setAdminToDelete(null);
        }
    };

    const handleEdit = (admin: Admin) => {
        setFormData({
            email: admin.email,
            namaLengkap: admin.namaLengkap,
            password: '',
            isActive: admin.isActive,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
        });
        setIsEditing(true);
        setEditId(admin.id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            email: '',
            namaLengkap: '',
            password: '',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        setIsEditing(false);
        setEditId('');
    };

    // Filter and pagination logic
    const filteredAdmins = admins.filter(admin =>
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);

    useEffect(() => {
        fetchAdmins();
    }, []);

    return {
        admins: currentAdmins,
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
        isDeleteLoading,
        setIsDeleteModalOpen,
        isDataLoading,
        totalPages,
        filteredAdmins,
        handleSubmit,
        handleDelete,
        confirmDelete,
        handleEdit,
        handleCloseModal,
        setFormData,
    };
};