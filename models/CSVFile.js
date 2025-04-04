const mongoose = require("mongoose");

const csvFileSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    data: Buffer, // Store the CSV file as binary
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CSVFile", csvFileSchema);
