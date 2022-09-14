const mongoose = require('mongoose');

const hnx30ChartSchema = mongoose.Schema(
	{
		symbol: { type: 'String' },
		t: [Number],
		price: [Number],
	},
	{
		timestamps: true,
	}
);

const Hnx30Chart = mongoose.model('Hnx30Chart', hnx30ChartSchema);
module.exports = Hnx30Chart;
