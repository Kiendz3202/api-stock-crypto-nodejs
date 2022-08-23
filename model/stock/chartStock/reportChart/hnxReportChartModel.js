const mongoose = require('mongoose')

// const dataset = mongoose.Schema({
//     one: [Number],
//     two: [Number]
// })

const hnxReportChartSchema = mongoose.Schema(
    {
        id: String,
        symbol: String,
        interval: [Number],
        datasets: {}
    },
    {
        timestamps: true
    }
)

const HnxReportChart = mongoose.model('HnxReportChart', hnxReportChartSchema)
module.exports = HnxReportChart