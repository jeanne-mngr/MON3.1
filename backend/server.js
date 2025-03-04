const express = require('express')
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./connection/dbConnection');
const cors = require('cors')

connectDB();
const app = express();

const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})