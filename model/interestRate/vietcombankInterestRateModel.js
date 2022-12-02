const mongoose = require('mongoose');

const vietcombankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam',
		},
		symbol: { type: 'String', default: 'Vietcombank' },
		timeUpdate: { type: 'String' },
		month1: { type: 'String' },
		month2: { type: 'String' },
		month3: { type: 'String' },
		month6: { type: 'String' },
		month9: { type: 'String' },
		month12: { type: 'String' },
		month24: { type: 'String' },
		month36: { type: 'String' },
		month48: { type: 'String' },
		month60: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const VietcombankInterestRate = mongoose.model(
	'VietcombankInterestRate',
	vietcombankInterestRateSchema
);
module.exports = VietcombankInterestRate;
