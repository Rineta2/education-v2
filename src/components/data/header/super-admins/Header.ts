import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';


export const menuItems = [
    {
        icon: FiHome,
        label: 'Dashboard',
        href: '/super-admins/dashboard',
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