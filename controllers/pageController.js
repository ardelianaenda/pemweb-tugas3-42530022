const menuModel = require("../models/menuModel");

// Halaman Home
exports.home = async (req, res) => {
  try {
    const semuaMenu = await menuModel.getAll();

    res.render("pages/home", {
      judul: "Beranda",
      halaman: "home",
      sorotan: semuaMenu.slice(0, 3),
      andalan: semuaMenu.slice(0, 4)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
};

// Halaman About
exports.about = async (req, res) => {
  try {
    const semuaMenu = await menuModel.getAll();

    res.render("pages/about", {
      judul: "Tentang Kami",
      halaman: "about",
      jumlahMenu: semuaMenu.length,
      nilai: [
        { judul: "Biji Pilihan", isi: "Kami memilih biji kopi dari petani lokal dan menyangrainya secara berkala agar rasanya tetap segar." },
        { judul: "Dibuat dengan Hati", isi: "Setiap minuman dan hidangan disiapkan satu per satu, bukan massal." },
        { judul: "Tempat untuk Pulang", isi: "Flora Coffee dirancang sebagai ruang santai untuk bekerja, mengobrol, atau sekadar rehat." }
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
};