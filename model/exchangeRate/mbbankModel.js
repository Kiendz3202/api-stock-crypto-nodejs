const mongoose = require('mongoose');

const mbbankSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Quân đội',
		},
		symbol: { type: 'String', default: 'MBbank' },
		timeUpdate: { type: 'String' },

		usdBuyCast: { type: 'String' },
		usdBuyTransfer: { type: 'String' },
		usdSell: { type: 'String' },

		eurBuyCast: { type: 'String' },
		eurBuyTransfer: { type: 'String' },
		eurSell: { type: 'String' },

		gbpBuyCast: { type: 'String' },
		gbpBuyTransfer: { type: 'String' },
		gbpSell: { type: 'String' },

		jpyBuyCast: { type: 'String' },
		jpyBuyTransfer: { type: 'String' },
		jpySell: { type: 'String' },

		hkdBuyCast: { type: 'String' },
		hkdBuyTransfer: { type: 'String' },
		hkdSell: { type: 'String' },

		cnyBuyCast: { type: 'String' },
		cnyBuyTransfer: { type: 'String' },
		cnySell: { type: 'String' },

		audBuyCast: { type: 'String' },
		audBuyTransfer: { type: 'String' },
		audSell: { type: 'String' },

		nzdBuyCast: { type: 'String' },
		nzdBuyTransfer: { type: 'String' },
		nzdSell: { type: 'String' },

		cadBuyCast: { type: 'String' },
		cadBuyTransfer: { type: 'String' },
		cadSell: { type: 'String' },

		sgdBuyCast: { type: 'String' },
		sgdBuyTransfer: { type: 'String' },
		sgdSell: { type: 'String' },

		thbBuyCast: { type: 'String' },
		thbBuyTransfer: { type: 'String' },
		thbSell: { type: 'String' },

		chfBuyCast: { type: 'String' },
		chfBuyTransfer: { type: 'String' },
		chfSell: { type: 'String' },

		krwBuyCast: { type: 'String' },
		krwBuyTransfer: { type: 'String' },
		krwSell: { type: 'String' },

		lakBuyCast: { type: 'String' },
		lakBuyTransfer: { type: 'String' },
		lakSell: { type: 'String' },

		khrBuyCast: { type: 'String' },
		khrBuyTransfer: { type: 'String' },
		khrSell: { type: 'String' },

		sekBuyCast: { type: 'String' },
		sekBuyTransfer: { type: 'String' },
		sekSell: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const Mbbank = mongoose.model('Mbbank ', mbbankSchema);
module.exports = Mbbank;
