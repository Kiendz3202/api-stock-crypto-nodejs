const mongoose = require('mongoose');

const vn30ChartSchema = mongoose.Schema(
	{
		symbol: { type: 'String' },
		t: [Number],
		price: [Number],
	},
	{
		timestamps: true,
	}
);

const Vn30Chart = mongoose.model('Vn30Chart', vn30ChartSchema);
module.exports = Vn30Chart;
