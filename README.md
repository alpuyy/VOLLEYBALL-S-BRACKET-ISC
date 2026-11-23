# 🏐 ISC 2026 — Volleyball Tournament Bracket

**Website pengelolaan dan visualisasi bagan turnamen bola voli ISC 2026 berbasis web.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00E9A3?style=for-the-badge&logo=redis&logoColor=white)

---

## 📖 Tentang Proyek

**ISC 2026 Volleyball Tournament Bracket** merupakan aplikasi web untuk mengelola dan menampilkan bagan pertandingan turnamen bola voli ISC 2026.

Aplikasi ini menggunakan sistem **Single Elimination (Sistem Gugur)**. Setiap tim yang memenangkan pertandingan akan otomatis melaju ke babak berikutnya hingga menghasilkan satu juara.

Website dilengkapi dengan mode penonton dan mode administrator sehingga pengelolaan hasil pertandingan dapat dilakukan secara terpusat.

## 🏆 Format Turnamen

| Keterangan | Jumlah |
|---|---|
| 🏐 Total Tim | 28 Tim |
| ⚔️ Total Pertandingan | 27 Pertandingan |
| 🏆 Total Babak | 5 Babak |
| 🎟️ Tim Mendapat Bye | 4 Tim |
| 🥇 Juara | 1 Tim |

### Alur Pertandingan

| Babak | Tim | Pertandingan |
|---|---|---|
| Babak 1 | 24 | 12 |
| Babak 2 | 16 (12 pemenang + 4 bye) | 8 |
| Perempat Final | 8 | 4 |
| Semifinal | 4 | 2 |
| Final | 2 | 1 |

**Total: 27 pertandingan untuk menentukan satu juara ISC 2026.**

---

## ✨ Fitur Utama

### 👀 Mode Penonton

- Menampilkan bagan pertandingan secara visual.
- Melihat tim yang lolos ke babak berikutnya.
- Menampilkan hasil pertandingan dan juara turnamen.
- Memperbarui data secara otomatis setiap **6 detik**.
- Tidak memerlukan akses administrator.

### 🔐 Mode Administrator

- Mengedit nama tim peserta Babak 1.
- Mengatur empat tim yang mendapatkan bye.
- Menentukan pemenang setiap pertandingan.
- Memperbarui bagan secara otomatis.
- Mereset seluruh hasil pertandingan.
- Mengakses pengelolaan menggunakan `ADMIN_KEY`.

### ⚡ Automatic Bracket Progression

Sistem akan secara otomatis memindahkan pemenang ke pertandingan berikutnya.

Apabila hasil pertandingan dikoreksi, sistem akan menghapus hasil pertandingan lanjutan yang bergantung pada hasil sebelumnya untuk menjaga konsistensi bagan turnamen.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| 🟠 **HTML5** | Struktur halaman website |
| 🔵 **CSS3** | Desain dan tampilan antarmuka |
| 🟡 **JavaScript** | Logika pertandingan dan interaktivitas |
| 🟢 **Node.js** | Runtime untuk API serverless |
| ▲ **Vercel** | Hosting dan deployment |
| 🔴 **Upstash Redis** | Penyimpanan data pertandingan |

## 📁 Struktur Proyek

```text
ISC-2026/
│
├── index.html
│
├── api/
│   └── state.js
│
├── package.json
│
└── README.md
```

**Penjelasan:**

- `index.html` — Antarmuka pengguna, tampilan bagan, dan logika turnamen menggunakan HTML, CSS, serta JavaScript.
- `api/state.js` — Serverless API untuk membaca dan menyimpan data pertandingan menggunakan Upstash Redis.
- `package.json` — Konfigurasi proyek dan dependensi, termasuk `@upstash/redis`.
- `README.md` — Dokumentasi proyek.

---

## 🚀 Deployment ke Vercel

### 1. Persiapkan Repository

Unggah seluruh file proyek ke repository GitHub.

### 2. Hubungkan ke Vercel

- Buka [Vercel](https://vercel.com).
- Pilih **Add New Project**.
- Impor repository GitHub.
- Hubungkan database Upstash Redis.

### 3. Konfigurasi Environment Variables

Tambahkan environment variables berikut melalui pengaturan proyek Vercel:

```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
ADMIN_KEY=your_secure_admin_key
```

**Penting:** Jangan menyimpan kredensial asli di repository publik.

### 4. Deploy Website

Jalankan proses deployment melalui Vercel. Setelah berhasil, aplikasi dapat diakses menggunakan URL proyek.

---

## 🌐 Cara Menggunakan

### 👀 Akses Penonton

Buka URL utama aplikasi:

```text
https://nama-proyek.vercel.app/
```

Penonton dapat melihat seluruh bagan pertandingan tanpa melakukan login.

### 🔐 Akses Administrator

Tambahkan parameter `admin` pada URL:

```text
https://nama-proyek.vercel.app/?admin=KUNCI_ADMIN
```

Melalui halaman admin, panitia dapat memperbarui nama tim, memilih pemenang, dan mengelola hasil pertandingan.

**🔒 Keamanan:** URL admin memuat kunci akses. Jangan membagikannya kepada penonton atau menampilkannya pada dokumentasi publik. Gunakan kunci yang kuat dan bagikan hanya kepada panitia berwenang.

---

## 🔄 Sistem Pembaruan Data

Aplikasi menggunakan Upstash Redis sebagai penyimpanan data terpusat.

1. Administrator memperbarui hasil pertandingan.
2. Perubahan dikirim ke API Vercel.
3. API menyimpan data terbaru ke Upstash Redis.
4. Halaman penonton mengambil data terbaru setiap 6 detik.
5. Bagan menampilkan perkembangan pertandingan hingga babak final.

Dengan mekanisme ini, hasil pertandingan dapat dilihat oleh penonton tanpa harus memuat ulang halaman secara manual.

---

## 🎯 Tujuan Pengembangan

Aplikasi ini dikembangkan untuk membantu penyelenggaraan turnamen bola voli ISC 2026 agar proses pencatatan, pengelolaan, dan penyampaian hasil pertandingan menjadi lebih **efisien, terstruktur, dan mudah diakses**.

---

**🏐 ISC 2026 — One Tournament, One Champion. 🏆**

*Built with HTML, CSS, JavaScript, Vercel & Upstash Redis.*
