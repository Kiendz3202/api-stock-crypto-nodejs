const asyncHandler = require('express-async-handler')

const Doji = require('../../../model/gold/dojiModel')

const dojiData = asyncHandler(async (req, res, next) => {
    try {
        const data = await Doji.find().select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { dojiData }