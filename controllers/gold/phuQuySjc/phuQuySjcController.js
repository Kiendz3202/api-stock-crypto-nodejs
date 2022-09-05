const asyncHandler = require('express-async-handler')

const PhuQuySjc = require('../../../model/gold/phuquysjcModel')

const phuQuyData = asyncHandler(async (req, res, next) => {
    try {
        const data = await PhuQuySjc.find().select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { phuQuyData }