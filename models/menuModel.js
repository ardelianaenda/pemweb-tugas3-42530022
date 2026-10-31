const pool = require("../config/db");

exports.getAll = async (kategori) => {
  if (kategori) {
    const [rows] = await pool.execute(
      "SELECT * FROM menu WHERE kategori = ? ORDER BY id",
      [kategori]
    );
    return rows;
  }

  const [rows] = await pool.execute("SELECT * FROM menu ORDER BY id");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM menu WHERE id = ?",
    [id]
  );
  return rows[0];
};

exports.create = async ({ nama_menu, kategori, deskripsi, harga, gambar }) => {
  const [result] = await pool.execute(
    "INSERT INTO menu (nama_menu, kategori, deskripsi, harga, gambar) VALUES (?, ?, ?, ?, ?)",
    [nama_menu, kategori, deskripsi, harga, gambar]
  );
  return result.insertId;
};

exports.update = async (id, { nama_menu, kategori, deskripsi, harga, gambar }) => {
  const [result] = await pool.execute(
    "UPDATE menu SET nama_menu = ?, kategori = ?, deskripsi = ?, harga = ?, gambar = ? WHERE id = ?",
    [nama_menu, kategori, deskripsi, harga, gambar, id]
  );
  return result.affectedRows;
};

exports.remove = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM menu WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};