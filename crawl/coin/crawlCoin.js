const asyncHandler = require('express-async-handler')
const cron = require('node-cron')
const axios = require('axios')
const Coin = require('../../model/coin/coinModel')


const crawlCoin = asyncHandler(async () => {
    cron.schedule('*/20 * * * * *', async () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
            .then(response => {
                response.data.map(coin => {
                    if (coin.fully_diluted_valuation === null) {
                        coin.fully_diluted_valuation = 8
                    }
                    if (coin.max_supply == null) {
                        coin.max_supply = 8
                    }
                    if (coin.total_supply == null) {
                        coin.total_supply = 8
                    }
                    Coin.findOneAndUpdate({ name: coin.name }, {
                        name: coin.name,
                        symbol: coin.symbol,
                        nameId: coin.id,
                        image: coin.image,
                        priceChange1hPercent: parseFloat(coin.price_change_percentage_1h_in_currency),
                        priceChange24hPercent: parseFloat(coin.price_change_percentage_24h_in_currency),
                        priceChange7dPercent: parseFloat(coin.price_change_percentage_7d_in_currency),
                        priceChange14dPercent: parseFloat(coin.price_change_percentage_14d_in_currency),
                        priceChange30dPercent: parseFloat(coin.price_change_percentage_30d_in_currency),
                        priceChange200dPercent: parseFloat(coin.price_change_percentage_200d_in_currency),
                        priceChange1yPercent: parseFloat(coin.price_change_percentage_1y_in_currency),
                        "volume24h.usd": parseFloat(coin.total_volume),
                        "marketCap.usd": parseFloat(coin.market_cap),
                        "currentPrice.usd": parseFloat(coin.current_price),
                        "high24h.usd": parseFloat(coin.high_24h),
                        "low24h.usd": parseFloat(coin.low_24h),
                        "ath.usd": parseFloat(coin.ath),
                        "atl.usd": parseFloat(coin.atl),
                        "fullyDilutedValuation.usd": parseFloat(coin.fully_diluted_valuation),
                        rank: parseInt(coin.market_cap_rank),
                        circulatingSupply: parseFloat(coin.circulating_supply),
                        totalSupply: parseInt(coin.total_supply),
                        maxSupply: parseInt(coin.max_supply)
                    }, { upsert: true }).then(doc => console.log(doc.low24h)).catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))
    })
})


module.exports = crawlCoin