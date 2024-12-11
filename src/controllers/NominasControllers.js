const db = require('../DB/mysql')

const TABLE = 'nominas'
const KEY = 'ID_NOM'
const STRUCTURE = [
    'ID_NOM',
    'ID_PER_NOM',
    'CAR_PER_NOM',
    'PAG_PER_NOM',
    'ID_PRO_NOM'
]

function parse(data) {
    if (!Array.isArray(data) || data.length != STRUCTURE.length) {
        console.log('Mala data', data)
        return
    }
    let result = {}
    for (let index = 0; index < data.length; index++) {
        result[STRUCTURE[index]] = data[index]        
    }
    return result
}

function selectAll() {
    return db.selectAll(TABLE)
}

function select(id) {
    return db.select(TABLE, KEY, id)
}

function eliminate(body) {
    const nBody = parse(body)
    return db.eliminate(TABLE, KEY, nBody)
}

function agregate(body) {
    const nBody = parse(body)
    return db.agregate(TABLE, KEY, nBody)
}

module.exports = {
    selectAll,
    select,
    eliminate,
    agregate
}