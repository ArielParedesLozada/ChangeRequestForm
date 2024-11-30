const responses = require('../responses')
const solicitudCon = require('../../controllers/SolicitudControllers')


const selectAll = async function selectAll(req, res, next) {
    try {
        const all = await solicitudCon.selectAll()
        res.render('all', { all })
    } catch (error) {
        next(error)
    }
}

const select = async function select(req, res, next) {
    try {
        const data = await solicitudCon.select(req.params.id)
        //console.log(data)
        //responses.success(req, res, data)
        res.render('form', { data })
    } catch (error) {
        next(error)
    }
}

const eliminate = async function eliminate(req, res, next) {
    try {
        const items = await solicitudCon.eliminate(req.body)
        responses.success(req, res, 'Item eliminado satisfactoriamente')
    } catch (error) {
        next(error)
    }
}

const agregate = async function agregate(req, res, next) {
    try {
        const items = await solicitudCon.agregate(req.body)
        let message
        if (req.body.id == 0) {
            message = 'Item guardado'
        } else {
            message = 'Item actualizado'
        }
        responses.success(req, res, message)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    selectAll,
    select,
    eliminate,
    agregate
}