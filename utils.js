const mysql = require("mysql")
require("dotenv").config()

const MYSQL_HOST_NAME = process.env.MYSQL_HOST_NAME
const MYSQL_USER = process.env.MYSQL_HOST_NAME
const MYSQL_PASSWORD = process.env.MYSQL_HOST_NAME
const MYSQL_DATABASE = process.env.MYSQL_HOST_NAME

const connection = mysql.createConnection({
    host: MYSQL_HOST_NAME,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
})

async function getMapTopFive(mapname) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM record_race WHERE Map = ? ORDER BY 'Time' ASC LIMIT 5"
        const values = [mapname]
        connection.query(sql, values, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = {
    getMapTopFive,
}
