# PoA BREATHE 2026

Situs panitia Point of Action 2026, Astramedica FK Universitas Sriwijaya. Isinya pengumuman penempatan panitia, susunan BPH dan divisi, tautan kerja, dan info lokasi CFD Monpera.

## Mengganti isi

Semua isi ada di satu file: [`site/js/data.js`](site/js/data.js). Edit langsung dari GitHub (ikon pensil), commit, dan Netlify akan deploy ulang otomatis.

- `config.announceAt`: kunci pengumuman sampai waktu tertentu, contoh `"2026-11-17T19:00:00+07:00"`. `null` berarti langsung terbuka.
- `config.eventDate`: tanggal hari H. Kosong berarti tampil "Menyusul".
- `config.staffPending`: ganti ke `false` setelah daftar staf diisi.
- `bph`: nama dan jabatan BPH.
- `divisions`: koor, wakoor, dan staf tiap divisi. Staf ditulis sebagai daftar nama, contoh `staf: ["Nama Satu", "Nama Dua"]`.
- `links`: link Drive atau Sheets. `href` kosong berarti tampil "Menyusul".

`site/js/data.js` bisa dibaca siapa saja yang membuka situs, jadi isi nama hanya kalau sudah siap diumumkan.

## Struktur

- `site/`: folder yang dipublikasikan Netlify. Tidak perlu build.
- `source/`: kode sumber 3D dan antarmuka sebelum dibundel. Hanya perlu disentuh kalau mengubah kode.

Build ulang `site/js/app.js` setelah mengubah kode:

```
cd source
npm install
npm run build
```
