const mongoose = require('mongoose')

const hnxInvestingSchema = mongoose.Schema(
    {
        id: { type: "String" },
        name: { type: "String" },
        last: { type: "String" },
        change: { type: "String" },
        changePercent: { type: "String" },
        high: { type: "String" },
        low: { type: "String" },
        turnOver: { type: "String" },
        time: { type: "String" },
        hrefDetail: { type: "String" }
    },
    {
        timestamps: true
    }
)

const HnxInvesting = mongoose.model('HnxInvesting', hnxInvestingSchema)
module.exports = HnxInvesting