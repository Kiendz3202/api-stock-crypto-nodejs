const mongoose = require('mongoose')

const vietcombankSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Ngân hàng thương mại cổ phần Ngoại thương Việt Nam" },
        symbol: { type: "String", default: "Vietcombank" },
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

        inrBuyCast: { type: "String" },
        inrBuyTransfer: { type: "String" },
        inrSell: { type: "String" },

        jpyBuyCast: { type: "String" },
        jpyBuyTransfer: { type: "String" },
        jpySell: { type: "String" },

        krwBuyCast: { type: "String" },
        krwBuyTransfer: { type: "String" },
        krwSell: { type: "String" },

        kwdBuyCast: { type: "String" },
        kwdBuyTransfer: { type: "String" },
        kwdSell: { type: "String" },

        myrBuyCast: { type: "String" },
        myrBuyTransfer: { type: "String" },
        myrSell: { type: "String" },

        nokBuyCast: { type: "String" },
        nokBuyTransfer: { type: "String" },
        nokSell: { type: "String" },

        rubBuyCast: { type: "String" },
        rubBuyTransfer: { type: "String" },
        rubSell: { type: "String" },

        sarBuyCast: { type: "String" },
        sarBuyTransfer: { type: "String" },
        sarSell: { type: "String" },

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

const Vietcombank = mongoose.model('Vietcombank', vietcombankSchema)
module.exports = Vietcombank