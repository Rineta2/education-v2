import { NavItem } from "@/components/data/header/interface";

export const NavLinks: NavItem[] = [
  {
    id: 1,
    name: "Beranda",
    href: "/",
  },

  {
    id: 2,
    name: "Tentang Kami",
    href: "/tentang-kami",
    submenu: [
      {
        id: "tentang-1",
        name: "Sejarah",
        href: "/tentang-kami/sejarah",
      },
      {
        id: "tentang-2",
        name: "Visi & Misi",
        href: "/tentang-kami/visi-misi",
      },
      {
        id: "tentang-3",
        name: "Struktur Organisasi",
        href: "/tentang-kami/struktur",
      },
    ],
  },

  {
    id: 3,
    name: "Program",
    href: "/program",
    submenu: [
      {
        id: "program-1",
        name: "Kurikulum",
        href: "/program/kurikulum",
      },
      {
        id: "program-2",
        name: "Program Studi",
        href: "/program/program-studi",
      },
      {
        id: "program-3",
        name: "Kalender Akademik",
        href: "/program/kalender",
      },
    ],
  },

  {
    id: 4,
    name: "Guru",
    href: "/guru",
    submenu: [
      {
        id: "guru-1",
        name: "Jadwal Mengajar",
        href: "/guru/jadwal",
      },
      {
        id: "guru-2",
        name: "Nilai",
        href: "/guru/nilai",
      },
    ],
  },

  {
    id: 5,
    name: "Siswa",
    href: "/siswa",
    submenu: [
      {
        id: "siswa-1",
        name: "Jadwal Mengajar",
        href: "/siswa/jadwal",
      },
      {
        id: "siswa-2",
        name: "Nilai",
        href: "/siswa/nilai",
      },
    ],
  },

  {
    id: 6,
    name: "Berita",
    href: "/berita",
  },

  {
    id: 7,
    name: "Fitur",
    href: "/fitur",
    submenu: [
      {
        id: "fitur-1",
        name: "Jadwal Mengajar",
        href: "/fitur/jadwal",
      },
      {
        id: "fitur-2",
        name: "Nilai",
        href: "/fitur/nilai",
      },
    ],
  },
];
