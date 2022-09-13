const mongoose = require('mongoose');

const vn30DetailSchema = mongoose.Schema(
	{
		name: { type: 'String' },
		symbol: { type: 'String' },
		reference: { type: 'String' },
		ceil: { type: 'String' },
		floor: { type: 'String' },
		currentPrice: { type: 'String' },
		change: { type: 'String' },
		changePercent: { type: 'String' },
		openPrice: { type: 'String' },
		high: { type: 'String' },
		low: { type: 'String' },
		turnOver: { type: 'String' },

		marketcap: { type: 'String' },
		overBought: { type: 'String' },
		overSold: { type: 'String' },
		high52Week: { type: 'String' },
		low52Week: { type: 'String' },
		turnOver52WeekAverage: { type: 'String' },
		foreignBuy: { type: 'String' },
		ownedRatio: { type: 'String' },
		dividendCast: { type: 'String' }, //cổ tức tiền mặt
		dividendYield: { type: 'String' }, // tỷ lệ cổ tức
		beta: { type: 'String' },
		eps: { type: 'String' },
		pe: { type: 'String' },
		fpe: { type: 'String' }, // F P/e
		bvps: { type: 'String' }, //book value per share
		pb: { type: 'String' },
		companyInfo: { type: 'String', ref: 'HnxInvestingDetail' },
	},
	{
		timestamps: true,
	}
);

const Vn30Detail = mongoose.model('Vn30Detail', vn30DetailSchema);
module.exports = Vn30Detail;
