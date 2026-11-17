/* ==========================================================
   DATA SITUS PoA BREATHE 2026
   Cukup edit file ini untuk mengganti isi situs. Tidak perlu build ulang.
   Setelah diedit, deploy ulang folder site/ ke Netlify.
   Catatan: file ini publik. Isi nama hanya kalau memang siap diumumkan.
   ========================================================== */
window.POA = {
  config: {
    // Tahap pengumuman yang sedang berjalan.
    stage: "Susunan lengkap sudah keluar, dari BPH sampai anggota tiap divisi",
    // true = daftar anggota divisi belum diumumkan.
    staffPending: false,
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
    { name: "Muhammad Farisz Naufal Abdillah", role: "Ketua Pelaksana" },
    { name: "Fabian Ghafiqi Ahmad", role: "Wakil Ketua Pelaksana I" },
    { name: "Azallea Sofwa Betha Dyero", role: "Wakil Ketua Pelaksana II" },
    { name: "Shabirah Daffa Ramadhani", role: "Sekretaris I" },
    { name: "Raffa Gamadan Rifandi", role: "Sekretaris II" },
    { name: "Putri Kayla Efendi", role: "Bendahara I" },
    { name: "Nailah Ansaria", role: "Bendahara II" }
  ],

  // koor = koordinator, wakoor = wakil koordinator, staf = daftar anggota divisi.
  // Nama kosong ("") tampil sebagai "Menyusul" dan tidak bisa dicari.
  // color: sun, coral, carrot, tomato, kiwi, forest
  divisions: [
    {
      code: "ACR", name: "Acara", color: "sun",
      blurb: "Menyusun rundown dan memegang jalannya acara di hari H, dari pembukaan sampai penutupan.",
      koor: "Nabila Shafiyyah Althafunnisa",
      wakoor: "Azriel Bintang Arfany Pardede",
      staf: [
        "Annisa Thalita Sakhi",
        "Kanza Aulia Nadhira",
        "Nafisa Haura",
        "Nabila",
        "M. Fakhri Alamin",
        "Valiqa Khaya Nareshwari",
        "Aisyah Zulfa Salsabila",
        "Nyimas Annisa",
        "Khalisha Dwi Elmanora",
        "Zahra Nadhira",
        "Ghina Nurfatma Fadilah",
        "Misschelly Winsfrey Sianturi",
        "Andrew Justin Siburian",
        "Firyal Tristi Thalita Zahra",
        "Balqis Syakirah Azzahwa",
        "Camilatuzahwa",
        "Aleyda Rubina Nur Ikhlas",
        "Inggrid Justine Johan",
        "Andini Pritarev Sipahutar",
        "Geraldrich Nathaniel",
        "Akmal Apriansyah Putra",
        "Miftah Aulya",
        "Namira Aisyah Charmelita",
        "Naurah Amalia",
        "Rizqa Kamilah",
        "Jiehan Syazia Rifqiyyah",
        "Valeria Rosa Muthaka Yusel",
        "Achmad Hizqy Asyari Rois",
        "Muhammad Farrel Mahyanta Chandra"
      ]
    },
    {
      code: "HMS", name: "Humas", color: "carrot",
      blurb: "Penghubung dengan pihak luar: pengelola lokasi, instansi, mitra, dan tamu undangan.",
      koor: "Arini Ghassani Putri",
      wakoor: "Sulthan Fadhil",
      staf: [
        "Zulia Mutiara Sari",
        "Muthi’ah Nida’Ul Haq",
        "Tsamara Kallista",
        "Raden Abdullah Zahran",
        "Franscesco Eldridge Moreen",
        "Gladys Feodhora Antoinette Panjaitan",
        "Inas Anisa Morlyna Ramadhani",
        "Diana Amelia",
        "Aisyah Dhea Calista",
        "Jezzi Wandhira",
        "Nisrina Syifa Aulia"
      ]
    },
    {
      code: "KST", name: "Kesekretariatan", nick: "Kestari", color: "forest",
      blurb: "Mengurus proposal, surat-menyurat, notulensi, dan arsip kepanitiaan.",
      koor: "Bona Rogate Davida Siregar",
      wakoor: "Siti Fasya An Namira",
      staf: [
        "Ghaniyyah Salsabila Azzahra",
        "Keyla Ainun Najah",
        "Sabrina Maharani Chandra",
        "Ishika Az Dzakirah",
        "Izza Hilyah Fathimi",
        "Syifa Az'zahra",
        "Jessica Liu",
        "Almira Fitriani Fahlevi",
        "Nadine Aurellia Darwan",
        "Martha Arum Buntari"
      ]
    },
    {
      code: "DSP", name: "Danus & Sponsorship", color: "kiwi",
      blurb: "Mencari dana dan sponsor supaya semua rencana di lapangan bisa jalan.",
      koor: "Siti Laquisha Maera Pratama Putri",
      wakoor: "M. Abil Thariq",
      staf: [
        "Inez Saravia Chung",
        "Adeliana",
        "Kayla Aurellia",
        "Mozzabella Zhaskyra Amri",
        "Thoriq Muhammad Jasi",
        "Alisya Azra Rafiah",
        "M. Athaillah Joenoes",
        "M. Al Fakin",
        "Jessica Priccila Chelsea",
        "Raffi Khalief",
        "Muhammad Khalil Akhtar",
        "Zafirah Aurellia",
        "Khalisa Nayla",
        "Meutia Nurulizza"
      ]
    },
    {
      code: "LOG", name: "Logistik", color: "tomato",
      blurb: "Menyiapkan perlengkapan: tenda, booth, panggung, sampai barang kecil yang sering lupa dibawa.",
      koor: "M. Ariz Muzhoppir",
      wakoor: "Aura Ashilah",
      staf: [
        "Luzafiyah Khayza Sabina",
        "Rakha Hafizh Khairullah",
        "Ahmad Surya Maulana",
        "M. Ahnaf Zahran",
        "Aurelia Charissa Putri",
        "Hasna Luthfiyyah",
        "Medina Fiamanella",
        "M. Rifqiy Illaiqurrohman",
        "Mahardhika Adli Wijaya",
        "Nawra Khansa",
        "Samuel Hidayat",
        "Amirah Nur Azkia",
        "Kiki Tri Utami Putri"
      ]
    },
    {
      code: "KRL", name: "Korlap", color: "coral",
      blurb: "Mengatur alur orang dan kondisi lapangan selama acara berlangsung.",
      koor: "Keysan Rakha Arrafi Febrian",
      wakoor: "Monalisa Kezia Van Daniel",
      staf: [
        "Azzalea Rasha Carissa",
        "Muhammad Hafidz Radani",
        "Kayla Putri Aksanti",
        "Faqih Mustafiq Saleh",
        "Annisa Rahmafitri",
        "Feyza Athirah Maharani",
        "Syafrie Danendra",
        "Jessica Anggie Sitompul",
        "M. Raihan Fairuz Akbar",
        "Muhammad Aditya Anugrah",
        "M. Al Fard Putra Azhari",
        "Fatimah Amirah Ramadhani",
        "Naura Ratu Adzkia",
        "Muhammad Irfan Arief",
        "Navi Rahmatullah Yahya",
        "Fadlan Fitrah Akbar",
        "Zalyka Nabila Putri",
        "Nanda Aulia Rahma Pohan",
        "Talita Keisya Syafiya",
        "M. Arbian Arkananta",
        "Lucretia Cristabella Manurung",
        "Adrian Ramadhan Busali",
        "Muhammad Nouval Faturrullah",
        "M. Aziz Ibrahim",
        "Balthazar Al Arash Shandira"
      ]
    },
    {
      code: "KSM", name: "Konsumsi", color: "sun",
      blurb: "Memastikan panitia, peserta, dan tamu kebagian makan dan minum tepat waktu.",
      koor: "Filia Priscilla Lumban Gaol",
      wakoor: "Nadya Ramadhani",
      staf: [
        "Aliyah Julia Azzahra",
        "Dwi Putri Pelita",
        "Muhammad Irfan (Alpha)",
        "Angelia Fericha",
        "Muhamad Sadat Ahsan Noor Yuwono",
        "Salma Arrahimi",
        "Callysta Andrien Bernaice Wijaya",
        "Zhafirah Putria Nur Izzah",
        "Annisa Shafira Alfarizi",
        "Zalika Lutfiyah Shakila",
        "Sheila Anggiani",
        "Nur Nazilah",
        "Regina",
        "Piona",
        "Siti Aisyah Maharani",
        "Chumairah Ghaffar Radianto"
      ]
    },
    {
      code: "PDK", name: "Publikasi & Dokumentasi", color: "carrot",
      blurb: "Mengabarkan PoA lewat media sosial dan merekam semua momennya.",
      koor: "Hazalea Aqilla",
      wakoor: "Muhammad Syafiq Permana",
      staf: [
        "Cindy Tirza Palsa",
        "Naila Jamaiyah",
        "Anggie Ruth Naomi Samosir",
        "Clarissa Nur Salsabila Adijaya",
        "Qania Annisa Asritanaya",
        "Adinda Cinta Azzahra",
        "Annisa Ghaniyyah Alimah",
        "Keyzel Tania Aurora",
        "Angelica Fransisca Azalea",
        "M. Jethro Keylas Wibiksono"
      ]
    },
    {
      code: "DSG", name: "Design", color: "kiwi",
      blurb: "Membuat visual PoA, dari feed Instagram sampai merchandise.",
      koor: "Rayssha Kirana Adhitya",
      wakoor: "Tsuraya Jahira Arpani",
      staf: [
        "Andita Meisya Putri",
        "Ayesha Linuhung Pane",
        "Wanda Tirza Nuraini",
        "Aufa Hollow",
        "Rhayna Khairunnisa Sufi",
        "Talitha Syifa Ramadhanti",
        "Archile Agnylova",
        "Ulya Iftitah",
        "Annisa Zakia",
        "Cahaya Tuzzahra",
        "Nayla Rahmaniadani",
        "Najwa Rizky Emilia"
      ]
    },
    {
      code: "MMT", name: "Materi & Edukasi", nick: "Mamet", color: "forest",
      blurb: "Menyiapkan materi edukasi ISPA yang akurat dan gampang dipahami semua umur.",
      koor: "Dinda Trihadiati",
      wakoor: "Marchel Giovani Hutagalung",
      staf: [
        "Calya Aisha Putri",
        "Muhammad Alief Lazuardi",
        "Asiyah Meisa Ayu",
        "Adila Farhan Maulana",
        "Nafla Vakhira Venfri",
        "Ahmad Zhafar Abdurrahman",
        "Siti Ulya Ramadhani",
        "Athira Fakhrana",
        "Sherra Defenka Chandra",
        "Annisa Nanda Salsabila",
        "Diandradita Arie Maharani Aziz",
        "Angelina Clarinta Padparadscha",
        "Zivanna Khalesya",
        "Nur Nazilah",
        "Claresta Nur Salsabila Adijaya",
        "Zahra Lutfiyah Shakila",
        "Fabian Alifea Priyandra",
        "Norbert Samuel Partogi Napitupulu",
        "Shelsi Iftitah",
        "El Miftah Haqiyah",
        "Najua Paramita",
        "Nikeisha Nayla Salsabila",
        "Nuriya Mutia Asri",
        "Muhammad Irfan (Beta)",
        "M Raffi Alghifari",
        "Nandana Bahy",
        "Rizqullah Rafief"
      ]
    },
    {
      code: "GMS", name: "Games", color: "coral",
      blurb: "Merancang dan memandu permainan yang bikin edukasi ISPA terasa seru.",
      koor: "Joevanna Kayla Sarah Aritonang",
      wakoor: "Virginia Miranda Ratu Dinata",
      staf: [
        "Alin Zharifah Syarfina Putri",
        "Tirza Elsa Tamya",
        "Inaya Talitha Kamila",
        "Shafiyyah Putri Pasaribu",
        "Kania Miftahul Jannah",
        "Angelika Win Oktoria Pasaribu",
        "Sophie Angela Gracia Yemima Simanjuntak",
        "Lovika Azlia Putri",
        "MHS. Fazil Arkananta",
        "Syifa Ramadhani",
        "Hany Hamimatun Nihaya",
        "Evita Clarence",
        "Caesy Angelica Simatupang",
        "Saskia Ramadhani Harahap"
      ]
    }
  ],
  // Ejaan lain yang mungkin diketik orang saat mencari namanya.
  aliases: {
    "Filia Priscilla Lumban Gaol": ["Fillia Priscilla Lumban Gaol"],
    "Nabila Shafiyyah Althafunnisa": ["Nabila Syafiyyah Althafunnisa", "Nabila Syafiyyah"],
    "M. Fakhri Alamin": ["M. Fakhri Al Amin"],
    "Marchel Giovani Hutagalung": ["Marchel Giovani Hutagulung"],
    "Keysan Rakha Arrafi Febrian": ["Keysan Rakha Ar'rafi Febrian"],
    "Rayssha Kirana Adhitya": ["Raysha Kirana Adhitya"],
    "Azallea Sofwa Betha Dyero": ["Azallea Sofwa", "Azalea Sofwa"],
    "Balthazar Al Arash Shandira": ["Balthazar Al Arash Sandira"]
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
