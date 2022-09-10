const mongoose = require('mongoose');

const vietinbankInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam',
		},
		symbol: { type: 'String', default: 'VietinBank' },
		timeUpdate: { type: 'String' },
		khongkyhan: { type: 'String' },
		under1month: { type: 'String' },
		from1to2month: { type: 'String' },
		from2to3month: { type: 'String' },
		from3to4month: { type: 'String' },
		from4to5month: { type: 'String' },
		from5to6month: { type: 'String' },
		from6to7month: { type: 'String' },
		from7to8month: { type: 'String' },
		from8to9month: { type: 'String' },
		from9to10month: { type: 'String' },
		from10to11month: { type: 'String' },
		from11to12month: { type: 'String' },
		month12: { type: 'String' },
		from12to18month: { type: 'String' },
		from18to24month: { type: 'String' },
		from24to36month: { type: 'String' },
		month36: { type: 'String' },
		upper36month: { type: 'String' },

		khongkyhanBusiness: { type: 'String' },
		under1monthBusiness: { type: 'String' },
		from1to2monthBusiness: { type: 'String' },
		from2to3monthBusiness: { type: 'String' },
		from3to4monthBusiness: { type: 'String' },
		from4to5monthBusiness: { type: 'String' },
		from5to6monthBusiness: { type: 'String' },
		from6to7monthBusiness: { type: 'String' },
		from7to8monthBusiness: { type: 'String' },
		from8to9monthBusiness: { type: 'String' },
		from9to10monthBusiness: { type: 'String' },
		from10to11monthBusiness: { type: 'String' },
		from11to12monthBusiness: { type: 'String' },
		month12Business: { type: 'String' },
		from12to18monthBusiness: { type: 'String' },
		from18to24monthBusiness: { type: 'String' },
		from24to36monthBusiness: { type: 'String' },
		month36Business: { type: 'String' },
		upper36monthBusiness: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const VietinbankInterestRate = mongoose.model(
	'VietinbankInterestRate',
	vietinbankInterestRateSchema
);
module.exports = VietinbankInterestRate;
