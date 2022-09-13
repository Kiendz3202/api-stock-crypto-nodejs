const mongoose = require('mongoose');

const allInvestingSchema = mongoose.Schema(
	{
		id: { type: 'String' },
		name: { type: 'String', default: '' },
		// last: { type: "String", default: "" },
		// change: { type: "String", default: "" },
		// changePercent: { type: "String", default: "" },
		// high: { type: "String", default: "" },
		// low: { type: "String", default: "" },
		// turnOver: { type: "String", default: "" },
		// time: { type: "String", default: "" },
		hrefDetail: { type: 'String', default: '' },
	},
	{
		timestamps: true,
	}
);

const AllInvesting = mongoose.model('AllInvesting', allInvestingSchema);
module.exports = AllInvesting;
