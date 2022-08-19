const mongoose = require('mongoose')

const chart7dSchema = mongoose.Schema(
    {
        name: { type: "String", default: "chart7d" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const Chart7d = mongoose.model('Chart7d', chart7dSchema)

module.exports = Chart7d