# Flora Coffee - Tugas 3 Pemrograman Web

Aplikasi web CRUD menu kafe dengan **Node.js, Express, EJS, dan MySQL**. Koneksi database memakai **MySQL Connection Pool (mysql2/promise)**, seluruh query memakai **Prepared Statements**, dan setiap mutasi data memakai pola **Post-Redirect-Get (PRG)**.

## Identitas

- **Nama:** Ardelia Naenda Ahmadi
- **NIM:** 42530022
- **Mata Kuliah:** Pemrograman Web
- **Tema:** Daftar Menu Kafe

## Video Penjelasan

[Link video YouTube akan ditambahkan di sini]

## Fitur

- **Create:** tambah menu baru lewat form, termasuk unggah foto
- **Read:** daftar menu, filter kategori (`?kategori=kopi`), dan halaman detail (`/katalog/:id`)
- **Update:** edit data menu dan ganti foto
- **Delete:** hapus menu dengan konfirmasi
- Validasi input di sisi server
- Seluruh query SQL memakai tanda `?` (tanpa penggabungan string)
- Konfigurasi database diisolasi di berkas `.env`

## Cara Menjalankan

1. Pastikan **Node.js** dan **MySQL Server** sudah terpasang dan berjalan.
2. Impor database: jalankan berkas `database.sql` lewat DBeaver / MySQL Workbench / phpMyAdmin, atau lewat terminal:
   ```
   mysql -u root -p < database.sql
   ```
3. Install dependensi:
   ```
   npm install
   ```
4. Salin berkas contoh konfigurasi, lalu isi `DB_PASSWORD` sesuai MySQL kamu:
   ```
   copy .env.example .env
   ```
   (di macOS/Linux: `cp .env.example .env`)
5. Jalankan server:
   ```
   npm start
   ```
6. Buka `http://localhost:3000` di browser.

## Daftar Rute

| Metode | URL | Fungsi |
|---|---|---|
| GET | `/` | Beranda |
| GET | `/katalog` | Daftar menu (+ filter `?kategori=`) |
| GET | `/katalog/:id` | Detail menu |
| GET / POST | `/katalog/tambah` | Form dan proses tambah menu |
| GET / POST | `/katalog/edit/:id` | Form dan proses edit menu |
| POST | `/katalog/hapus/:id` | Hapus menu |

## Struktur Folder

```
├── app.js              # Server Express
├── database.sql        # Skema dan data awal
├── .env.example        # Contoh konfigurasi
├── config/db.js        # MySQL Connection Pool
├── models/             # Query SQL (prepared statements)
├── controllers/        # Logika aplikasi
├── routes/             # Pemetaan URL
├── middleware/         # Unggah gambar (multer)
├── views/
│   ├── pages/          # Halaman EJS
│   └── partials/       # Header, navbar, footer
└── public/             # CSS dan gambar
```

## Teknologi

Node.js, Express, EJS, MySQL, mysql2, dotenv, multer