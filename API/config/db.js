// Modules
const mongoose = require('mongoose');

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        )
        console.log(`Db Connected: ${conn.connection.host}`.green.underline)

    } catch (error) {
        console.log(`error : ${error}`.red)
        process.exit(1)
    }
}

module.exports = connectDB