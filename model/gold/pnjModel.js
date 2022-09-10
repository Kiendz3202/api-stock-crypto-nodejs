const mongoose = require('mongoose')

const pnjSchema = mongoose.Schema(
    {
        name: { type: "String", default: "PNJ" },
        location: { type: "String" },
        timeUpdate: { type: "String" },
        vangmiengsjcBuy: { type: "String" },
        nhantronpnjBuy: { type: "String" },
        vangkimbaoBuy: { type: "String" },
        vangphucloctaiBuy: { type: "String" },
        vang24kBuy: { type: "String" },
        vang750Buy: { type: "String" },
        vang585Buy: { type: "String" },
        vang416Buy: { type: "String" },
        vangmiengpnjBuy: { type: "String" },
        vang916Buy: { type: "String" },
        vang680Buy: { type: "String" },
        vang650Buy: { type: "String" },

        vangmiengsjcSell: { type: "String" },
        nhantronpnjSell: { type: "String" },
        vangkimbaoSell: { type: "String" },
        vangphucloctaiSell: { type: "String" },
        vang24kSell: { type: "String" },
        vang750Sell: { type: "String" },
        vang585Sell: { type: "String" },
        vang416Sell: { type: "String" },
        vangmiengpnjSell: { type: "String" },
        vang916Sell: { type: "String" },
        vang680Sell: { type: "String" },
        vang650Sell: { type: "String" },
    },
    {
        timestamps: true
    }
)

const Pnj = mongoose.model('Pnj', pnjSchema)
module.exports = Pnj