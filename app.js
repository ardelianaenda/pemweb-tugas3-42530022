require("dotenv").config();

const pool = require("./config/db");
const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use("/", pageRoutes);
app.use("/katalog", menuRoutes);

app.use((req, res) => {
  res.status(404).render("pages/notfound", {
    judul: "Halaman Tidak Ditemukan",
    halaman: "",
    pesan: `Halaman "${req.originalUrl}" tidak ditemukan.`
  });
});

app.listen(PORT, async () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);

  try {
    const [rows] = await pool.execute("SELECT COUNT(*) AS total FROM menu");
    console.log("Database terhubung. Jumlah menu:", rows[0].total);

    // TES SEMENTARA: hapus setelah dicek
    const [contoh] = await pool.execute("SELECT nama_menu, harga FROM menu LIMIT 1");
    console.log("Contoh data:", contoh[0]);
  } catch (err) {
    console.error("Gagal terhubung ke database:", err.message);
  }
});