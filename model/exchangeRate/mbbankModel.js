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
		usdSellCast: { type: 'String' },
		usdSellTransfer: { type: 'String' },

		eurBuyCast: { type: 'String' },
		eurBuyTransfer: { type: 'String' },
		eurSellCast: { type: 'String' },
		eurSellTransfer: { type: 'String' },

		gbpBuyCast: { type: 'String' },
		gbpBuyTransfer: { type: 'String' },
		gbpSellCast: { type: 'String' },
		gbpSellTransfer: { type: 'String' },

		jpyBuyCast: { type: 'String' },
		jpyBuyTransfer: { type: 'String' },
		jpySellCast: { type: 'String' },
		jpySellTransfer: { type: 'String' },

		hkdBuyCast: { type: 'String' },
		hkdBuyTransfer: { type: 'String' },
		hkdSellCast: { type: 'String' },
		hkdSellTransfer: { type: 'String' },

		cnyBuyCast: { type: 'String' },
		cnyBuyTransfer: { type: 'String' },
		cnySellCast: { type: 'String' },
		cnySellTransfer: { type: 'String' },

		audBuyCast: { type: 'String' },
		audBuyTransfer: { type: 'String' },
		audSellCast: { type: 'String' },
		audSellTransfer: { type: 'String' },

		nzdBuyCast: { type: 'String' },
		nzdBuyTransfer: { type: 'String' },
		nzdSellCast: { type: 'String' },
		nzdSellTransfer: { type: 'String' },

		cadBuyCast: { type: 'String' },
		cadBuyTransfer: { type: 'String' },
		cadSellCast: { type: 'String' },
		cadSellTransfer: { type: 'String' },

		sgdBuyCast: { type: 'String' },
		sgdBuyTransfer: { type: 'String' },
		sgdSellCast: { type: 'String' },
		sgdSellTransfer: { type: 'String' },

		thbBuyCast: { type: 'String' },
		thbBuyTransfer: { type: 'String' },
		thbSellCast: { type: 'String' },
		thbSellTransfer: { type: 'String' },

		chfBuyCast: { type: 'String' },
		chfBuyTransfer: { type: 'String' },
		chfSellCast: { type: 'String' },
		chfSellTransfer: { type: 'String' },

		krwBuyCast: { type: 'String' },
		krwBuyTransfer: { type: 'String' },
		krwSellCast: { type: 'String' },
		krwSellTransfer: { type: 'String' },

		lakBuyCast: { type: 'String' },
		lakBuyTransfer: { type: 'String' },
		lakSellCast: { type: 'String' },
		lakSellTransfer: { type: 'String' },

		khrBuyCast: { type: 'String' },
		khrBuyTransfer: { type: 'String' },
		khrSellCast: { type: 'String' },
		khrSellTransfer: { type: 'String' },

		sekBuyCast: { type: 'String' },
		sekBuyTransfer: { type: 'String' },
		sekSellCast: { type: 'String' },
		sekSellTransfer: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const Mbbank = mongoose.model('Mbbank ', mbbankSchema);
module.exports = Mbbank;
