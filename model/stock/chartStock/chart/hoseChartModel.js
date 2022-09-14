const mongoose = require('mongoose');

const hoseChartSchema = mongoose.Schema(
	{
		symbol: { type: 'String' },
		t: [Number],
		price: [Number],
	},
	{
		timestamps: true,
	}
);

const HoseChart = mongoose.model('HoseChart', hoseChartSchema);
module.exports = HoseChart;
