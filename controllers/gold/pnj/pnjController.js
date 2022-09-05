const asyncHandler = require('express-async-handler')

const Pnj = require('../../../model/gold/pnjModel')

const pnjData = asyncHandler(async (req, res, next) => {
    try {
        const data = await Pnj.find().select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { pnjData }