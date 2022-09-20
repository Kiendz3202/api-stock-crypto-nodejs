const mongoose = require('mongoose');

const coinChartSchema = mongoose.Schema(
	{
		symbol: { type: 'String' },
		t: [Number],
		price: [Number],
	},
	{
		timestamps: true,
	}
);

const CoinChart = mongoose.model('CoinChart', coinChartSchema);
module.exports = CoinChart;
