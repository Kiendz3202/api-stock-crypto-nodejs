const mongoose = require('mongoose')

const bidvSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam" },
        symbol: { type: "String", default: "Bidv" },
        timeUpdate: { type: "String" },

        usdBuyCast: { type: "String" },
        usdBuyTransfer: { type: "String" },
        usdSell: { type: "String" },

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

        thbBuyCast: { type: "String" },
        thbBuyTransfer: { type: "String" },
        thbSell: { type: "String" },

        audBuyCast: { type: "String" },
        audBuyTransfer: { type: "String" },
        audSell: { type: "String" },

        cadBuyCast: { type: "String" },
        cadBuyTransfer: { type: "String" },
        cadSell: { type: "String" },

        sgdBuyCast: { type: "String" },
        sgdBuyTransfer: { type: "String" },
        sgdSell: { type: "String" },

        sekBuyCast: { type: "String" },
        sekBuyTransfer: { type: "String" },
        sekSell: { type: "String" },

        lakBuyCast: { type: "String" },
        lakBuyTransfer: { type: "String" },
        lakSell: { type: "String" },

        dkkBuyCast: { type: "String" },
        dkkBuyTransfer: { type: "String" },
        dkkSell: { type: "String" },

        nokBuyCast: { type: "String" },
        nokBuyTransfer: { type: "String" },
        nokSell: { type: "String" },

        cnyBuyCast: { type: "String" },
        cnyBuyTransfer: { type: "String" },
        cnySell: { type: "String" },

        rubBuyCast: { type: "String" },
        rubBuyTransfer: { type: "String" },
        rubSell: { type: "String" },

        nzdBuyCast: { type: "String" },
        nzdBuyTransfer: { type: "String" },
        nzdSell: { type: "String" },

        krwBuyCast: { type: "String" },
        krwBuyTransfer: { type: "String" },
        krwSell: { type: "String" },


        eurBuyCast: { type: "String" },
        eurBuyTransfer: { type: "String" },
        eurSell: { type: "String" },

        twdBuyCast: { type: "String" },
        twdBuyTransfer: { type: "String" },
        twdSell: { type: "String" },

        myrBuyCast: { type: "String" },
        myrBuyTransfer: { type: "String" },
        myrSell: { type: "String" },

    },
    {
        timestamps: true
    }
)

const Bidv = mongoose.model('Bidv', bidvSchema)
module.exports = Bidv