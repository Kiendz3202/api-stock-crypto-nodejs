const mongoose = require('mongoose');

const mbbankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Quân đội',
		},
		symbol: { type: 'String', default: 'MB' },
		timeUpdate: { type: 'String' },
		month1: {
			type: 'String',
		},
		month3: {
			type: 'String',
		},
		month6: {
			type: 'String',
		},
		month9: {
			type: 'String',
		},
		month12: {
			type: 'String',
		},
		month18: {
			type: 'String',
		},
		month24: {
			type: 'String',
		},
		month36: {
			type: 'String',
		},
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
