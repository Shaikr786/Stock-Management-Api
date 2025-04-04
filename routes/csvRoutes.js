const express = require("express");
const { importCSV, exportCSV } = require("../controllers/csvController");
const {upload} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/import-csv", upload.single("file"), importCSV);
router.get("/export-csv", exportCSV);

module.exports = router;
