/* ==========================================================
   DATA SITUS PoA BREATHE 2026
   Cukup edit file ini untuk mengganti isi situs. Tidak perlu build ulang.
   Setelah diedit, deploy ulang folder site/ ke Netlify.
   Catatan: file ini publik. Isi nama hanya kalau memang siap diumumkan.
   ========================================================== */
window.POA = {
  config: {
    // Tahap pengumuman yang sedang berjalan.
    stage: "Koordinator dan wakil koordinator",
    // true = penempatan staf belum diumumkan. Ganti ke false setelah daftar staf diisi.
    staffPending: true,
    // Kunci pengumuman sampai waktu tertentu, contoh: "2026-11-17T19:00:00+07:00".
    // null = pengumuman langsung terbuka.
    announceAt: null,
    // Tanggal hari H. Kosongkan kalau belum pasti, situs akan menulis "Menyusul".
    eventDate: "",
    place: "Monpera, Palembang",
    lineGroup: "https://line.me/ti/g/C38QTYJKYD",
    email: "pointofaction2026@gmail.com"
  },

  // role kosong akan tampil sebagai "BPH".
  bph: [
    { name: "Muhammad Farisz Naufal Abdillah", role: "Ketua" },
    { name: "Fabian Ghafiqi Ahmad", role: "" },
    { name: "Azallea Sofwa Betha Dyero", role: "" },
    { name: "Shabirah Daffa Ramadhani", role: "Sekretaris" },
    { name: "Raffa Gamadan Rifandi", role: "Sekretaris" },
    { name: "Putri Kayla Efendi", role: "Bendahara" },
    { name: "Nailah Ansaria", role: "Bendahara" }
  ],

  // koor = koordinator, wakoor = wakil koordinator, staf = daftar nama staf.
  // Nama kosong ("") tampil sebagai "Menyusul" dan tidak bisa dicari.
  // color: sun, coral, carrot, tomato, kiwi, forest
  divisions: [
    {
      code: "ACR", name: "Acara", color: "sun",
      blurb: "Menyusun rundown dan memegang jalannya acara di hari H, dari pembukaan sampai penutupan.",
      koor: "Nabila Shafiyyah Althafunnisa", wakoor: "M. Fakhri Al Amin", staf: []
    },
    {
      code: "HMS", name: "Humas", color: "carrot",
      blurb: "Penghubung dengan pihak luar: pengelola lokasi, instansi, mitra, dan tamu undangan.",
      koor: "M. Alief Lazuardi", wakoor: "Fatimah Amirah Ramadhani", staf: []
    },
    {
      code: "KST", name: "Kesekretariatan", color: "forest",
      blurb: "Mengurus proposal, surat-menyurat, notulensi, dan arsip kepanitiaan.",
      koor: "Bona Rogate Davida Siregar", wakoor: "Siti Fasya An Namira", staf: []
    },
    {
      code: "DSP", name: "Dana & Sponsorship", color: "kiwi",
      blurb: "Mencari dana dan sponsor supaya semua rencana di lapangan bisa jalan.",
      koor: "Siti Laquisha Maera Pratama Putri",
      wakoor: "", // BELUM FINAL: pilih M. Abil Thariq atau M. Al Fard Putra Azhari
      staf: []
    },
    {
      code: "LOG", name: "Logistik", color: "tomato",
      blurb: "Menyiapkan perlengkapan: tenda, booth, panggung, sampai barang kecil yang sering lupa dibawa.",
      koor: "Muhammad Ariz Muzhoppir",
      wakoor: "", // BELUM FINAL: pilih Balthazar Al Arash Sandira atau Sulthan Fadhil
      staf: []
    },
    {
      code: "KRL", name: "Korlap", color: "coral",
      blurb: "Mengatur alur orang dan kondisi lapangan selama acara berlangsung.",
      koor: "Keysan Rakha Arrafi Febrian", wakoor: "Monalisa Kezia Van Daniel", staf: []
    },
    {
      code: "KSM", name: "Konsumsi", color: "sun",
      blurb: "Memastikan panitia, peserta, dan tamu kebagian makan dan minum tepat waktu.",
      koor: "Inez Saravia Chung", wakoor: "Filia Priscilla Lumban Gaol", staf: []
    },
    {
      code: "PDK", name: "Publikasi & Dokumentasi", color: "carrot",
      blurb: "Mengabarkan PoA lewat media sosial dan merekam semua momennya.",
      koor: "Qania Annisa Asritanaya", wakoor: "Muhammad Syafiq Permana", staf: []
    },
    {
      code: "DSG", name: "Design", color: "kiwi",
      blurb: "Membuat visual PoA, dari feed Instagram sampai merchandise.",
      koor: "Raysha Kirana Adhitya", wakoor: "Tsuraya Jahira Arpani", staf: []
    },
    {
      code: "MMT", name: "Materi & Edukasi", nick: "Mamet", color: "forest",
      blurb: "Menyiapkan materi edukasi ISPA yang akurat dan gampang dipahami semua umur.",
      koor: "Dinda Trihadiati", wakoor: "Marchel Giovani Hutagalung", staf: []
    },
    {
      code: "GMS", name: "Games", color: "coral",
      blurb: "Merancang dan memandu permainan yang bikin edukasi ISPA terasa seru.",
      koor: "Joevanna Kayla Sarah Aritonang", wakoor: "Alisya Azra Rafiah", staf: []
    }
  ],

  // Ejaan lain yang mungkin diketik orang saat mencari namanya.
  aliases: {
    "Filia Priscilla Lumban Gaol": ["Fillia Priscilla Lumban Gaol"],
    "Nabila Shafiyyah Althafunnisa": ["Nabila Syafiyyah Althafunnisa", "Nabila Syafiyyah"],
    "M. Fakhri Al Amin": ["Muhammad Fakhri Alamin"],
    "Marchel Giovani Hutagalung": ["Marchel Giovani Hutagulung"],
    "Keysan Rakha Arrafi Febrian": ["Keysan Rakha Ar'rafi Febrian"],
    "Raysha Kirana Adhitya": ["Rayssha Kirana Adhitya"],
    "Azallea Sofwa Betha Dyero": ["Azallea Sofwa", "Azalea Sofwa"]
  },

  // href kosong = tampil "Menyusul". Isi dengan link Drive/Sheets kalau sudah ada.
  links: {
    divisi: [
      { title: "Data anggota", desc: "Susunan lengkap ada di halaman ini.", href: "#susunan" },
      { title: "Jobdesc divisi", desc: "Rincian tugas tiap divisi.", href: "" },
      { title: "Form laporan", desc: "Tempat setor laporan progres divisi.", href: "" },
      { title: "Tracker", desc: "Pantau progres semua divisi.", href: "" },
      { title: "Grup LINE panitia", desc: "Info panitia dibagikan di sini.", href: "https://line.me/ti/g/C38QTYJKYD" }
    ],
    bph: [
      { title: "Drive utama PoA 2026", desc: "Folder kerja utama panitia tahun ini.", href: "https://drive.google.com/drive/folders/1fkyquhKCc9Glid4rknA3G3LMTpfWZnVB" },
      { title: "Dokumentasi", desc: "Foto dan video selama persiapan sampai hari H.", href: "" },
      { title: "Arsip PoA 2025", desc: "Drive PoA tahun lalu, bahan referensi dari angkatan atas.", href: "https://drive.google.com/drive/folders/16cu4MUo_gqY5evWza5Bxn0CWCbYhkG5S" },
      { title: "Email PoA", desc: "pointofaction2026@gmail.com", href: "mailto:pointofaction2026@gmail.com" }
    ],
    sekretariatNote: "Proposal dan surat wajib lewat QC sekretaris dulu sebelum dikirim ke Sekretaris Umum BEM KM FK Unsri. Baca SOP sebelum pedoman.",
    sekretariat: [
      { title: "SOP Kesekretariatan", desc: "Baca ini paling awal.", href: "https://bit.ly/SOPKesekretariatanLaskaraMakna" },
      { title: "Pedoman Administrasi", desc: "Aturan administrasi yang berlaku di BEM.", href: "https://bit.ly/PedomanAdministrasiLaskaraMakna" },
      { title: "PPT Alur Kesekretariatan", desc: "Alur surat dan proposal dalam bentuk slide.", href: "https://canva.link/2erephj500chzl9" },
      { title: "Template surat-menyurat", desc: "Template resmi Laskara Makna.", href: "https://bit.ly/TemplateSuratLaskaraMakna" },
      { title: "Mastersheet Kesekretariatan", desc: "Hanya diedit sekretaris BEM dan sekretaris BO.", href: "https://bit.ly/MastersheetKesekretariatanLaskaraMakna" },
      { title: "Kalender peminjaman Zoom", desc: "Cek jadwal sebelum pinjam akun Zoom.", href: "https://tinyurl.com/KalenderPeminjamanZoom" },
      { title: "Peminjaman inventaris BEM", desc: "Logbook pinjam barang BEM.", href: "https://tinyurl.com/LogBookPeminjamanInventarisBEM" },
      { title: "Database pengurus dan magang", desc: "Data pengurus dan magang BEM.", href: "https://tinyurl.com/DatabaseLaskaraMakna" }
    ]
  }
};
