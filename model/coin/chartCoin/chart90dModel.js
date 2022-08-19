const mongoose = require('mongoose')

const chart90dSchema = mongoose.Schema(
    {
        name: { type: "String", default: "chart90d" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const Chart90d = mongoose.model('Chart90d', chart90dSchema)

module.exports = Chart90d