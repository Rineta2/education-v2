import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';

import { ImUserTie } from "react-icons/im";

import { RiAdminFill } from "react-icons/ri";

export const menuItems = [
    {
        icon: FiHome,
        label: 'Dashboard',
        href: '/super-admins/dashboard',
    },

    {
        icon: RiAdminFill,
        label: 'Admin',
        href: '/super-admins/dashboard',
        subItems: [
            { label: 'Daftar Admin', href: '/super-admins/dashboard/admins' },
        ]
    },

    {
        icon: ImUserTie,
        label: 'Guru',
        href: '/super-admins/dashboard/guru',
        subItems: [
            { label: 'Daftar Guru', href: '/super-admins/dashboard/guru' },
            { label: 'Mata Pelajaran', href: '/super-admins/dashboard/guru/mata-pelajaran' },
            { label: 'Kelas', href: '/super-admins/dashboard/guru/kelas' },
        ]
    },

    {
        icon: FiUsers,
        label: 'Siswa',
        href: '/super-admins/student',
        subItems: [
            { label: 'Daftar Siswa', href: '/super-admins/student/list' },
            { label: 'Tambah Siswa', href: '/super-admins/student/add' },
        ]
    },

    {
        icon: FiSettings,
        label: 'Pengaturan',
        href: '/super-admins/settings',
        subItems: [
            { label: 'Profile', href: '/super-admins/settings/profile' },
            { label: 'Security', href: '/super-admins/settings/security' },
        ]
    },

    {
        icon: FiHome,
        label: 'Home',
        href: '/',
    },
];