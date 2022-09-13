const mongoose = require('mongoose');

// const dataset = mongoose.Schema({
//     one: [Number],
//     two: [Number]
// })

const allReportChartSchema = mongoose.Schema(
	{
		id: String,
		symbol: String,
		interval: [Number],
		datasets: {},
	},
	{
		timestamps: true,
	}
);

const AllReportChart = mongoose.model('AllReportChart', allReportChartSchema);
module.exports = AllReportChart;
