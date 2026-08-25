import React, { createContext, useContext, useState } from 'react';

export type AppLanguage = 'en' | 'id';

export interface TranslationDictionary {
  // Common & Header
  appTitle: string;
  appSubtitle: string;
  currentlyEditing: string;
  projectsBtn: string;
  newProjectBtn: string;
  backBtn: string;
  nextBtn: string;
  loading: string;
  loadingProjects: string;
  builtWith: string;
  languageToggle: string;
  edit: string;
  finishEdit: string;
  delete: string;
  cancel: string;
  save: string;
  add: string;
  open: string;
  close: string;
  all: string;
  filter: string;
  search: string;
  overview: string;
  none: string;
  retry: string;
  copied: string;
  copy: string;
  download: string;

  // Stages
  stages: {
    specify: { name: string; description: string };
    plan: { name: string; description: string };
    task: { name: string; description: string };
    implement: { name: string; description: string };
  };

  // Stage 1: Specify
  specify: {
    title: string;
    subtitle: string;
    appNameLabel: string;
    appNamePlaceholder: string;
    appAboutLabel: string;
    appAboutPlaceholder: string;
    appAudienceLabel: string;
    appAudiencePlaceholder: string;
    appProblemLabel: string;
    appProblemPlaceholder: string;
    locTitle: string;
    locLangLabel: string;
    locLangPlaceholder: string;
    locCurrLabel: string;
    locCurrPlaceholder: string;
    locMeasureLabel: string;
    generateBtn: string;
    regenerateBtn: string;
    overviewTitle: string;
    overviewPlaceholder: string;
    userStoriesTitle: string;
    addUserStoryBtn: string;
    requirementsTitle: string;
    addRequirementBtn: string;
    apiKeyMissing: string;
    loadSampleBtn: string;
    translateProjectBtn: string;
    translatingProject: string;
    translateSuccess: string;
    clearFormBtn: string;
    sampleBanner: string;
  };

  // Stage 2: Plan & Wireframes
  plan: {
    title: string;
    subtitle: string;
    tabWireframe: string;
    tabSpecs: string;
    tabAll: string;
    commonFeaturesTitle: string;
    offlineModeTitle: string;
    onlineOnly: string;
    offlineSupport: string;
    homeScreenLabel: string;
    homeScreenPlaceholder: string;
    nfrTitle: string;
    securityLabel: string;
    securityPlaceholder: string;
    performanceLabel: string;
    performancePlaceholder: string;
    generateBtn: string;
    regenerateBtn: string;
    dataModelsTitle: string;
    dataModelsPlaceholder: string;
    apiNeedsTitle: string;
    apiNeedsPlaceholder: string;
    uiUxNotesTitle: string;
    uiUxNotesPlaceholder: string;
    wireframeTitle: string;
    wireframeSubtitle: string;
    noWireframeTitle: string;
    noWireframeDesc: string;
    userFlowTitle: string;
    userFlowSubtitle: string;
    noUserFlow: string;
    userAction: string;
    systemOutcome: string;
    screen: string;
    deviceMobile: string;
    deviceDesktop: string;
    inspectorTitle: string;
    inspectorEmpty: string;
    componentType: string;
    componentLabel: string;
    specNotes: string;
    addComponentTitle: string;
    addComponentBtn: string;
    openBuilderBtn: string;
    elementLabelPlaceholder: string;
    elementDescPlaceholder: string;
    wireframeTipTitle: string;
    wireframeTipDesc: string;
    deleteElemTooltip: string;
    deselect: string;
  };

  // Stage 3: Task & Agent Squad
  task: {
    title: string;
    subtitle: string;
    tasksCount: string;
    tasksCountBadge: string;
    loadingTitle: string;
    loadingSubtitle: string;
    retryBtn: string;
    regenerateTasksBtn: string;
    filterAllAgents: string;
    filterAgent: string;
    allAgents: string;
    viewSolo: string;
    viewSquad: string;
    viewBoth: string;
    viewUnified: string;
    addTaskBtn: string;
    reassignRole: string;
    criteriaTitle: string;
    criteriaHeader: string;
    addCriterionBtn: string;
    toolsTitle: string;
    dependenciesTitle: string;
    assignedAgent: string;
    agentFocus: string;
    soloViewTitle: string;
    soloViewSubtitle: string;
    squadViewTitle: string;
    squadViewSubtitle: string;
    noTasks: string;
    executionOrder: string;
    doneBtn: string;
    editAgentBtn: string;
    assignedRoleLabel: string;
    requiredToolsLabel: string;
    executionOrderLabel: string;
  };

  // Stage 4: Implement & Prompt Engineering
  implement: {
    title: string;
    subtitle: string;
    tabMaster: string;
    tabAgents: string;
    tabOrchestrator: string;
    tabMarkdown: string;
    copyPromptBtn: string;
    downloadBtn: string;
    copySuccess: string;
    copiedAlert: string;
    masterTitle: string;
    masterSubtitle: string;
    copyMasterBtn: string;
    selectRoleHeader: string;
    agentPromptDesc: string;
    copyRolePromptBtn: string;
    orchTitle: string;
    orchSubtitle: string;
    copyOrchBtn: string;
    markdownTitle: string;
    markdownSubtitle: string;
    copyMarkdownBtn: string;
    masterHeadline: string;
    masterDesc: string;
    agentSquadHeadline: string;
    agentSquadDesc: string;
    selectAgentPrompt: string;
    orchestratorHeadline: string;
    orchestratorDesc: string;
    markdownHeadline: string;
    markdownDesc: string;
    aiStudioTipTitle: string;
    aiStudioTipDesc: string;
  };

  // Project Modal
  projectModal: {
    title: string;
    createBlankBtn: string;
    createSampleBtn: string;
    createNew: string;
    savedProjects: string;
    lastModified: string;
    loadBtn: string;
    load: string;
    loadedBtn: string;
    loaded: string;
    deleteConfirm: string;
    noProjects: string;
    newProjectDefault: string;
  };

  // Agent Roles Interpretation
  agentRoles: Record<string, { role: string; desc: string }>;

  // Feature Names
  commonFeaturesList: string[];
}

export const translations: Record<AppLanguage, TranslationDictionary> = {
  en: {
    appTitle: 'App Wireframer',
    appSubtitle: 'Turn your idea into a professional app spec with AI. Currently editing:',
    currentlyEditing: 'Currently editing:',
    projectsBtn: 'Projects',
    newProjectBtn: 'New Project',
    backBtn: 'Back',
    nextBtn: 'Next',
    loading: 'Loading...',
    loadingProjects: 'Loading your projects...',
    builtWith: 'Built with React, Tailwind CSS, and the Gemini API.',
    languageToggle: 'Language',
    edit: 'Edit',
    finishEdit: 'Save changes',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    open: 'Open',
    close: 'Close',
    all: 'All',
    filter: 'Filter',
    search: 'Search',
    overview: 'Overview',
    none: 'None',
    retry: 'Retry',
    copied: 'Copied to Clipboard!',
    copy: 'Copy',
    download: 'Download',

    stages: {
      specify: { name: 'Specify', description: 'Idea & Purpose' },
      plan: { name: 'Plan', description: 'Structure & Wireframes' },
      task: { name: 'Task', description: 'Breakdown & Agents' },
      implement: { name: 'Implement', description: 'Final AI Prompts' },
    },

    specify: {
      title: '1. Tell us about your idea',
      subtitle: 'Answer these questions to get started. The more detail you provide, the better your initial specification will be.',
      appNameLabel: "What is your app's name?",
      appNamePlaceholder: 'e.g., StarHopper, AtomiCook, BookSphere',
      appAboutLabel: 'What is your app about?',
      appAboutPlaceholder: 'e.g., A mobile app for tracking personal fitness goals...',
      appAudienceLabel: 'Who will use your app?',
      appAudiencePlaceholder: 'e.g., Young professionals, students, fitness enthusiasts...',
      appProblemLabel: 'What problem does it solve?',
      appProblemPlaceholder: 'e.g., It helps users stay motivated by gamifying their workouts...',
      locTitle: 'Localization & Internationalization (Optional)',
      locLangLabel: 'Supported Languages',
      locLangPlaceholder: 'Comma-separated, e.g., English, Indonesian, Spanish',
      locCurrLabel: 'Supported Currencies (if applicable)',
      locCurrPlaceholder: 'Comma-separated, e.g., USD, IDR, EUR',
      locMeasureLabel: 'Measurement System',
      generateBtn: 'Generate Specification',
      regenerateBtn: 'Regenerate Specification',
      overviewTitle: 'Project Overview',
      overviewPlaceholder: 'AI-generated overview will appear here...',
      userStoriesTitle: 'User Stories',
      addUserStoryBtn: 'Add User Story',
      requirementsTitle: 'Functional Requirements',
      addRequirementBtn: 'Add Requirement',
      apiKeyMissing: 'Gemini API key is not configured. Please add your GEMINI_API_KEY in Google AI Studio under Settings > Secrets.',
      loadSampleBtn: 'Load Sample Idea (English)',
      translateProjectBtn: 'Translate Entire Project to English (AI)',
      translatingProject: 'Translating entire project with AI...',
      translateSuccess: 'Project successfully translated to English!',
      clearFormBtn: 'Clear Form',
      sampleBanner: '💡 Using sample template data. You can edit directly, load English sample, or translate with AI.',
    },

    plan: {
      title: '2. Plan & Wireframe Your App',
      subtitle: 'Configure structure, generate interactive visual wireframes, user flows, and backend data schemas.',
      tabWireframe: 'Visual Wireframes',
      tabSpecs: 'Data Models & Specs',
      tabAll: 'Side-by-Side',
      commonFeaturesTitle: 'Common Features',
      offlineModeTitle: 'Offline/Online Mode',
      onlineOnly: 'Online Only',
      offlineSupport: 'Offline Support',
      homeScreenLabel: 'Describe the main home screen view',
      homeScreenPlaceholder: "e.g., A dashboard showing today's goals, active reading progress cards, and discussion highlight feed...",
      nfrTitle: 'Non-Functional Requirements',
      securityLabel: 'Security',
      securityPlaceholder: 'e.g., Encrypted passwords, role permissions...',
      performanceLabel: 'Performance',
      performancePlaceholder: 'e.g., Under 2s page load, offline caching...',
      generateBtn: 'Generate Wireframes & Plan',
      regenerateBtn: 'Regenerate Plan & Wireframes',
      dataModelsTitle: 'Suggested Data Models',
      dataModelsPlaceholder: 'AI-generated data models will appear here...',
      apiNeedsTitle: 'Potential API Needs',
      apiNeedsPlaceholder: 'AI-generated API suggestions will appear here...',
      uiUxNotesTitle: 'UI/UX Design Notes',
      uiUxNotesPlaceholder: 'AI-generated UI/UX notes will appear here...',
      wireframeTitle: 'Interactive Low-Fi Wireframe Mockups',
      wireframeSubtitle: 'Live Preview & Component Inspector',
      noWireframeTitle: 'No Wireframes Generated Yet',
      noWireframeDesc: 'Select features on the left, describe your home screen, and click "Generate Wireframes & Plan" to visualize your app layouts.',
      userFlowTitle: 'End-to-End User Flow Journey',
      userFlowSubtitle: 'Sequential Screen Navigation',
      noUserFlow: 'No user flow generated yet. Click "Generate Plan" above.',
      userAction: 'User Action',
      systemOutcome: 'System Outcome',
      screen: 'Screen',
      deviceMobile: 'Mobile',
      deviceDesktop: 'Desktop / Web',
      inspectorTitle: 'Component Inspector',
      inspectorEmpty: 'Click on any component inside the phone screen to inspect its layout wireframe specification.',
      componentType: 'Component Type',
      componentLabel: 'Label / Title',
      specNotes: 'Wireframe Spec Notes',
      addComponentTitle: 'Add UI Component',
      addComponentBtn: 'Add Component to Screen',
      openBuilderBtn: 'Customize Screen Components',
      elementLabelPlaceholder: 'e.g. Quick Action Button',
      elementDescPlaceholder: 'What should this element display or do?',
      wireframeTipTitle: 'Low-Fidelity Wireframes',
      wireframeTipDesc: 'Low-fi wireframes help visualize UI hierarchy, component arrangement, and navigation before writing a single line of frontend code.',
      deleteElemTooltip: 'Delete element',
      deselect: 'Deselect',
    },

    task: {
      title: '3. Review Your Task List',
      subtitle: 'Tasks are partitioned for sequential solo work and specialized AI agent execution.',
      tasksCount: 'Tasks',
      tasksCountBadge: 'Tasks',
      loadingTitle: 'Generating Smart Task Breakdown & Agent Assignments...',
      loadingSubtitle: 'Organizing requirements into modular tasks for Solo Dev & Multi-Agent Squads.',
      retryBtn: 'Retry Generation',
      regenerateTasksBtn: 'Regenerate Tasks with AI',
      filterAllAgents: 'All Roles',
      filterAgent: 'Filter Agent',
      allAgents: 'All Agents',
      viewSolo: 'Solo Dev',
      viewSquad: 'Agent Squad',
      viewBoth: 'Unified View',
      viewUnified: 'Unified',
      addTaskBtn: 'Add Task',
      reassignRole: 'Role',
      criteriaTitle: 'Acceptance Criteria',
      criteriaHeader: 'Acceptance Criteria',
      addCriterionBtn: 'Add Criterion',
      toolsTitle: 'Required Tools',
      dependenciesTitle: 'Dependencies',
      assignedAgent: 'Assigned Specialist',
      agentFocus: 'Mission / Persona',
      soloViewTitle: 'Solo Developer Step-by-Step Pipeline',
      soloViewSubtitle: 'Linear execution order from foundation to UI delivery',
      squadViewTitle: 'Multi-Agent Squad Task Allocation',
      squadViewSubtitle: 'Grouped by specialized agent domain',
      noTasks: 'No tasks generated yet.',
      executionOrder: 'Order',
      doneBtn: 'Done',
      editAgentBtn: 'Edit Agent & Config',
      assignedRoleLabel: 'Assigned Agent Role',
      requiredToolsLabel: 'Required Tools (comma-separated)',
      executionOrderLabel: 'Execution Order',
    },

    implement: {
      title: '4. Implementation & AI Prompts',
      subtitle: 'Export comprehensive specifications, solo developer master prompts, or multi-agent squads blueprints.',
      tabMaster: 'Solo Dev Master Prompt',
      tabAgents: 'Specialized Agent Prompts',
      tabOrchestrator: 'Multi-Agent Blueprint',
      tabMarkdown: 'Full Markdown Spec',
      copyPromptBtn: 'Copy Prompt',
      downloadBtn: 'Download Spec (.md)',
      copySuccess: 'Copied to Clipboard!',
      copiedAlert: 'copied to clipboard!',
      masterTitle: 'Single Master Prompt (Solo Dev / All-in-One AI)',
      masterSubtitle: 'Paste this comprehensive prompt into Claude, ChatGPT, or Gemini to generate the full application in one session.',
      copyMasterBtn: 'Copy Master Prompt',
      selectRoleHeader: 'Select Agent Role',
      agentPromptDesc: 'Isolated prompt directive formatted specifically for this autonomous agent.',
      copyRolePromptBtn: 'Copy Agent Prompt',
      orchTitle: 'Multi-Agent Squad Orchestrator Blueprint',
      orchSubtitle: 'Structured instructions for orchestrator systems (LangChain, CrewAI, AutoGen, Antigravity) coordinating worker agents.',
      copyOrchBtn: 'Copy Orchestrator Blueprint',
      markdownTitle: 'Human-Readable Markdown Product Specification',
      markdownSubtitle: 'Shareable engineering documentation containing all requirements, data models, wireframes, and task checklists.',
      copyMarkdownBtn: 'Copy Markdown Spec',
      masterHeadline: 'Single Master Prompt (Solo Dev / All-in-One AI)',
      masterDesc: 'Paste this comprehensive prompt into Claude, ChatGPT, or Gemini to generate the full application in one session.',
      agentSquadHeadline: 'Individual Agent Directives',
      agentSquadDesc: 'Targeted prompt directives formatted specifically for each autonomous agent in your squad.',
      selectAgentPrompt: 'Select an Agent Role above to view its isolated system prompt.',
      orchestratorHeadline: 'Multi-Agent Squad Orchestrator Blueprint',
      orchestratorDesc: 'Structured instructions for orchestrator systems (e.g. LangChain, CrewAI, AutoGen, or Antigravity) coordinating multiple worker agents.',
      markdownHeadline: 'Human-Readable Markdown Product Specification',
      markdownDesc: 'Shareable engineering documentation containing all requirements, data models, wireframes, and task checklists.',
      aiStudioTipTitle: 'Ready for AI Studio or IDEs',
      aiStudioTipDesc: 'These prompts are engineered to produce clean, modular React + Tailwind code with zero hallucinated dependencies.',
    },

    projectModal: {
      title: 'Manage Projects',
      createBlankBtn: 'Create New Blank Project',
      createSampleBtn: 'Load Sample Project (English)',
      createNew: 'Create New Blank Project',
      savedProjects: 'Saved Projects',
      lastModified: 'Last modified',
      loadBtn: 'Load',
      load: 'Load',
      loadedBtn: 'Loaded',
      loaded: 'Loaded',
      deleteConfirm: 'Are you sure you want to delete this project? This cannot be undone.',
      noProjects: 'No saved projects yet. Create one to get started!',
      newProjectDefault: 'New Project',
    },

    agentRoles: {
      'Database & Data Architect': {
        role: 'Database & Data Architect',
        desc: 'Data schemas, state cache, ORM structures, and offline persistence.',
      },
      'Backend & API Specialist': {
        role: 'Backend & API Specialist',
        desc: 'Server routes, 3rd party APIs, data validations, and business logic.',
      },
      'Frontend UI Specialist': {
        role: 'Frontend UI Specialist',
        desc: 'Component layout, responsive styling, interaction design, and visual polish.',
      },
      'Auth & Security Specialist': {
        role: 'Auth & Security Specialist',
        desc: 'Authentication tokens, session security, permissions, and route guards.',
      },
      'QA & Test Engineer': {
        role: 'QA & Test Engineer',
        desc: 'Unit tests, acceptance criteria assertions, mocks, and edge cases.',
      },
      'Lead / Orchestrator': {
        role: 'Lead / Orchestrator',
        desc: 'Task coordination, architectural decisions, and agent workflow sequencing.',
      },
      'Full-Stack Generalist': {
        role: 'Full-Stack Generalist',
        desc: 'End-to-end implementation across frontend, backend, and integration glue.',
      },
    },

    commonFeaturesList: [
      'User Authentication (Sign up / Login)',
      'User Profiles',
      'Push Notifications',
      'In-App Purchases / Subscriptions',
      'Search Functionality',
      'Social Sharing',
      'Offline Mode Support',
      'Admin Dashboard',
      'Data Analytics',
      'Geolocation and Maps',
      'Messaging / Chat',
      'Image/Video Uploads',
    ],
  },

  id: {
    appTitle: 'App Wireframer',
    appSubtitle: 'Ubah ide aplikasi Anda menjadi spesifikasi profesional & wireframe visual dengan AI. Sedang menyunting:',
    currentlyEditing: 'Sedang menyunting:',
    projectsBtn: 'Daftar Proyek',
    newProjectBtn: 'Proyek Baru',
    backBtn: 'Kembali',
    nextBtn: 'Lanjut',
    loading: 'Memuat...',
    loadingProjects: 'Memuat data proyek Anda...',
    builtWith: 'Dibuat dengan React, Tailwind CSS, dan Gemini API.',
    languageToggle: 'Bahasa',
    edit: 'Sunting',
    finishEdit: 'Simpan Perubahan',
    delete: 'Hapus',
    cancel: 'Batal',
    save: 'Simpan',
    add: 'Tambah',
    open: 'Buka',
    close: 'Tutup',
    all: 'Semua',
    filter: 'Saring',
    search: 'Cari',
    overview: 'Ringkasan',
    none: 'Tidak ada',
    retry: 'Coba Lagi',
    copied: 'Berhasil Disalin ke Papan Klip!',
    copy: 'Salin',
    download: 'Unduh',

    stages: {
      specify: { name: 'Spesifikasi', description: 'Ide & Tujuan Aplikasi' },
      plan: { name: 'Perencanaan', description: 'Struktur & Wireframe UI' },
      task: { name: 'Tugas', description: 'Pembagian Tugas & Agen AI' },
      implement: { name: 'Implementasi', description: 'Prompt AI & Hasil Akhir' },
    },

    specify: {
      title: '1. Ceritakan Ide Aplikasi Anda',
      subtitle: 'Jawab pertanyaan di bawah untuk memulai. Semakin detail penjelasan Anda, semakin akurat spesifikasi awal yang dihasilkan.',
      appNameLabel: 'Apa nama aplikasi Anda?',
      appNamePlaceholder: 'contoh: StarHopper, AtomiCook, BookSphere, WarungKita',
      appAboutLabel: 'Tentang apa aplikasi ini?',
      appAboutPlaceholder: 'contoh: Aplikasi seluler untuk pelacakan target kebugaran harian...',
      appAudienceLabel: 'Siapa target pengguna aplikasi ini?',
      appAudiencePlaceholder: 'contoh: Profesional muda, mahasiswa, pegiat UMKM...',
      appProblemLabel: 'Masalah apa yang ingin diselesaikan?',
      appProblemPlaceholder: 'contoh: Membantu pengguna tetap konsisten lewat gamifikasi rutinitas harian...',
      locTitle: 'Pengaturan Lokalisasi & Bahasa (Opsional)',
      locLangLabel: 'Bahasa yang Didukung',
      locLangPlaceholder: 'Pisahkan dengan koma, contoh: Bahasa Indonesia, English, Jawa',
      locCurrLabel: 'Mata Uang yang Didukung (jika relevan)',
      locCurrPlaceholder: 'Pisahkan dengan koma, contoh: IDR (Rupiah), USD, SGD',
      locMeasureLabel: 'Sistem Pengukuran',
      generateBtn: 'Hasilkan Spesifikasi AI',
      regenerateBtn: 'Hasilkan Ulang Spesifikasi',
      overviewTitle: 'Ringkasan Eksekutif Proyek',
      overviewPlaceholder: 'Ringkasan proyek yang dibuat AI akan muncul di sini...',
      userStoriesTitle: 'Cerita Pengguna (User Stories)',
      addUserStoryBtn: 'Tambah User Story',
      requirementsTitle: 'Kebutuhan Fungsional Utama',
      addRequirementBtn: 'Tambah Kebutuhan Fungsional',
      apiKeyMissing: 'Kunci API Gemini belum dikonfigurasi. Silakan tambahkan GEMINI_API_KEY di menu Settings > Secrets.',
      loadSampleBtn: 'Muat Contoh Ide (Bahasa Indonesia)',
      translateProjectBtn: 'Terjemahkan Seluruh Proyek ke ID (AI)',
      translatingProject: 'Menerjemahkan seluruh proyek dengan AI...',
      translateSuccess: 'Proyek berhasil diterjemahkan ke Bahasa Indonesia!',
      clearFormBtn: 'Kosongkan Form',
      sampleBanner: '💡 Anda dapat memuat template contoh Bahasa Indonesia, menulis ide baru, atau menerjemahkan data yang ada dengan AI.',
    },

    plan: {
      title: '2. Perencanaan & Wireframe Visual',
      subtitle: 'Atur arsitektur, hasilkan wireframe interaktif layar aplikasi, alur pengguna (user flow), dan skema basis data.',
      tabWireframe: 'Wireframe Visual',
      tabSpecs: 'Skema Data & Teknis',
      tabAll: 'Tampilan Berdampingan',
      commonFeaturesTitle: 'Fitur-Fitur Umum',
      offlineModeTitle: 'Mode Offline / Online',
      onlineOnly: 'Hanya Online',
      offlineSupport: 'Dukungan Offline Aktif',
      homeScreenLabel: 'Deskripsikan tampilan layar beranda utama (Home Screen)',
      homeScreenPlaceholder: 'contoh: Dasbor interaktif dengan kartu progres membaca buku, ringkasan target mingguan, dan diskusi terbaru...',
      nfrTitle: 'Kebutuhan Non-Fungsional (Kualitas Sistem)',
      securityLabel: 'Keamanan (Security)',
      securityPlaceholder: 'contoh: Enkripsi kata sandi, otorisasi berbasis peran (RBAC)...',
      performanceLabel: 'Performa (Performance)',
      performancePlaceholder: 'contoh: Waktu muat di bawah 2 detik, kompresi cache data...',
      generateBtn: 'Hasilkan Wireframe & Rencana',
      regenerateBtn: 'Hasilkan Ulang Wireframe & Rencana',
      dataModelsTitle: 'Usulan Model Data (Data Schema)',
      dataModelsPlaceholder: 'Model data usulan AI akan muncul di sini...',
      apiNeedsTitle: 'Kebutuhan API Pihak Ketiga',
      apiNeedsPlaceholder: 'Saran integrasi API dari AI akan muncul di sini...',
      uiUxNotesTitle: 'Catatan Desain UI/UX & Rekomendasi',
      uiUxNotesPlaceholder: 'Panduan desain visual dari AI akan muncul di sini...',
      wireframeTitle: 'Mockup Wireframe Interaktif (Low-Fi)',
      wireframeSubtitle: 'Pratinjau Langsung & Inspektur Komponen',
      noWireframeTitle: 'Wireframe Belum Dihasilkan',
      noWireframeDesc: 'Pilih fitur di sisi kiri, deskripsikan layar beranda, lalu klik "Hasilkan Wireframe & Rencana" untuk melihat visualisasi tata letak antarmuka.',
      userFlowTitle: 'Alur Perjalanan Pengguna (User Flow Journey)',
      userFlowSubtitle: 'Navigasi Transisi Layar Bertahap',
      noUserFlow: 'Belum ada alur pengguna. Klik "Hasilkan Wireframe & Rencana" di atas.',
      userAction: 'Aksi Pengguna',
      systemOutcome: 'Respon / Hasil Sistem',
      screen: 'Layar',
      deviceMobile: 'Seluler (HP)',
      deviceDesktop: 'Desktop / Web',
      inspectorTitle: 'Inspektur Komponen UI',
      inspectorEmpty: 'Klik pada salah satu blok komponen di dalam layar perangkat untuk memeriksa spesifikasi tata letak wireframe.',
      componentType: 'Jenis Komponen',
      componentLabel: 'Label / Judul',
      specNotes: 'Catatan Spesifikasi Wireframe',
      addComponentTitle: 'Tambah Komponen UI',
      addComponentBtn: 'Tambahkan ke Layar',
      openBuilderBtn: 'Kustomisasi Blok Komponen',
      elementLabelPlaceholder: 'contoh: Tombol Aksi Cepat',
      elementDescPlaceholder: 'Apa fungsi dan isi dari komponen ini?',
      wireframeTipTitle: 'Manfaat Wireframe Low-Fi',
      wireframeTipDesc: 'Wireframe visual membantu memvalidasi hirarki antarmuka, penempatan tombol, dan navigasi sebelum tim menulis sebaris kode pun.',
      deleteElemTooltip: 'Hapus komponen',
      deselect: 'Batalkan Pilihan',
    },

    task: {
      title: '3. Tinjau Rincian Tugas Pengembangan',
      subtitle: 'Tugas-tugas diatur secara modular untuk pengerjaan Solo Developer maupun delegasi tim agen AI mandiri.',
      tasksCount: 'Tugas',
      tasksCountBadge: 'Tugas',
      loadingTitle: 'Menyusun Rincian Tugas & Penugasan Agen AI...',
      loadingSubtitle: 'Mengorganisir kebutuhan aplikasi menjadi modul tugas terstruktur untuk Solo Dev dan Multi-Agent Squad.',
      retryBtn: 'Coba Hasilkan Ulang',
      regenerateTasksBtn: 'Hasilkan Ulang Tugas AI',
      filterAllAgents: 'Semua Peran',
      filterAgent: 'Saring Agen',
      allAgents: 'Semua Agen',
      viewSolo: 'Solo Dev',
      viewSquad: 'Skuad Agen AI',
      viewBoth: 'Tampilan Lengkap',
      viewUnified: 'Terpadu',
      addTaskBtn: 'Tambah Tugas',
      reassignRole: 'Peran',
      criteriaTitle: 'Kriteria Penerimaan (Acceptance Criteria)',
      criteriaHeader: 'Kriteria Penerimaan',
      addCriterionBtn: 'Tambah Kriteria',
      toolsTitle: 'Perangkat / Tool yang Diperlukan',
      dependenciesTitle: 'Ketergantungan (Prasyarat)',
      assignedAgent: 'Spesialis Agen AI',
      agentFocus: 'Fokus / Persona Misi',
      soloViewTitle: 'Alur Kerja Bertahap Solo Developer',
      soloViewSubtitle: 'Urutan eksekusi linear dari fondasi basis data hingga antarmuka akhir',
      squadViewTitle: 'Alokasi Tugas Skuad Multi-Agen AI',
      squadViewSubtitle: 'Dikelompokkan berdasarkan spesialisasi keahlian domain agen',
      noTasks: 'Belum ada tugas yang dihasilkan.',
      executionOrder: 'Urutan',
      doneBtn: 'Selesai',
      editAgentBtn: 'Sunting Agen & Konfigurasi',
      assignedRoleLabel: 'Peran Agen yang Ditugaskan',
      requiredToolsLabel: 'Tool yang Dibutuhkan (pisahkan dengan koma)',
      executionOrderLabel: 'Urutan Eksekusi',
    },

    implement: {
      title: '4. Hasil Akhir & Prompt Rekayasa AI',
      subtitle: 'Ekspor spesifikasi lengkap, prompt master untuk solo developer, instruksi agen mandiri, atau cetak biru orkestrator.',
      tabMaster: 'Prompt Master Solo Dev',
      tabAgents: 'Direktif Agen Spesialis',
      tabOrchestrator: 'Cetak Biru Multi-Agen',
      tabMarkdown: 'Dokumen Spesifikasi (.md)',
      copyPromptBtn: 'Salin Prompt',
      downloadBtn: 'Unduh Dokumen (.md)',
      copySuccess: 'Berhasil Disalin ke Papan Klip!',
      copiedAlert: 'berhasil disalin ke papan klip!',
      masterTitle: 'Prompt Master Tunggal (Solo Dev / All-in-One AI)',
      masterSubtitle: 'Tempelkan prompt komprehensif ini ke Claude, ChatGPT, atau Gemini untuk membangun seluruh aplikasi dalam satu sesi pengembangan.',
      copyMasterBtn: 'Salin Prompt Master',
      selectRoleHeader: 'Pilih Peran Agen',
      agentPromptDesc: 'Direktif prompt terisolasi yang diformat khusus untuk agen otonom ini.',
      copyRolePromptBtn: 'Salin Prompt Agen',
      orchTitle: 'Cetak Biru Orkestrator Skuad Multi-Agen',
      orchSubtitle: 'Struktur instruksi untuk framework orkestrasi (LangChain, CrewAI, AutoGen, Antigravity) yang memandu koordinasi antar agen pekerja.',
      copyOrchBtn: 'Salin Cetak Biru Orkestrator',
      markdownTitle: 'Dokumen Spesifikasi Produk Lengkap (Markdown)',
      markdownSubtitle: 'Dokumentasi rekayasa perangkat lunak siap pakai yang merangkum kebutuhan, skema data, wireframe, dan daftar tugas.',
      copyMarkdownBtn: 'Salin Spesifikasi Markdown',
      masterHeadline: 'Prompt Master Tunggal (Solo Dev / All-in-One AI)',
      masterDesc: 'Tempelkan prompt komprehensif ini ke Claude, ChatGPT, atau Gemini untuk membangun seluruh aplikasi dalam satu sesi pengembangan.',
      agentSquadHeadline: 'Instruksi Mandiri per Agen AI',
      agentSquadDesc: 'Direktif prompt spesifik yang diformat khusus untuk setiap agen otonom dalam skuad pengembangan Anda.',
      selectAgentPrompt: 'Pilih peran Agen di atas untuk melihat prompt sistem terisolasi miliknya.',
      orchestratorHeadline: 'Cetak Biru Orkestrator Skuad Multi-Agen',
      orchestratorDesc: 'Struktur instruksi untuk framework orkestrasi (seperti LangChain, CrewAI, AutoGen, atau Antigravity) yang memandu koordinasi antar agen pekerja.',
      markdownHeadline: 'Dokumen Spesifikasi Produk Lengkap (Markdown)',
      markdownDesc: 'Dokumentasi rekayasa perangkat lunak siap pakai yang merangkum kebutuhan, skema data, wireframe, dan daftar tugas.',
      aiStudioTipTitle: 'Siap Digunakan di AI Studio & IDE',
      aiStudioTipDesc: 'Prompt ini dirancang khusus untuk menghasilkan kode React + Tailwind yang bersih, modular, dan bebas dependensi bermasalah.',
    },

    projectModal: {
      title: 'Kelola Proyek Aplikasi',
      createBlankBtn: 'Buat Proyek Baru Kosong',
      createSampleBtn: 'Muat Proyek Contoh (Bahasa Indonesia)',
      createNew: 'Buat Proyek Baru Kosong',
      savedProjects: 'Proyek Tersimpan',
      lastModified: 'Terakhir diubah',
      loadBtn: 'Buka',
      load: 'Buka',
      loadedBtn: 'Aktif',
      loaded: 'Aktif',
      deleteConfirm: 'Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.',
      noProjects: 'Belum ada proyek tersimpan. Buat proyek baru untuk memulai!',
      newProjectDefault: 'Proyek Baru',
    },

    agentRoles: {
      'Database & Data Architect': {
        role: 'Arsitek Basis Data & Skema',
        desc: 'Skema data, cache status, struktur ORM, dan persistensi mode luring.',
      },
      'Backend & API Specialist': {
        role: 'Spesialis Backend & API',
        desc: 'Rute server, integrasi API pihak ketiga, validasi data, dan logika bisnis.',
      },
      'Frontend UI Specialist': {
        role: 'Spesialis Antarmuka & UI',
        desc: 'Tata letak komponen, styling responsif, interaksi visual, dan estetika.',
      },
      'Auth & Security Specialist': {
        role: 'Spesialis Otentikasi & Keamanan',
        desc: 'Token autentikasi, keamanan sesi, manajemen hak akses, dan proteksi rute.',
      },
      'QA & Test Engineer': {
        role: 'Insinyur QA & Pengujian',
        desc: 'Uji unit, verifikasi kriteria penerimaan, mock API, dan pengujian kasus batas.',
      },
      'Lead / Orchestrator': {
        role: 'Orkestrator & Arsitek Utama',
        desc: 'Koordinasi tugas lintas modul, keputusan arsitektur, dan alur kerja antar agen.',
      },
      'Full-Stack Generalist': {
        role: 'Pengembang Full-Stack Umum',
        desc: 'Implementasi menyeluruh dari antarmuka pengguna hingga integrasi server.',
      },
    },

    commonFeaturesList: [
      'Otentikasi Pengguna (Daftar / Masuk)',
      'Profil Pengguna',
      'Notifikasi Push',
      'Pembelian Dalam Aplikasi / Langganan',
      'Fitur Pencarian Lanjutan',
      'Berbagi ke Media Sosial',
      'Dukungan Mode Offline (Luring)',
      'Dasbor Admin',
      'Analitik & Statistik Data',
      'Geolokasi & Peta',
      'Pesan Langsung / Obrolan (Chat)',
      'Unggah Foto / Video',
    ],
  },
};

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'app-wireframer-selected-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('id')) {
      return 'id';
    }
    return 'en';
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
