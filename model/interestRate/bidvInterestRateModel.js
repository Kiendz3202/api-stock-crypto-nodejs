const mongoose = require('mongoose');

const bidvInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default:
				'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam',
		},
		symbol: { type: 'String', default: 'Bidv' },
		timeUpdate: { type: 'String' },
		khongkyhan: { type: 'String' },
		month1: { type: 'String' },
		month2: { type: 'String' },
		month3: { type: 'String' },
		month5: { type: 'String' },
		month6: { type: 'String' },
		month9: { type: 'String' },
		month12: { type: 'String' },
		month13: { type: 'String' },
		month15: { type: 'String' },
		month18: { type: 'String' },
		month24: { type: 'String' },
		month36: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const BidvInterestRate = mongoose.model(
	'BidvInterestRate',
	bidvInterestRateSchema
);
module.exports = BidvInterestRate;
