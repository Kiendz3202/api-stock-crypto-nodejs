const mongoose = require('mongoose');

const tpbankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Tiên Phong',
		},
		symbol: { type: 'String', default: 'Tpbank' },
		timeUpdate: { type: 'String' },
		month1Offline: { type: 'String' },
		month3Offline: { type: 'String' },
		month6Offline: { type: 'String' },
		month12Offline: { type: 'String' },
		month18Offline: { type: 'String' },
		month24Offline: { type: 'String' },
		month36Offline: { type: 'String' },

		month1Online: { type: 'String' },
		month3Online: { type: 'String' },
		month6Online: { type: 'String' },
		month12Online: { type: 'String' },
		month18Online: { type: 'String' },
		month24Online: { type: 'String' },
		month36Online: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const TpbankInterestRate = mongoose.model(
	'TpbankInterestRate',
	tpbankInterestRateSchema
);
module.exports = TpbankInterestRate;
