const mongoose = require('mongoose');

const mbbankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Quân đội',
		},
		symbol: { type: 'String', default: 'Mbbank' },
		timeUpdate: { type: 'String' },
		khongkyhan: { type: 'String' },
		week1: { type: 'String' },
		week2: { type: 'String' },
		week3: { type: 'String' },
		month1: { type: 'String' },
		month2: { type: 'String' },
		month3: { type: 'String' },
		month4: { type: 'String' },
		month5: { type: 'String' },
		month6: { type: 'String' },
		month7: { type: 'String' },
		month8: { type: 'String' },
		month9: { type: 'String' },
		month10: { type: 'String' },
		month11: { type: 'String' },
		month12: { type: 'String' },
		month13: { type: 'String' },
		month15: { type: 'String' },
		month18: { type: 'String' },
		month24: { type: 'String' },
		month36: { type: 'String' },
		month48: { type: 'String' },
		month60: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const MbbankInterestRate = mongoose.model(
	'MbbankInterestRate',
	mbbankInterestRateSchema
);
module.exports = MbbankInterestRate;
