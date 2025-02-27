const mongoose = require('mongoose')

const connectDB = async () => {
    console.log(process.env.CONNECTION_STRING);
    try {
        const connect = await mongoose.connect("mongodb+srv://admin:admin123@fullstack.d1fls.mongodb.net/?retryWrites=true&w=majority&appName=fullstack ")
        console.log('Database connected :', connect.connection.host, connect.connection.name)
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;