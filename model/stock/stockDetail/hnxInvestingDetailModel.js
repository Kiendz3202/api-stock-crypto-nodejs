const mongoose = require('mongoose')

const hnxInvestingDetailSchema = mongoose.Schema(
    {
        id: { type: "String" },
        name: { type: "String", default: "" },
        symbol: { type: "String", default: "" },
        // currentPrice: { type: "String", default: "" },
        // referencePrice: { type: "String", default: "" },
        // openPrice: { type: "String", default: "" },
        // buyPrice: { type: "String", default: "" },
        // sellPrice: { type: "String", default: "" },
        // high: { type: "String", default: "" },
        // low: { type: "String", default: "" },
        // high1Year: { type: "String", default: "" },
        // low1Year: { type: "String", default: "" },
        // change: { type: "String", default: "" },
        // changePercent: { type: "String", default: "" },
        // changePercent1Year: { type: "String", default: "" },
        // turnOver: { type: "String", default: "" },
        // turnOverAverage3Month: { type: "String", default: "" },
        // marketcap: { type: "String", default: "" },
        // p2eRatio: { type: "String", default: "" },
        // revenue: { type: "String", default: "" },
        // eps: { type: "String", default: "" },
        // dividend: { type: "String", default: "" },
        // yield: { type: "String", default: "" },
        // timeReport: { type: "String", default: "" },
        // descriptionCompany: { type: "String", default: "" },
        // major: { type: "String", default: "" },
        // field: { type: "String", default: "" },
        // numberOfEmployees: { type: "String", default: "" },
        // marketLocation: { type: "String", default: "" }
    },
    {
        timestamps: true
    }
)

const HnxInvestingDetail = mongoose.model('HnxInvestingDetail', hnxInvestingDetailSchema)
module.exports = HnxInvestingDetail