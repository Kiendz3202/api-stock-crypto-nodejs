const mongoose = require('mongoose')

const hnxDetailSchema = mongoose.Schema(
    {
        name: { type: "String" },
        symbol: { type: "String" },
        reference: { type: "String" },
        ceil: { type: "String" },
        floor: { type: "String" },
        currentPrice: { type: "String" },
        change: { type: "String" },
        changePercent: { type: "String" },
        openPrice: { type: "String" },
        high: { type: "String" },
        low: { type: "String" },
        turnOver: { type: "String" },
        sumValue: { type: "String" },
        turnOverBuy: [{ type: String }],
        turnOverSell: [{ type: String }],
        buyPrice: [{ type: String }],
        sellPrice: [{ type: String }],
        urlChart: { type: "String" }
    },
    {
        timestamps: true
    }
)

const HnxDetail = mongoose.model('HnxDetail', hnxDetailSchema)
module.exports = HnxDetail