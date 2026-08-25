import { AppData } from './types';

export const emptyAppDataEn: AppData = {
  idea: {
    name: 'New Project',
    about: '',
    audience: '',
    problem: '',
  },
  localization: {
    languages: '',
    currencies: '',
    measurement: 'na',
  },
  generatedSpecify: {
    overview: '',
    userStories: [],
    requirements: [],
  },
  plan: {
    features: [],
    isOffline: false,
    homeScreen: '',
    nfrs: {
      security: '',
      performance: '',
      scalability: '',
    },
  },
  generatedPlan: {
    dataModels: '',
    apiNeeds: '',
    uiUxNotes: '',
  },
  generatedTasks: [],
};

export const emptyAppDataId: AppData = {
  idea: {
    name: 'Proyek Baru',
    about: '',
    audience: '',
    problem: '',
  },
  localization: {
    languages: 'Bahasa Indonesia',
    currencies: 'IDR (Rupiah)',
    measurement: 'metric',
  },
  generatedSpecify: {
    overview: '',
    userStories: [],
    requirements: [],
  },
  plan: {
    features: [],
    isOffline: false,
    homeScreen: '',
    nfrs: {
      security: '',
      performance: '',
      scalability: '',
    },
  },
  generatedPlan: {
    dataModels: '',
    apiNeeds: '',
    uiUxNotes: '',
  },
  generatedTasks: [],
};

export const emptyAppData = emptyAppDataEn;

export const sampleAppDataEn: AppData = {
  idea: {
    name: 'Book Club Social App',
    about: 'A mobile and web application designed to help book lovers create, manage, and participate in book clubs. It facilitates discussions, tracks reading progress, and helps schedule meetings.',
    audience: 'Avid readers, members of existing book clubs, individuals looking to join a reading community, students, and educators.',
    problem: 'Organizing book clubs can be chaotic. Using generic chat apps for discussions leads to spoilers and off-topic conversations. It\'s also difficult to track reading progress and schedule meetings that work for everyone.',
  },
  localization: {
    languages: 'English, Spanish',
    currencies: 'USD',
    measurement: 'na',
  },
  generatedSpecify: {
    overview: 'The Book Club Social App is a centralized platform for managing reading communities. It aims to enhance the book club experience by providing dedicated spaces for discussion, progress tracking tools, and integrated scheduling. By solving the common organizational hurdles, the app allows members to focus on what they love: reading and discussing books.',
    userStories: [
      'As a book club administrator, I want to create a new book club and invite members so that I can start a new reading group.',
      'As a book club member, I want to view the current book and my reading progress so that I can stay on track.',
      'As a user, I want to join discussion threads for specific chapters so that I can share my thoughts without seeing spoilers.',
      'As a club coordinator, I want to schedule virtual or in-person book discussions with calendar reminders.',
    ],
    requirements: [
      'Users must be able to sign up, log in, and customize their reader profile.',
      'The application must support the creation, joining, and management of public and private book clubs.',
      'Each book club must have a dedicated page with the current book spotlight, chapter discussion forums, and member lists.',
      'A progress tracking feature must allow users to update how far they have read in the current book in real time.',
    ],
  },
  plan: {
    features: [
      'User Authentication (Sign up / Login)',
      'User Profiles',
      'Push Notifications',
      'Messaging / Chat',
      'Search Functionality',
    ],
    isOffline: false,
    homeScreen: 'A personalized dashboard that displays a list of the user\'s book clubs. Each list item shows the current book cover, title, and a progress bar. Below this, there is a feed of recent discussion highlights from all their clubs.',
    nfrs: {
      security: 'User data and passwords must be encrypted. API endpoints should be secured with session tokens.',
      performance: 'The app should load key content within 2 seconds on a standard mobile connection.',
      scalability: 'The architecture should be able to support up to 10,000 active users initially.',
    },
  },
  generatedPlan: {
    dataModels: `
### User
| Field         | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| userId        | String    | Unique identifier for the user       |
| username      | String    | Public display name                  |
| email         | String    | User's email for login & notifications |
| profilePicture| URL       | URL to the user's avatar image       |
| bookClubs     | Array     | List of book club IDs the user is in |

### BookClub
| Field         | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| clubId        | String    | Unique identifier for the book club  |
| name          | String    | Name of the book club                |
| description   | String    | A short description of the club      |
| members       | Array     | List of user IDs in the club         |
| currentBookId | String    | ID of the book currently being read  |
`,
    apiNeeds: `
- **Google Books API:** To fetch book details, covers, and descriptions based on ISBN or title. This reduces manual data entry for users.
- **Firebase Cloud Messaging:** For sending push notifications about new discussions or upcoming meetings.
`,
    uiUxNotes: `
- **Clean & Minimalist Design:** Use a clean, readable font and plenty of white space to focus on the reading content.
- **Visual Progress Indicators:** Use progress bars or circular charts to make tracking reading visually appealing.
- **Spoiler Protection:** Discussions should be clearly marked by chapter or section, and content hidden until clicked.
`,
    selectedTechStack: 'React + TypeScript + Tailwind CSS + Lucide Icons',
    userFlow: [
      { step: 1, screen: 'Home Dashboard', action: 'Browse current active book clubs & reading progress', outcome: 'Select a club or click "+" to create a new one' },
      { step: 2, screen: 'Create Club Modal', action: 'Input club name, description, and search initial book', outcome: 'Club created with creator as admin' },
      { step: 3, screen: 'Club Detail & Feed', action: 'View book info, reading schedule & chapter discussions', outcome: 'Join conversation or log pages read' },
      { step: 4, screen: 'Chapter Discussion', action: 'Post note or comment with optional [Spoiler] tag', outcome: 'Message posted, notifications dispatched to members' },
    ],
    wireframes: [
      {
        id: 'screen-1',
        name: 'Home Dashboard',
        deviceType: 'mobile',
        purpose: 'Main landing view showing active book clubs, reading progress bars, and recent discussion feed.',
        elements: [
          { id: 'e1', type: 'header', label: 'App Header', description: 'Logo "BookSphere", Notification bell, User avatar' },
          { id: 'e2', type: 'search', label: 'Club / Book Search Bar', description: 'Quick search for joined clubs or explore new titles' },
          { id: 'e3', type: 'hero', label: 'Active Reading Card', description: 'Featured Current Book: "Dune", Progress 64%, Next meeting Thursday' },
          { id: 'e4', type: 'list', label: 'My Book Clubs (Horizontal Scroll)', description: 'Sci-Fi Explorers (12 members), Classic Literature (8 members)' },
          { id: 'e5', type: 'card', label: 'Recent Discussion Highlights', description: 'Feed of spoiler-shielded comments from club members' },
          { id: 'e6', type: 'navbar', label: 'Bottom Navigation Bar', description: 'Home, Explore, Create (+), Notifications, Profile' },
        ]
      },
      {
        id: 'screen-2',
        name: 'Book Club Detail & Reading Progress',
        deviceType: 'mobile',
        purpose: 'Specific club workspace displaying current book, chapter milestone breakdown, and discussion threads.',
        elements: [
          { id: 'e2-1', type: 'header', label: 'Club Header', description: 'Back button, Club Title "Sci-Fi Explorers", Settings gear' },
          { id: 'e2-2', type: 'card', label: 'Current Book Spotlight', description: 'Cover image placeholder, Title, Author, Target Deadline' },
          { id: 'e2-3', type: 'chart', label: 'Reading Progress Visualizer', description: 'Member progress bars comparison (Avg: 58% complete)' },
          { id: 'e2-4', type: 'tabs', label: 'Content Tabs', description: 'Tab 1: Discussions | Tab 2: Schedule | Tab 3: Members' },
          { id: 'e2-5', type: 'chat', label: 'Chapter 4 Thread (Spoiler Guarded)', description: 'Click to reveal comments for Chapters 1-4' },
          { id: 'e2-6', type: 'button', label: 'Log Pages Read (CTA)', description: 'Quick update counter modal trigger' },
        ]
      },
      {
        id: 'screen-3',
        name: 'Create New Club Form',
        deviceType: 'mobile',
        purpose: 'Simple step-by-step form to start a reading group and invite members.',
        elements: [
          { id: 'e3-1', type: 'header', label: 'Form Navigation', description: 'Cancel (X), "Create a Club" title, Save checkmark' },
          { id: 'e3-2', type: 'form', label: 'Club Details Input', description: 'Club Name input, Category pills, Visibility toggle (Public/Private)' },
          { id: 'e3-3', type: 'search', label: 'Select First Book', description: 'Integrates Google Books API autocomplete lookup' },
          { id: 'e3-4', type: 'card', label: 'Meeting Cadence Picker', description: 'Weekly / Bi-weekly / Monthly meeting rhythm' },
          { id: 'e3-5', type: 'button', label: 'Launch Book Club (Primary CTA)', description: 'Final submit button and invite link generator' },
        ]
      }
    ]
  },
  generatedTasks: [
    {
      title: 'Setup Database Schema & Models for Clubs and Users',
      criteria: [
        'Define User and BookClub schema with TypeScript interfaces.',
        'Implement repository methods for CRUD operations.',
        'Ensure local persistence cache fallback for offline reading.',
      ],
      agentRole: 'Database & Data Architect',
      agentPersona: 'Specializes in data structures, ORM schemas, migration scripts, and offline storage caching.',
      toolsRequired: ['file_system', 'schema_validator'],
      dependencies: ['Project initialization'],
      executionOrder: 1,
    },
    {
      title: 'Set up User Authentication & Session Security',
      criteria: [
        'Users can sign up using an email and password.',
        'Users can log in with their credentials.',
        'A user session is created upon successful login.',
        'Users can log out, which terminates their session.',
      ],
      agentRole: 'Auth & Security Specialist',
      agentPersona: 'Focuses on OAuth, JWT tokens, session lifecycle, and route guard middleware.',
      toolsRequired: ['file_system', 'crypto_lib'],
      dependencies: ['Setup Database Schema & Models for Clubs and Users'],
      executionOrder: 2,
    },
    {
      title: 'Develop Book Club Creation & API Flow',
      criteria: [
        'An authenticated user can access a "Create Club" form.',
        'The form requires a club name and description.',
        'On submission, a new book club is created in the database.',
        'The creator is automatically added as the first member and administrator.',
      ],
      agentRole: 'Backend & API Specialist',
      agentPersona: 'Designs RESTful endpoints, third-party API clients, and business logic pipelines.',
      toolsRequired: ['file_system', 'api_client', 'terminal'],
      dependencies: ['Setup Database Schema & Models for Clubs and Users'],
      executionOrder: 3,
    },
    {
      title: 'Implement Home Screen Dashboard & Reading Progress',
      criteria: [
        'The dashboard fetches and displays all book clubs the user is a member of.',
        'Each club card shows the current book\'s cover and title.',
        'A progress bar indicates the current reading progress (initially 0%).',
      ],
      agentRole: 'Frontend UI Specialist',
      agentPersona: 'Builds pixel-perfect React components, Tailwind styling, animations, and responsive layouts.',
      toolsRequired: ['file_system', 'browser_preview', 'design_tokens'],
      dependencies: ['Develop Book Club Creation & API Flow'],
      executionOrder: 4,
    },
    {
      title: 'Create Automated Test Suite & Acceptance Checks',
      criteria: [
        'Unit test book club state management and reducer logic.',
        'Mock Google Books API to verify fallback behavior.',
        'End-to-end user flow verification for creating a club.',
      ],
      agentRole: 'QA & Test Engineer',
      agentPersona: 'Writes robust test fixtures, mocks external APIs, and validates edge cases against specs.',
      toolsRequired: ['terminal', 'test_runner'],
      dependencies: ['Implement Home Screen Dashboard & Reading Progress'],
      executionOrder: 5,
    },
  ],
};

export const sampleAppDataId: AppData = {
  idea: {
    name: 'Aplikasi Komunitas Klub Buku',
    about: 'Aplikasi seluler dan web untuk membantu pecinta buku membuat, mengelola, dan berpartisipasi dalam komunitas membaca. Memfasilitasi forum diskusi terstruktur per bab, pelacakan target membaca harian, dan penjadwalan sesi bedah buku.',
    audience: 'Pembaca buku aktif, anggota klub buku komunitas, mahasiswa, pelajar, dan siapa saja yang ingin membangun kebiasaan membaca interaktif.',
    problem: 'Mengelola klub buku melalui grup obrolan biasa sering kali berantakan, rawan bocoran isi buku (spoiler), dan sulit memantau konsistensi membaca anggota serta menyepakati jadwal pertemuan yang cocok.',
  },
  localization: {
    languages: 'Bahasa Indonesia, English',
    currencies: 'IDR (Rupiah)',
    measurement: 'metric',
  },
  generatedSpecify: {
    overview: 'Aplikasi Komunitas Klub Buku (BookSphere) adalah platform terpadu untuk mengelola komunitas literasi dan kelompok membaca secara terstruktur. Aplikasi ini dirancang untuk meningkatkan pengalaman bedah buku melalui ruang diskusi terproteksi spoiler per bab, indikator visual progres membaca harian, serta asisten penjadwalan pertemuan otomatis. Dengan menyelesaikan tantangan koordinasi teknis, para anggota dapat fokus pada kenikmatan membaca, bertukar wawasan, dan memperdalam pemahaman karya literatur.',
    userStories: [
      'Sebagai pengurus klub buku, saya ingin membuat ruang komunitas baru dan membagikan tautan undangan agar pembaca baru dapat bergabung dengan mudah.',
      'Sebagai anggota klub, saya ingin melihat judul buku aktif saat ini dan mencatat halaman terakhir yang dibaca agar progres saya terpantau dengan jelas.',
      'Sebagai pembaca, saya ingin membuka forum diskusi khusus bab tertentu dengan pelindung spoiler agar dapat bertukar pikiran tanpa merusak kejutan cerita bagi anggota yang belum selesai.',
      'Sebagai penyelenggara, saya ingin membuat agenda temu wicara daring (webinar) atau tatap muka lengkap dengan pengingat notifikasi otomatis.',
    ],
    requirements: [
      'Pengguna dapat membuat akun baru, masuk, dan melengkapi profil pembaca beserta daftar buku favorit.',
      'Aplikasi mendukung pembuatan, pencarian, dan pengelolaan ruang klub buku publik maupun komunitas privat.',
      'Setiap klub memiliki beranda terdedikasi dengan sorotan buku aktif, forum diskusi tersegmentasi per bab, dan daftar anggota.',
      'Fitur pelacak progres membaca memungkinkan pencatatan persentase halaman yang telah diselesaikan secara visual dan real-time.',
    ],
  },
  plan: {
    features: [
      'User Authentication (Sign up / Login)',
      'User Profiles',
      'Push Notifications',
      'Messaging / Chat',
      'Search Functionality',
    ],
    isOffline: false,
    homeScreen: 'Dasbor beranda terpersonalisasi yang menampilkan kartu sorotan buku yang sedang dibaca, bilah progres halaman harian, daftar kartu klub buku yang diikuti, dan sorotan diskusi komunitas terbaru.',
    nfrs: {
      security: 'Data kredensial pengguna dan kata sandi dienkripsi dengan standar industri. Endpoint API dilindungi token otentikasi sesi.',
      performance: 'Waktu muat konten beranda di bawah 2 detik pada koneksi internet seluler standar.',
      scalability: 'Arsitektur modular yang siap melayani hingga puluhan ribu pengguna aktif secara bersamaan.',
    },
  },
  generatedPlan: {
    dataModels: `
### Pengguna (User)
| Kolom         | Tipe Data | Deskripsi                            |
|---------------|-----------|--------------------------------------|
| idPengguna    | String    | Pengenal unik untuk setiap pengguna  |
| namaTampilan  | String    | Nama publik yang terlihat di profil  |
| email         | String    | Alamat surel untuk masuk & notifikasi|
| fotoProfil    | URL       | Tautan URL avatar foto profil        |
| daftarKlub    | Array     | Daftar ID klub buku yang diikuti     |

### KlubBuku (BookClub)
| Kolom         | Tipe Data | Deskripsi                            |
|---------------|-----------|--------------------------------------|
| idKlub        | String    | Pengenal unik ruang klub buku        |
| namaKlub      | String    | Nama resmi komunitas atau kelompok   |
| deskripsi     | String    | Penjelasan singkat mengenai tema klub|
| anggota       | Array     | Daftar ID pengguna yang menjadi anggota|
| idBukuAktif   | String    | ID buku yang sedang dibaca bersama   |
`,
    apiNeeds: `
- **Google Books API:** Untuk mengambil informasi buku, gambar sampul, dan sinopsis resmi secara otomatis berdasarkan ISBN atau judul buku.
- **Firebase Cloud Messaging:** Untuk mengirimkan notifikasi push secara real-time saat ada pengumuman jadwal temu atau respons diskusi bab baru.
`,
    uiUxNotes: `
- **Desain Bersih & Elegan:** Menggunakan hierarki visual lapang dan tipografi yang nyaman di mata untuk sesi membaca yang lama.
- **Pelindung Bocoran Cerita (Spoiler Shield):** Konten komentar diskusi bab disamarkan atau dilipat sampai pengguna mengklik konfirmasi.
- **Visualisasi Progres Interaktif:** Menampilkan grafik persentase atau cincin progres harian yang memotivasi pembaca menyelesaikan buku.
`,
    selectedTechStack: 'React + TypeScript + Tailwind CSS + Lucide Icons',
    userFlow: [
      { step: 1, screen: 'Dasbor Beranda', action: 'Melihat buku aktif dan progres bacaan terkini', outcome: 'Memilih klub aktif atau menekan tombol "+" untuk membuat komunitas baru' },
      { step: 2, screen: 'Modal Buat Klub', action: 'Mengisi nama klub, deskripsi, dan mencari buku bacaan pertama', outcome: 'Klub baru terbuat dan pembuat otomatis menjadi pengurus utama' },
      { step: 3, screen: 'Ruang Detail Klub', action: 'Melihat jadwal membaca bab dan membuka forum pembahasan', outcome: 'Bergabung dalam obrolan atau mencatat halaman yang sudah dibaca' },
      { step: 4, screen: 'Utas Diskusi Bab', action: 'Mengirim komentar atau pertanyaan dengan label proteksi spoiler', outcome: 'Pesan terbit dan notifikasi dikirimkan ke anggota klub terkait' },
    ],
    wireframes: [
      {
        id: 'screen-1',
        name: 'Dasbor Beranda',
        deviceType: 'mobile',
        purpose: 'Tampilan beranda utama yang menyajikan kartu buku aktif, persentase progres membaca, dan rangkuman diskusi.',
        elements: [
          { id: 'e1', type: 'header', label: 'Bilah Tajuk Aplikasi', description: 'Logo "BookSphere", Lonceng Notifikasi, dan Avatar Profil' },
          { id: 'e2', type: 'search', label: 'Bilah Pencarian Klub / Buku', description: 'Pencarian cepat klub yang diikuti atau eksplorasi judul buku baru' },
          { id: 'e3', type: 'hero', label: 'Kartu Bacaan Aktif', description: 'Buku Utama: "Laskar Pelangi", Progres 64%, Pertemuan Diskusi: Kamis' },
          { id: 'e4', type: 'list', label: 'Klub Buku Saya (Gulir Horizontal)', description: 'Komunitas Fiksi Ilmiah (12 anggota), Sastra Klasik (8 anggota)' },
          { id: 'e5', type: 'card', label: 'Sorotan Diskusi Terbaru', description: 'Umpan komentar anggota terlindungi pelindung spoiler' },
          { id: 'e6', type: 'navbar', label: 'Bilah Navigasi Bawah', description: 'Beranda, Eksplorasi, Buat (+), Notifikasi, Profil' },
        ]
      },
      {
        id: 'screen-2',
        name: 'Ruang Detail Klub & Progres Baca',
        deviceType: 'mobile',
        purpose: 'Halaman kerja klub untuk melihat detail buku, pembagian target bab mingguan, dan utas diskusi.',
        elements: [
          { id: 'e2-1', type: 'header', label: 'Tajuk Klub Komunitas', description: 'Tombol Kembali, Nama Klub "Fiksi Ilmiah", Tombol Pengaturan' },
          { id: 'e2-2', type: 'card', label: 'Sorotan Buku Saat Ini', description: 'Sampul Buku, Judul, Penulis, Batas Target Membaca Bab' },
          { id: 'e2-3', type: 'chart', label: 'Visualisasi Progres Anggota', description: 'Perbandingan rata-rata capaian bacaan anggota (Rata-rata: 58%)' },
          { id: 'e2-4', type: 'tabs', label: 'Tab Menu Konten', description: 'Tab 1: Forum Diskusi | Tab 2: Jadwal Temu | Tab 3: Daftar Anggota' },
          { id: 'e2-5', type: 'chat', label: 'Utas Bab 4 (Pelindung Spoiler)', description: 'Klik tombol untuk membuka komentar Bab 1-4 dengan aman' },
          { id: 'e2-6', type: 'button', label: 'Catat Halaman Baca (Aksi Cepat)', description: 'Membuka pop-up pengisian jumlah halaman yang telah diselesaikan' },
        ]
      },
      {
        id: 'screen-3',
        name: 'Formulir Pembuatan Klub Baru',
        deviceType: 'mobile',
        purpose: 'Formulir bertahap untuk memulai klub buku baru dan mengundang anggota pertama.',
        elements: [
          { id: 'e3-1', type: 'header', label: 'Navigasi Formulir', description: 'Batal (X), Judul "Buat Klub Baru", Simpan (Centang)' },
          { id: 'e3-2', type: 'form', label: 'Pengisian Detail Klub', description: 'Input nama komunitas, pilihan kategori buku, opsi Privasi (Publik/Privat)' },
          { id: 'e3-3', type: 'search', label: 'Pencarian Buku Perdana', description: 'Integrasi lookup data otomatis dari Google Books API' },
          { id: 'e3-4', type: 'card', label: 'Frekuensi Pertemuan Rutin', description: 'Pilihan ritme pertemuan: Mingguan / Dua Mingguan / Bulanan' },
          { id: 'e3-5', type: 'button', label: 'Terbitkan Klub Buku (Tombol Utama)', description: 'Tombol konfirmasi akhir dan pembuat tautan undangan' },
        ]
      }
    ]
  },
  generatedTasks: [
    {
      title: 'Konfigurasi Skema Basis Data & Model Pengguna dan Klub',
      criteria: [
        'Definisikan interface TypeScript untuk entitas Pengguna dan KlubBuku.',
        'Implementasikan fungsi CRUD dan repository penyimpanan data.',
        'Sediakan mekanisme caching lokal untuk akses saat luring (offline).',
      ],
      agentRole: 'Database & Data Architect',
      agentPersona: 'Bertanggung jawab atas arsitektur data, skema database, dan cache penyimpanan lokal.',
      toolsRequired: ['file_system', 'schema_validator'],
      dependencies: ['Inisialisasi Proyek'],
      executionOrder: 1,
    },
    {
      title: 'Implementasi Otentikasi Pengguna & Keamanan Sesi',
      criteria: [
        'Pengguna dapat mendaftar akun baru dengan email dan kata sandi.',
        'Pengguna dapat masuk (login) dengan validasi kredensial yang aman.',
        'Sesi token pengguna dibuat secara terenkripsi dan dapat keluar (logout).',
      ],
      agentRole: 'Auth & Security Specialist',
      agentPersona: 'Fokus pada otorisasi, keamanan token sesi JWT, dan proteksi rute aplikasi.',
      toolsRequired: ['file_system', 'crypto_lib'],
      dependencies: ['Konfigurasi Skema Basis Data & Model Pengguna dan Klub'],
      executionOrder: 2,
    },
    {
      title: 'Pengembangan Alur Pembuatan Klub & Integrasi API Buku',
      criteria: [
        'Pengguna yang terautentikasi dapat membuka formulir "Buat Klub".',
        'Formulir memvalidasi nama klub, deskripsi, dan pencarian judul buku pertama.',
        'Pembuat klub otomatis terdaftar sebagai anggota perdana sekaligus administrator.',
      ],
      agentRole: 'Backend & API Specialist',
      agentPersona: 'Membangun rute backend, integrasi API Google Books, dan logika bisnis komunitas.',
      toolsRequired: ['file_system', 'api_client', 'terminal'],
      dependencies: ['Konfigurasi Skema Basis Data & Model Pengguna dan Klub'],
      executionOrder: 3,
    },
    {
      title: 'Pembangunan Antarmuka Beranda & Indikator Progres Bacaan',
      criteria: [
        'Dasbor memuat dan menampilkan seluruh klub yang diikuti pengguna secara rapi.',
        'Setiap kartu klub menampilkan sampul buku dan persentase progres membaca.',
        'Komponen interaktif dan responsif di berbagai resolusi layar perangkat seluler.',
      ],
      agentRole: 'Frontend UI Specialist',
      agentPersona: 'Membangun komponen visual React, styling Tailwind, dan tata letak responsif.',
      toolsRequired: ['file_system', 'browser_preview', 'design_tokens'],
      dependencies: ['Pengembangan Alur Pembuatan Klub & Integrasi API Buku'],
      executionOrder: 4,
    },
    {
      title: 'Penyusunan Rangkaian Uji Otomatis & Verifikasi Kriteria',
      criteria: [
        'Uji unit logika state management dan kalkulasi progres persentase halaman.',
        'Mocking API Google Books untuk menguji ketahanan skenario gagal jaringan.',
        'Verifikasi menyeluruh alur pendaftaran hingga pembentukan ruang klub baru.',
      ],
      agentRole: 'QA & Test Engineer',
      agentPersona: 'Menulis pengujian unit, integrasi komponen, dan validasi kriteria penerimaan.',
      toolsRequired: ['terminal', 'test_runner'],
      dependencies: ['Pembangunan Antarmuka Beranda & Indikator Progres Bacaan'],
      executionOrder: 5,
    },
  ],
};

export const sampleAppData = sampleAppDataEn;

export function getSampleAppData(language: string = 'en'): AppData {
  return language === 'id' ? sampleAppDataId : sampleAppDataEn;
}

export function getEmptyAppData(language: string = 'en'): AppData {
  return language === 'id' ? emptyAppDataId : emptyAppDataEn;
}
