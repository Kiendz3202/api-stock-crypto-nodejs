const mongoose = require('mongoose')

const vn30Schema = mongoose.Schema(
    {
        name: { type: "String", require: true },
        symbol: { type: "String", require: true },
        reference: { type: "String", require: true },
        ceil: { type: "String", require: true },
        floor: { type: "String", require: true },
        currentPrice: { type: "String" },
        high: { type: "String", require: true },
        low: { type: "String", require: true },
        change: { type: "String", require: true },
        changePercent: { type: "String", require: true },
        turnOver: { type: "String", require: true }
    },
    {
        timestamps: true
    }
)

const Vn30 = mongoose.model('Vn30', vn30Schema)
module.exports = Vn30