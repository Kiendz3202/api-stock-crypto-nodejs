const mongoose = require('mongoose');

const vibInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Quốc tế Việt Nam',
		},
		symbol: { type: 'String', default: 'VIB' },
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

const VibInterestRate = mongoose.model(
	'VibInterestRate',
	vibInterestRateSchema
);
module.exports = VibInterestRate;
