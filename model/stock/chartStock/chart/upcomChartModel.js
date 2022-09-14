const mongoose = require('mongoose');

const upcomChartSchema = mongoose.Schema(
	{
		symbol: { type: 'String' },
		t: [Number],
		price: [Number],
	},
	{
		timestamps: true,
	}
);

const UpcomChart = mongoose.model('UpcomChart', upcomChartSchema);
module.exports = UpcomChart;
