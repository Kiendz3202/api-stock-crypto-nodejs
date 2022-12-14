const mongoose = require('mongoose');

const hnxChartSchema = mongoose.Schema(
	{
		symbol: { type: 'String' },
		t: [Number],
		price: [Number],
	},
	{
		timestamps: true,
	}
);

const HnxChart = mongoose.model('HnxChart', hnxChartSchema);
module.exports = HnxChart;
