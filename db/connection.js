// Require the db connection
const mysql = require('mysql2')

// Establish a db connection
const credentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const connection = mysql.createConnection(credentials)

connection.connect(err => {
    if (err) {
        throw err
    }
    console.info('✅ Connection successfull');
})

module.exports = connection