const CSVFile = require("../models/CSVFile");
const Product = require("../models/Product");
const csv = require("fast-csv");
const { Readable } = require("stream");
// exports.importCSV = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No file uploaded!" });
//         }

//         console.log("Received file:", req.file.originalname); // Debugging

//         // Save CSV file to MongoDB
//         const newFile = new CSVFile({
//             filename: req.file.originalname,
//             mimetype: req.file.mimetype,
//             data: req.file.buffer,
//         });

//         await newFile.save();

//         // Convert buffer data to stream
//         const csvStream = Readable.from(Buffer.from(req.file.buffer).toString());

//         let products = [];
//         csvStream
//             .pipe(csv.parse({ headers: true }))
//             .on("data", (row) => {
//                 console.log("Row parsed:", row); // Debugging
//                 products.push(row);
//             })
//             .on("end", async () => {
//                 try {
//                     console.log("Final products array:", products); // Debugging
//                     await Product.insertMany(products);
//                     res.status(200).json({ message: "CSV imported successfully and stored in DB!" });
//                 } catch (err) {
//                     console.error("Error inserting data:", err);
//                     res.status(500).json({ error: "Error inserting data", details: err.message });
//                 }
//             });

//     } catch (error) {
//         console.error("Error importing CSV:", error);
//         res.status(500).json({ error: "Error importing CSV" });
//     }
// };



const importCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        // Convert buffer data to stream
        const csvStream = Readable.from(req.file.buffer.toString());

        let products = [];
        csvStream
            .pipe(csv.parse({ headers: true }))
            .on("data", (row) => {
                products.push({
                    name: row["Product Name"], // Mapping CSV column to schema field
                    category: row["Category"],
                    price: parseFloat(row["Price"]), // Ensure numeric value
                    stockQuantity: parseInt(row["Stock Quantity"]), // Ensure integer
                    itemsSold: parseInt(row["Items Sold"]) // Ensure integer
                });
            })
            .on("end", async () => {
                try {
                    await Product.insertMany(products);
                    res.status(200).json({ message: "CSV imported successfully and stored in DB!" });
                } catch (err) {
                    console.error("Error inserting data:", err);
                    res.status(500).json({ error: "Error inserting data" });
                }
            });

    } catch (error) {
        console.error("CSV Import Error:", error);
        res.status(500).json({ error: "Error importing CSV" });
    }
};


const exportCSV = async (req, res) => {
    try {
        // Find the most recent CSV file from the database
        const latestFile = await CSVFile.findOne().sort({ uploadedAt: -1 });

        if (!latestFile) {
            return res.status(404).json({ error: "No CSV file found" });
        }

        res.setHeader("Content-Type", latestFile.mimetype);
        res.setHeader("Content-Disposition", `attachment; filename=${latestFile.filename}`);
        res.send(latestFile.data);
    } catch (error) {
        res.status(500).json({ error: "Error exporting CSV" });
    }
};

module.exports = {
    importCSV,
    exportCSV
}