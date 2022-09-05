const asyncHandler = require('express-async-handler')

const BaoTinMinhChau = require('../../../model/gold/baoTinMinhchauModel')

const baoTinMinhChauData = asyncHandler(async (req, res, next) => {
    try {
        const data = await BaoTinMinhChau.find().select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { baoTinMinhChauData }