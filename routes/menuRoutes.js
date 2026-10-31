const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const uploadGambar = require("../middleware/upload");

router.get("/", menuController.katalog);
router.get("/tambah", menuController.tambahForm);
router.post("/tambah", uploadGambar, menuController.tambahSubmit);
router.get("/edit/:id", menuController.editForm);
router.post("/edit/:id", uploadGambar, menuController.editSubmit);
router.post("/hapus/:id", menuController.hapusSubmit);
router.get("/:id", menuController.detail);

module.exports = router;