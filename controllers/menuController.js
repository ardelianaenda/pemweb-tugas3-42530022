const fs = require("fs");
const path = require("path");
const menuModel = require("../models/menuModel");

const daftarKategori = [
  { kunci: "kopi", label: "Kopi" },
  { kunci: "nonkopi", label: "Non-Kopi" },
  { kunci: "makanan", label: "Makanan" },
  { kunci: "dessert", label: "Dessert" }
];
const kategoriValid = daftarKategori.map((k) => k.kunci);

const folderGambar = path.join(__dirname, "..", "public", "img");

const pesanStatus = {
  tambah: "Menu baru berhasil ditambahkan.",
  ubah: "Menu berhasil diperbarui.",
  hapus: "Menu berhasil dihapus."
};

const tampilkanError = (res, err) => {
  console.error(err);
  res.status(500).render("pages/notfound", {
    judul: "Terjadi Kesalahan",
    halaman: "katalog",
    pesan: "Terjadi kesalahan pada server. Silakan coba lagi."
  });
};

const tidakDitemukan = (res, idMentah) => {
  res.status(404).render("pages/notfound", {
    judul: "Data Tidak Ditemukan",
    halaman: "katalog",
    pesan: `Menu dengan ID "${idMentah}" tidak ada di daftar kami.`
  });
};

const hapusGambarLama = (namaFile) => {
  if (namaFile && /^menu-[\w-]+\.(jpg|png|webp|gif)$/.test(namaFile)) {
    fs.unlink(path.join(folderGambar, namaFile), () => {});
  }
};

const validasiMenu = (body) => {
  const data = {
    nama_menu: (body.nama_menu || "").trim(),
    kategori: (body.kategori || "").trim(),
    deskripsi: (body.deskripsi || "").trim(),
    harga: (body.harga || "").trim()
  };

  const errors = [];
  if (!data.nama_menu) {
    errors.push("Nama menu wajib diisi.");
  } else if (data.nama_menu.length > 100) {
    errors.push("Nama menu maksimal 100 karakter.");
  }
  if (!kategoriValid.includes(data.kategori)) {
    errors.push("Pilih salah satu kategori.");
  }
  if (!/^\d+$/.test(data.harga) || Number(data.harga) > 99999999) {
    errors.push("Harga harus berupa angka bulat (tanpa titik atau koma).");
  }

  return { data, errors };
};

exports.katalog = async (req, res) => {
  try {
    const kategori = req.query.kategori;
    const daftarMenu = await menuModel.getAll(kategori);

    const kunciPesan = req.query.pesan;
    const pesan = Object.prototype.hasOwnProperty.call(pesanStatus, kunciPesan)
      ? pesanStatus[kunciPesan]
      : null;

    res.render("pages/katalog", {
      judul: "Katalog Menu",
      halaman: "katalog",
      daftarMenu: daftarMenu,
      kategoriAktif: kategori || "semua",
      daftarKategori: daftarKategori,
      pesan: pesan
    });
  } catch (err) {
    tampilkanError(res, err);
  }
};

exports.detail = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = Number.isInteger(id) ? await menuModel.getById(id) : undefined;

    if (!item) {
      return tidakDitemukan(res, req.params.id);
    }

    res.render("pages/detail", {
      judul: item.nama_menu,
      halaman: "katalog",
      item: item
    });
  } catch (err) {
    tampilkanError(res, err);
  }
};

exports.tambahForm = (req, res) => {
  res.render("pages/form", {
    judul: "Tambah Menu",
    halaman: "katalog",
    mode: "tambah",
    action: "/katalog/tambah",
    errors: [],
    input: { nama_menu: "", kategori: "", deskripsi: "", harga: "" },
    gambarSaatIni: null,
    daftarKategori: daftarKategori
  });
};

exports.tambahSubmit = async (req, res) => {
  const hapusFileUpload = () => {
    if (req.file) fs.unlink(req.file.path, () => {});
  };

  try {
    const { data, errors } = validasiMenu(req.body);
    if (req.uploadError) errors.push(req.uploadError);

    if (errors.length > 0) {
      hapusFileUpload();
      return res.status(400).render("pages/form", {
        judul: "Tambah Menu",
        halaman: "katalog",
        mode: "tambah",
        action: "/katalog/tambah",
        errors: errors,
        input: data,
        gambarSaatIni: null,
        daftarKategori: daftarKategori
      });
    }

    await menuModel.create({
      nama_menu: data.nama_menu,
      kategori: data.kategori,
      deskripsi: data.deskripsi,
      harga: Number(data.harga),
      gambar: req.file ? req.file.filename : "default.webp"
    });

    res.redirect("/katalog?pesan=tambah");
  } catch (err) {
    hapusFileUpload();
    tampilkanError(res, err);
  }
};

exports.editForm = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = Number.isInteger(id) ? await menuModel.getById(id) : undefined;

    if (!item) {
      return tidakDitemukan(res, req.params.id);
    }

    res.render("pages/form", {
      judul: "Edit Menu",
      halaman: "katalog",
      mode: "edit",
      action: `/katalog/edit/${item.id}`,
      errors: [],
      input: {
        nama_menu: item.nama_menu,
        kategori: item.kategori,
        deskripsi: item.deskripsi || "",
        harga: item.harga
      },
      gambarSaatIni: item.gambar,
      daftarKategori: daftarKategori
    });
  } catch (err) {
    tampilkanError(res, err);
  }
};

exports.editSubmit = async (req, res) => {
  const hapusFileUpload = () => {
    if (req.file) fs.unlink(req.file.path, () => {});
  };

  try {
    const id = Number(req.params.id);
    const lama = Number.isInteger(id) ? await menuModel.getById(id) : undefined;

    if (!lama) {
      hapusFileUpload();
      return tidakDitemukan(res, req.params.id);
    }

    const { data, errors } = validasiMenu(req.body);
    if (req.uploadError) errors.push(req.uploadError);

    if (errors.length > 0) {
      hapusFileUpload();
      return res.status(400).render("pages/form", {
        judul: "Edit Menu",
        halaman: "katalog",
        mode: "edit",
        action: `/katalog/edit/${id}`,
        errors: errors,
        input: data,
        gambarSaatIni: lama.gambar,
        daftarKategori: daftarKategori
      });
    }

    await menuModel.update(id, {
      nama_menu: data.nama_menu,
      kategori: data.kategori,
      deskripsi: data.deskripsi,
      harga: Number(data.harga),
      gambar: req.file ? req.file.filename : lama.gambar
    });

    if (req.file) {
      hapusGambarLama(lama.gambar);
    }

    res.redirect("/katalog?pesan=ubah");
  } catch (err) {
    hapusFileUpload();
    tampilkanError(res, err);
  }
};

exports.hapusSubmit = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = Number.isInteger(id) ? await menuModel.getById(id) : undefined;

    if (!item) {
      return tidakDitemukan(res, req.params.id);
    }

    await menuModel.remove(id);
    hapusGambarLama(item.gambar);

    res.redirect("/katalog?pesan=hapus");
  } catch (err) {
    tampilkanError(res, err);
  }
};