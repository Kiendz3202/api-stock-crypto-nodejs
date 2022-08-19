const mongoose = require('mongoose')

const chartMaxSchema = mongoose.Schema(
    {
        name: { type: "String", default: "chartMax" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const ChartMax = mongoose.model('ChartMax', chartMaxSchema)

module.exports = ChartMax