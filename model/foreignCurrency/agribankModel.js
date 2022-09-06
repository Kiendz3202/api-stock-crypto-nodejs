const mongoose = require('mongoose')

const agribankSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam" },
        symbol: { type: "String", default: "Agribank" },
        timeUpdate: { type: "String" },

        usdBuyCast: { type: "String" },
        usdBuyTransfer: { type: "String" },
        usdSell: { type: "String" },

        eurBuyCast: { type: "String" },
        eurBuyTransfer: { type: "String" },
        eurSell: { type: "String" },

        gbpBuyCast: { type: "String" },
        gbpBuyTransfer: { type: "String" },
        gbpSell: { type: "String" },

        hkdBuyCast: { type: "String" },
        hkdBuyTransfer: { type: "String" },
        hkdSell: { type: "String" },

        chfBuyCast: { type: "String" },
        chfBuyTransfer: { type: "String" },
        chfSell: { type: "String" },

        jpyBuyCast: { type: "String" },
        jpyBuyTransfer: { type: "String" },
        jpySell: { type: "String" },

        audBuyCast: { type: "String" },
        audBuyTransfer: { type: "String" },
        audSell: { type: "String" },

        sgdBuyCast: { type: "String" },
        sgdBuyTransfer: { type: "String" },
        sgdSell: { type: "String" },

        thbBuyCast: { type: "String" },
        thbBuyTransfer: { type: "String" },
        thbSell: { type: "String" },

        cadBuyCast: { type: "String" },
        cadBuyTransfer: { type: "String" },
        cadSell: { type: "String" },


        nzdBuyCast: { type: "String" },
        nzdBuyTransfer: { type: "String" },
        nzdSell: { type: "String" },

        krwBuyCast: { type: "String" },
        krwBuyTransfer: { type: "String" },
        krwSell: { type: "String" },
    },
    {
        timestamps: true
    }
)

const Agribank = mongoose.model('Agribank', agribankSchema)
module.exports = Agribank