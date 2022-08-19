const asyncHandler = require('express-async-handler')
const request = require('request')
const Coin = require('../model/coin/coinModel')

// const autoAddTredingCoin = (req, res, next) => {
//     // request.get('https://api.coingecko.com/api/v3/search/trending', (error, response, body) => {
//     //     let json = JSON.parse(body)
//     //     json.coins.map((coin) => console.log(coin + '\n'))

//     console.log(req.query)

//     // })
// }

const paginationPageCoin = asyncHandler(async (req, res, next) => {

    const perPage = 25
    const page = req.params.page || 1
    const allCoin = await Coin.find()
    const allCoinLength = allCoin.length
    const countPage = Math.ceil(allCoinLength / perPage)

    //-------------pagination by mongoose------------------------

    // const coinList = await Coin.find({ rank: { $gte: 1, $lte: 100 } }).sort({ rank: 1 });
    const coinList = await Coin.find({}).sort({ rank: 1 }).skip((perPage * page) - perPage).limit(perPage)
    // const coinOfPage = await coinList.skip((perPage * page) - perPage).limit(perPage)

    res.status(200).json(coinList)
})

const detailCoin = asyncHandler(async (req, res, next) => {
    const coinName = req.params.coin || "bitcoin";
    //crawDeatilCoin
    //response detailCoin data

})

module.exports = { paginationPageCoin, detailCoin }