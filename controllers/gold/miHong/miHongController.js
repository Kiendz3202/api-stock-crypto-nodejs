const asyncHandler = require('express-async-handler')

const MiHong = require('../../../model/gold/miHongModel')

const miHongData = asyncHandler(async (req, res, next) => {
    try {
        const data = await MiHong.find().select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { miHongData }