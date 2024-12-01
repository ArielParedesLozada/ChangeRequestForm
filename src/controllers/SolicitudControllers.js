const db = require('../DB/mysql')

const TABLE = 'solicitudes'
const KEY = 'ID_SOL'
const STRUCTURE = [
    'ID_SOL',
    'TIT_SOL',
    'VER_SOL',
    'FEC_SOL',
    'PRIO_SOL',
    'EST_SOL',
    'DES_SOL',
    'JUST_SOL',
    'ID_PER_SOLICITA',
    'ID_PRO_SOL',
    'FEC_REV_SOL',
    'ID_PER_REVISA',
    'ENT_SOL',
    'MOD_MOD_SOL',
    'MOD_AFE_SOL'
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