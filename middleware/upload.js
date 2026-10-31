const multer = require("multer");
const path = require("path");

// Hanya format gambar ini yang diterima
const ekstensi = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "img"));
  },
  filename: (req, file, cb) => {
    const unik = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, "menu-" + unik + ekstensi[file.mimetype]);
  }
});

const fileFilter = (req, file, cb) => {
  if (ekstensi[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("Format gambar harus JPG, PNG, WEBP, atau GIF."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

// Pembungkus: kesalahan upload dicatat di req.uploadError agar form bisa tampil lagi
module.exports = (req, res, next) => {
  upload.single("gambar")(req, res, (err) => {
    if (err) {
      req.uploadError = err.code === "LIMIT_FILE_SIZE"
        ? "Ukuran gambar maksimal 2 MB."
        : err.message;
    }
    next();
  });
};