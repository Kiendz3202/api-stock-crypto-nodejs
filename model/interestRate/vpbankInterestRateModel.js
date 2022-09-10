const mongoose = require('mongoose');

const vpbankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng',
		},
		symbol: { type: 'String', default: 'Vpbank' },
		timeUpdate: { type: 'String' },

		month1under300: { type: 'String' },
		month6under300: { type: 'String' },
		month12under300: { type: 'String' },
		month24under300: { type: 'String' },

		month1from300to3000: { type: 'String' },
		month6from300to3000: { type: 'String' },
		month12from300to3000: { type: 'String' },
		month24from300to3000: { type: 'String' },

		month1from3000to10000: { type: 'String' },
		month6from3000to10000: { type: 'String' },
		month12from3000to10000: { type: 'String' },
		month24from3000to10000: { type: 'String' },

		month1from10000to50000: { type: 'String' },
		month6from10000to50000: { type: 'String' },
		month12from10000to50000: { type: 'String' },
		month24from10000to50000: { type: 'String' },

		month1upper50000: { type: 'String' },
		month6upper50000: { type: 'String' },
		month12upper50000: { type: 'String' },
		month24upper50000: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const VpbankInterestRate = mongoose.model(
	'VpbankInterestRate',
	vpbankInterestRateSchema
);
module.exports = VpbankInterestRate;
