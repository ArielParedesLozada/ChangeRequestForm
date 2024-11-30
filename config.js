require('dotenv').config()

module.exports = {
    app: {
        port: process.env.PORT || 5501
    },
    mysql: {
        host: process.env.DATABASE_HOST,
        dbName: process.env.DATABASE_NAME,
        dbUser: process.env.DATABASE_USER,
        dbPass: process.env.DATABASE_PASSWORD,
        dbPort: process.env.DATABASE_PORT,
    }
} 