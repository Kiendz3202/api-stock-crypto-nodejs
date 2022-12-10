const mongoose = require('mongoose');

const hnx30DetailSchema = mongoose.Schema(
	{
		name: { type: 'String' },
		symbol: { type: 'String' },
		timeUpdate: { type: 'String' },
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

		priceChange52Week: { type: 'String' },
		averageVolume10Day: { type: 'String' },

		percentPriceChange1Week: { type: 'String' },
		percentPriceChange1Month: { type: 'String' },
		percentPriceChange3Month: { type: 'String' },
		percentPriceChange6Month: { type: 'String' },
		percentPriceChange1Year: { type: 'String' },

		priceChange1Week: { type: 'String' }, //cổ tức tiền mặt
		priceChange1Month: { type: 'String' }, // tỷ lệ cổ tức
		priceChange3Month: { type: 'String' },
		priceChange6Month: { type: 'String' },
		priceChange1Year: { type: 'String' },

		high52Week: { type: 'String' }, // F P/e
		low52Week: { type: 'String' }, //book value per share
		outstandingShare: { type: 'String' },
		freeFloat: { type: 'String' },
		pe: { type: 'String' },
		dilutionPE: { type: 'String' },
		pb: { type: 'String' },
		eps: { type: 'String' },
		dilutionEPS: { type: 'String' },
		bookValue: { type: 'String' },
		lastInterest: { type: 'String' },
		roe: { type: 'String' },
		companyInfo: { type: 'String', ref: 'Hnx30CompanyInfo' }, //populated
	},
	{
		timestamps: true,
	}
);

const Hnx30Detail = mongoose.model('Hnx30Detail', hnx30DetailSchema);
module.exports = Hnx30Detail;
