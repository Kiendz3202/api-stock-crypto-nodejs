const mongoose = require('mongoose');

const agribankbankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
		},
		symbol: { type: 'String', default: 'Agribank' },
		timeUpdate: { type: 'String' },
		khongkyhanPersonal: { type: 'String' },
		month1Personal: { type: 'String' },
		month2Personal: { type: 'String' },
		month3Personal: { type: 'String' },
		month4Personal: { type: 'String' },
		month5Personal: { type: 'String' },
		month6Personal: { type: 'String' },
		month7Personal: { type: 'String' },
		month8Personal: { type: 'String' },
		month9Personal: { type: 'String' },
		month10Personal: { type: 'String' },
		month11Personal: { type: 'String' },
		month12Personal: { type: 'String' },
		month13Personal: { type: 'String' },
		month15Personal: { type: 'String' },
		month18Personal: { type: 'String' },
		month24Personal: { type: 'String' },

		khongkyhanBusiness: { type: 'String' },
		month1Business: { type: 'String' },
		month2Business: { type: 'String' },
		month3Business: { type: 'String' },
		month4Business: { type: 'String' },
		month5Business: { type: 'String' },
		month6Business: { type: 'String' },
		month7Business: { type: 'String' },
		month8Business: { type: 'String' },
		month9Business: { type: 'String' },
		month10Business: { type: 'String' },
		month11Business: { type: 'String' },
		month12Business: { type: 'String' },
		month13Business: { type: 'String' },
		month15Business: { type: 'String' },
		month18Business: { type: 'String' },
		month24Business: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const AgribankbankInterestRate = mongoose.model(
	'AgribankbankInterestRate',
	agribankbankInterestRateSchema
);
module.exports = AgribankbankInterestRate;
