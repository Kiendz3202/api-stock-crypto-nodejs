const asyncHandler = require('express-async-handler')

const Sjc = require('../../../model/gold/sjcModel')


const sjcData = asyncHandler(async (req, res, next) => {

    try {
        const data = await Sjc.find().select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

module.exports = { sjcData }