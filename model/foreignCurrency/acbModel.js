const mongoose = require('mongoose')

const acbSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Ngân hàng TMCP Á Châu" },
        symbol: { type: "String", default: "ACB" },
        timeUpdate: { type: "String" },

        usdBuyCast: { type: "String" },
        usdSellCast: { type: "String" },
        usdBuyTransfer: { type: "String" },
        usdSellTransfer: { type: "String" },

        eurBuyCast: { type: "String" },
        eurSellCast: { type: "String" },
        eurBuyTransfer: { type: "String" },
        eurSellTransfer: { type: "String" },

        audBuyCast: { type: "String" },
        audSellCast: { type: "String" },
        audBuyTransfer: { type: "String" },
        audSellTransfer: { type: "String" },

        cadBuyCast: { type: "String" },
        cadSellCast: { type: "String" },
        cadBuyTransfer: { type: "String" },
        cadSellTransfer: { type: "String" },

        chfBuyCast: { type: "String" },
        chfSellCast: { type: "String" },
        chfBuyTransfer: { type: "String" },
        chfSellTransfer: { type: "String" },

        gbpBuyCast: { type: "String" },
        gbpSellCast: { type: "String" },
        gbpBuyTransfer: { type: "String" },
        gbpSellTransfer: { type: "String" },

        thbBuyCast: { type: "String" },
        thbSellCast: { type: "String" },
        thbBuyTransfer: { type: "String" },
        thbSellTransfer: { type: "String" },

        jpyBuyCast: { type: "String" },
        jpySellCast: { type: "String" },
        jpyBuyTransfer: { type: "String" },
        jpySellTransfer: { type: "String" },

        krwBuyCast: { type: "String" },
        krwSellCast: { type: "String" },
        krwBuyTransfer: { type: "String" },
        krwSellTransfer: { type: "String" },

        nzdBuyCast: { type: "String" },
        nzdSellCast: { type: "String" },
        nzdBuyTransfer: { type: "String" },
        nzdSellTransfer: { type: "String" },

        sgdBuyCast: { type: "String" },
        sgdSellCast: { type: "String" },
        sgdBuyTransfer: { type: "String" },
        sgdSellTransfer: { type: "String" },
    },
    {
        timestamps: true
    }
)

const Acb = mongoose.model('Acb', acbSchema)
module.exports = Acb