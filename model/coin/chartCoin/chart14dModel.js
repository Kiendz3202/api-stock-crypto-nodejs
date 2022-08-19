const mongoose = require('mongoose')

const chart14dSchema = mongoose.Schema(
    {
        name: { type: "String", default: "chart14d" },
        rank: { type: "Number" },
        data: [[]]
    },
    {
        timestamps: true
    }
)

const Chart14d = mongoose.model('Chart14d', chart14dSchema)

module.exports = Chart14d