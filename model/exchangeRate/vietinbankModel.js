const mongoose = require('mongoose')

const vietinbankSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Ngân hàng Thương mại cổ phần Công Thương Việt Nam" },
        symbol: { type: "String", default: "VietinBank" },
        timeUpdate: { type: "String" },

        audBuyCast: { type: "String" },
        audBuyTransfer: { type: "String" },
        audSell: { type: "String" },

        cadBuyCast: { type: "String" },
        cadBuyTransfer: { type: "String" },
        cadSell: { type: "String" },

        chfBuyCast: { type: "String" },
        chfBuyTransfer: { type: "String" },
        chfSell: { type: "String" },

        cnyBuyCast: { type: "String" },
        cnyBuyTransfer: { type: "String" },
        cnySell: { type: "String" },

        dkkBuyCast: { type: "String" },
        dkkBuyTransfer: { type: "String" },
        dkkSell: { type: "String" },

        eurBuyCast: { type: "String" },
        eurBuyTransfer: { type: "String" },
        eurSell: { type: "String" },

        gbpBuyCast: { type: "String" },
        gbpBuyTransfer: { type: "String" },
        gbpSell: { type: "String" },

        hkdBuyCast: { type: "String" },
        hkdBuyTransfer: { type: "String" },
        hkdSell: { type: "String" },

        jpyBuyCast: { type: "String" },
        jpyBuyTransfer: { type: "String" },
        jpySell: { type: "String" },

        krwBuyCast: { type: "String" },
        krwBuyTransfer: { type: "String" },
        krwSell: { type: "String" },

        lakBuyCast: { type: "String" },
        lakBuyTransfer: { type: "String" },
        lakSell: { type: "String" },

        nokBuyCast: { type: "String" },
        nokBuyTransfer: { type: "String" },
        nokSell: { type: "String" },

        nzdBuyCast: { type: "String" },
        nzdBuyTransfer: { type: "String" },
        nzdSell: { type: "String" },

        sekBuyCast: { type: "String" },
        sekBuyTransfer: { type: "String" },
        sekSell: { type: "String" },

        sgdBuyCast: { type: "String" },
        sgdBuyTransfer: { type: "String" },
        sgdSell: { type: "String" },

        thbBuyCast: { type: "String" },
        thbBuyTransfer: { type: "String" },
        thbSell: { type: "String" },

        usdBuyCast: { type: "String" },
        usdBuyTransfer: { type: "String" },
        usdSell: { type: "String" },

    },
    {
        timestamps: true
    }
)

const VietinBank = mongoose.model('VietinBank ', vietinbankSchema)
module.exports = VietinBank