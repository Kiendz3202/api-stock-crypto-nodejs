const mongoose = require('mongoose')

const petrolimexSchema = mongoose.Schema(
    {
        name: { type: 'String', default: 'Petrolimex' },
        timeUpdate: { type: 'String' },
        ron95v_1: { type: 'String' },
        ron95v_2: { type: 'String' },
        ron95III_1: { type: 'String' },
        ron95III_2: { type: 'String' },
        ron92II_1: { type: 'String' },
        ron92II_2: { type: 'String' },
        do0001SV_1: { type: 'String' },
        do0001SV_2: { type: 'String' },
        do005SII_1: { type: 'String' },
        do005SII_2: { type: 'String' },
        dauhoa_1: { type: 'String' },
        dauhoa_2: { type: 'String' },
    },
    {
        timestamps: true
    }
)

const Petrolimex = mongoose.model('Petrolimex', petrolimexSchema)
module.exports = Petrolimex