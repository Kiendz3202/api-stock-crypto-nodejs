const mongoose = require('mongoose');

const scbInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Sài Gòn',
		},
		symbol: { type: 'String', default: 'SCB' },
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

const ScbInterestRate = mongoose.model(
	'ScbInterestRate',
	scbInterestRateSchema
);
module.exports = ScbInterestRate;
