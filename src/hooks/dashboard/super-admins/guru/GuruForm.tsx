import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

import {
    agamaOptions,
    jenisKelaminOptions,
    jurusanOptions,
    tingkatanOptions
} from '@/hooks/schema/super-admins/guru/guru';

import { GuruFormProps } from '@/hooks/schema/super-admins/guru/guru';

export const GuruForm = ({
    formData,
    setFormData,
    handleSubmit,
    handleCloseModal,
    isEditing,
    isLoading
}: GuruFormProps) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [mataPelajaranOptions, setMataPelajaranOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchMataPelajaran = async () => {
            try {
                const mataPelajaranRef = collection(db, 'mata_pelajaran');
                const snapshot = await getDocs(mataPelajaranRef);
                const options = snapshot.docs.map(doc => doc.data().nama);
                setMataPelajaranOptions(options);
            } catch (error) {
                console.error('Error fetching mata pelajaran:', error);
            }
        };

        fetchMataPelajaran();
    }, []);

    const validateForm = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.namaLengkap) newErrors.namaLengkap = 'Nama Lengkap harus diisi';
        if (!formData.mataPelajaran) newErrors.mataPelajaran = 'Mata Pelajaran harus dipilih';
        if (!formData.agama) newErrors.agama = 'Agama harus dipilih';
        if (!formData.jenisKelamin) newErrors.jenisKelamin = 'Jenis Kelamin harus dipilih';
        if (!formData.jurusan) newErrors.jurusan = 'Jurusan harus dipilih';
        if (!formData.tingkatan) newErrors.tingkatan = 'Tingkatan harus dipilih';
        if (!formData.email) newErrors.email = 'Email harus diisi';
        if (!formData.telepon) newErrors.telepon = 'Nomor Telepon harus diisi';
        if (!formData.universitas) newErrors.universitas = 'Universitas harus diisi';
        if (!formData.ipk) newErrors.ipk = 'IPK harus diisi';
        if (!formData.tempatLahir) newErrors.tempatLahir = 'Tempat Lahir harus diisi';
        if (!formData.tanggalLahir) newErrors.tanggalLahir = 'Tanggal Lahir harus diisi';
        if (!formData.alamat) newErrors.alamat = 'Alamat harus diisi';
        if (!isEditing && !formData.password) newErrors.password = 'Password harus diisi';
        if (!formData.isActive) newErrors.isActive = 'Status harus dipilih';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={validateForm} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                    {errors.namaLengkap && (
                        <span className="text-red-500 text-sm">{errors.namaLengkap}</span>
                    )}
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        value={formData.namaLengkap || ''}
                        onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.mataPelajaran && (
                        <span className="text-red-500 text-sm">{errors.mataPelajaran}</span>
                    )}
                    <select
                        value={formData.mataPelajaran || ''}
                        onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" className='text-title'>Pilih Mata Pelajaran</option>
                        {mataPelajaranOptions.map((option) => (
                            <option key={option} value={option} className='text-title'>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    {errors.agama && (
                        <span className="text-red-500 text-sm">{errors.agama}</span>
                    )}
                    <select
                        value={formData.agama || ''}
                        onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" className='text-title'>Pilih Agama</option>
                        {agamaOptions.map((option) => (
                            <option key={option} value={option} className='text-title'>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    {errors.jenisKelamin && (
                        <span className="text-red-500 text-sm">{errors.jenisKelamin}</span>
                    )}
                    <select
                        value={formData.jenisKelamin || ''}
                        onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" className='text-title'>Pilih Jenis Kelamin</option>
                        {jenisKelaminOptions.map((option) => (
                            <option key={option} value={option} className='text-title'>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    {errors.jurusan && (
                        <span className="text-red-500 text-sm">{errors.jurusan}</span>
                    )}
                    <select
                        value={formData.jurusan || ''}
                        onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" className='text-title'>Lulusan Dari Jurusan</option>
                        {jurusanOptions.map((option) => (
                            <option key={option} value={option} className='text-title'>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    {errors.tingkatan && (
                        <span className="text-red-500 text-sm">{errors.tingkatan}</span>
                    )}
                    <select
                        value={formData.tingkatan || ''}
                        onChange={(e) => setFormData({ ...formData, tingkatan: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" className='text-title'>Tingkatan</option>
                        {tingkatanOptions.map((option) => (
                            <option key={option} value={option} className='text-title'>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.telepon && (
                        <span className="text-red-500 text-sm">{errors.telepon}</span>
                    )}
                    <input
                        type="text"
                        placeholder="Telepon"
                        value={formData.telepon || ''}
                        onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.universitas && (
                        <span className="text-red-500 text-sm">{errors.universitas}</span>
                    )}
                    <input
                        type="text"
                        placeholder="Universitas"
                        value={formData.universitas || ''}
                        onChange={(e) => setFormData({ ...formData, universitas: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.ipk && (
                        <span className="text-red-500 text-sm">{errors.ipk}</span>
                    )}
                    <input
                        type="text"
                        placeholder="IPK"
                        value={formData.ipk || ''}
                        onChange={(e) => setFormData({ ...formData, ipk: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.tempatLahir && (
                        <span className="text-red-500 text-sm">{errors.tempatLahir}</span>
                    )}
                    <input
                        type="text"
                        placeholder="Tempat Lahir"
                        value={formData.tempatLahir || ''}
                        onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.tanggalLahir && (
                        <span className="text-red-500 text-sm">{errors.tanggalLahir}</span>
                    )}
                    <input
                        type="date"
                        placeholder="Tanggal Lahir"
                        value={formData.tanggalLahir || ''}
                        onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.alamat && (
                        <span className="text-red-500 text-sm">{errors.alamat}</span>
                    )}
                    <input
                        type="text"
                        placeholder="Alamat"
                        value={formData.alamat || ''}
                        onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password}</span>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password || ''}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {errors.isActive && (
                        <span className="text-red-500 text-sm">{errors.isActive}</span>
                    )}
                    <select
                        value={String(formData.isActive)}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                        className="w-full px-4 py-2.5 text-background rounded-lg border bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="true" className="text-title">
                            Aktif
                        </option>
                        <option value="false" className="text-title">
                            Tidak Aktif
                        </option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-end mt-6">
                <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
                    disabled={isLoading}
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#4318FF] hover:bg-[#3A16D9] text-white rounded-lg transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? 'Menyimpan...' : (isEditing ? 'Update' : 'Simpan')}
                </button>
            </div>
        </form>
    );
};