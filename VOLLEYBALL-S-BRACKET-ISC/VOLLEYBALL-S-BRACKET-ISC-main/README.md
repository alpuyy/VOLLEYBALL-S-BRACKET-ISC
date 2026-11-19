# Bagan Turnamen Bola Voli ISC 2026

Aplikasi web untuk mengelola dan menampilkan bagan turnamen bola voli ISC 2026. Turnamen menggunakan sistem gugur dengan 28 tim, 27 pertandingan, dan lima babak. Empat tim mendapat bye dan langsung masuk Babak 2.

## Fitur

- **Mode tonton** menampilkan bagan dan juara. Halaman meminta hasil terbaru setiap enam detik.
- **Mode admin** memungkinkan panitia mengubah nama tim Babak 1 dan tim yang mendapat bye, memilih pemenang, serta mereset seluruh hasil.
- **Pemenang otomatis maju** ke babak berikutnya. Jika pemenang dikoreksi, hasil lanjutan yang bergantung pada pertandingan tersebut dihapus.

## Struktur proyek

| File | Fungsi |
| --- | --- |
| `index.html` | Antarmuka bagan dan logika pertandingan, menggunakan HTML, CSS, dan JavaScript. |
| `api/state.js` | Endpoint Vercel untuk membaca dan menyimpan data bagan di Upstash Redis. |
| `package.json` | Dependensi proyek, termasuk klien `@upstash/redis`. |

## Konfigurasi di Vercel

1. Impor repositori sebagai proyek Vercel dan hubungkan database Upstash Redis.
2. Pastikan environment proyek memiliki pasangan kredensial Redis, misalnya `UPSTASH_REDIS_REST_URL` dan `UPSTASH_REDIS_REST_TOKEN`.
3. Atur `ADMIN_KEY` di environment Vercel, lalu deploy.
4. Bagikan URL utama kepada penonton. Panitia membuka halaman dengan menambahkan `?admin=<ADMIN_KEY>` pada URL. Simpan tautan admin untuk panitia karena tautan tersebut memuat kunci untuk menyimpan perubahan.
