const db = require('../DB/mysql')

const TABLE = 'participantes'
const KEY = 'ID_PAR'

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