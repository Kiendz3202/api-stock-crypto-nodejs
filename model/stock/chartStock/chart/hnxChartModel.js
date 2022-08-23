const mongoose = require('mongoose')


const hnxChartSchema = mongoose.Schema(
    {
        symbol: { type: "String" },
        t: [Number],
        o: [Number],
        h: [Number],
        l: [Number],
        c: [Number]
    },
    {
        timestamps: true
    }
)

const HnxChart = mongoose.model('HnxChart', hnxChartSchema)
module.exports = HnxChart