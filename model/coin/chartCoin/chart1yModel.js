const mongoose = require('mongoose')

const chart1ySchema = mongoose.Schema(
    {
        name: { type: "String", default: "chart1y" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const Chart1y = mongoose.model('Chart1y', chart1ySchema)

module.exports = Chart1y