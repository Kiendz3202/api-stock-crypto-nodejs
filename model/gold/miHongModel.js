const mongoose = require('mongoose')

const miHongSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Mi Hồng" },
        location: { type: "String", default: "Hồ Chí Minh" },

        sjcBuy: { type: "String" },
        vang999Buy: { type: "String" },
        vang985Buy: { type: "String" },
        vang980Buy: { type: "String" },
        vang950Buy: { type: "String" },
        vang750Buy: { type: "String" },
        vang680Buy: { type: "String" },
        vang610Buy: { type: "String" },

        sjcSell: { type: "String" },
        vang999Sell: { type: "String" },
        vang985Sell: { type: "String" },
        vang980Sell: { type: "String" },
        vang950Sell: { type: "String" },
        vang750Sell: { type: "String" },
        vang680Sell: { type: "String" },
        vang610Sell: { type: "String" },
    },
    {
        timestamps: true
    }
)

const MiHong = mongoose.model('MiHong', miHongSchema)
module.exports = MiHong