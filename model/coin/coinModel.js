const mongoose = require('mongoose')

//coins/markets đáp ứng đủ cái này nhưng chỉ 1 loại usd or vnd chứ k lấy dc giá của cả 2 loại tiên

const coinSchema = mongoose.Schema(
    {
        name: { type: "String", require: true },
        nameId: { type: "String", require: true },
        symbol: { type: "String", require: true },
        image: { type: "String" },
        priceChange1hPercent: { type: "Number" },
        priceChange24hPercent: { type: "Number" },
        priceChange7dPercent: { type: "Number" },
        priceChange14dPercent: { type: "Number" },
        priceChange30dPercent: { type: "Number" },
        priceChange200dPercent: { type: "Number" },
        priceChange1yPercent: { type: "Number" },
        volume24h: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        marketCap: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        high24h: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        low24h: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        ath: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        atl: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        fullyDilutedValuation: {
            usd: { type: "Number" },
            vnd: { type: "Number", default: 1 }
        },
        circulatingSupply: { type: "Number" },
        totalSupply: { type: "Number" },
        maxSupply: { type: "Number" },
        currentPrice: {
            usd: { type: "Number", require: true },
            vnd: { type: "Number", require: true, default: 1 }
        },
        rank: { type: 'Number', require: true },
    },
    {
        timestamps: true
    }
)

const Coin = mongoose.model('Coin', coinSchema)

module.exports = Coin