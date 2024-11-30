const db = require('../DB/mysql')

const TABLE = 'proyectos'
const KEY = 'ID_PRO'

function selectAll() {
    return db.selectAll(TABLE)
}

function select(id) {
    return db.select(TABLE, KEY, id)
}

function eliminate(body) {
    return db.eliminate(TABLE, KEY, body)
}

function agregate(body) {
    const nBody = {
        ...body,
        [KEY]: body.id
    }
    delete nBody.id
    return db.agregate(TABLE, KEY, nBody)
}

module.exports = {
    selectAll,
    select,
    eliminate,
    agregate
}