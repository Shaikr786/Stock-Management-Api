const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const sales = require('./routes/sales');
const stock = require('./routes/stock');
const userRoutes = require('./routes/userRoutes');


// Import Routes
const csvRoutes = require("./routes/csvRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);

app.use("/api/sales", sales);
app.use("/api", stock);

app.use("/api/auth", userRoutes);


// Use Routes
app.use("/api/csv", csvRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

app.get('/', (req, res) => {
    res.send('API is running...');
    console.log('API is running...');
}   );  

app.use((req, res, next) => {
    res.status(404).json({ message: 'Error generated from the middleware in server.js' });
});                     

module.exports = app;




//All done let's build the UI to integrate these APIs and make it look good. and before let's deploy this backend and use as public api :)
//Thank You