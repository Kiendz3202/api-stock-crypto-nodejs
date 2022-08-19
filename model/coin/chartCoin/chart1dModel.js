const mongoose = require('mongoose')

const chart1dSchema = mongoose.Schema(
    {
        name: { type: "String", default: "chart1d" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const Chart1d = mongoose.model('Chart1d', chart1dSchema)

module.exports = Chart1d

