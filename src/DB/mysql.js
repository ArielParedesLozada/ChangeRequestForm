const mysql = require('mysql')
const config = require('../../config')
const { error } = require('../web/responses')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.dbUser,
    password: config.mysql.dbPass,
    database: config.mysql.dbName,
    port: config.mysql.dbPort,
}

let conexion

function connect() {
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Success")
        }
    })
    conexion.on('error', (err) => {
        console.log(err)
    })
}

connect()

function select(table, key, id) {
    let query = `SELECT * FROM ${table} WHERE ${key}=${id};`
    return new Promise((resolve, reject) => {
        conexion.query(query, (error, result) => {
            if (error) {
                return reject(error)
            }
            resolve(result)
        })
    })
}

function selectAll(table) {
    let query = `SELECT * FROM ${table};`
    return new Promise((resolve, reject) => {
        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function eliminate(table, key, data) {
    let query = `DELETE FROM ${table} WHERE ${key} = ?`
    return new Promise((resolve, reject) => {
        conexion.query(query, data[key], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function insert(table, data) {
    let query = `INSERT INTO ${table} SET ?`
    return new Promise((resolve, reject) => {
        conexion.query(query, data, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function update(table, key, data) {
    let query = `UPDATE ${table} SET ? WHERE ${key} = ?`
    return new Promise((resolve, reject) => {
        conexion.query(query, [data, data[key]], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}


function agregate(table, key, data) {
    if (data && data[key] == 0) {
        return insert(table, data)
    } else {
        return update(table, key, data)
    }
}

module.exports = {
    select,
    selectAll,
    eliminate,
    agregate
}