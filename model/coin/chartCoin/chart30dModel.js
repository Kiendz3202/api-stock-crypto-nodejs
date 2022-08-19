const mongoose = require('mongoose')

const chart30dSchema = mongoose.Schema(
    {
        name: { type: "String", default: "chart30d" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const Chart30d = mongoose.model('Chart30d', chart30dSchema)

module.exports = Chart30d