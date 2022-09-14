const mongoose = require('mongoose');

const sjcChartSchema = mongoose.Schema(
	{
		name: { type: 'String', default: 'SJC' },
		t: [Number],
		buy: [Number],
		sell: [Number],
	},
	{ timestamps: true }
);

const SjcChart = mongoose.model('SjcChart', sjcChartSchema);
module.exports = SjcChart;
