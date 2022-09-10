const mongoose = require('mongoose');

const abBankSchema = mongoose.Schema(
	{
		name: { type: 'String', default: 'Ngân hàng TMCP An Bình' },
		symbol: { type: 'String', default: 'ABBank' },
		timeUpdate: { type: 'String' },

		usdBuyCast: { type: 'String' },
		usdSellCast: { type: 'String' },
		usdBuyTransfer: { type: 'String' },
		usdSellTransfer: { type: 'String' },

		eurBuyCast: { type: 'String' },
		eurSellCast: { type: 'String' },
		eurBuyTransfer: { type: 'String' },
		eurSellTransfer: { type: 'String' },

		audBuyCast: { type: 'String' },
		audSellCast: { type: 'String' },
		audBuyTransfer: { type: 'String' },
		audSellTransfer: { type: 'String' },

		cadBuyCast: { type: 'String' },
		cadSellCast: { type: 'String' },
		cadBuyTransfer: { type: 'String' },
		cadSellTransfer: { type: 'String' },

		chfBuyCast: { type: 'String' },
		chfSellCast: { type: 'String' },
		chfBuyTransfer: { type: 'String' },
		chfSellTransfer: { type: 'String' },

		gbpBuyCast: { type: 'String' },
		gbpSellCast: { type: 'String' },
		gbpBuyTransfer: { type: 'String' },
		gbpSellTransfer: { type: 'String' },

		hkdBuyCast: { type: 'String' },
		hkdSellCast: { type: 'String' },
		hkdBuyTransfer: { type: 'String' },
		hkdSellTransfer: { type: 'String' },

		jpyBuyCast: { type: 'String' },
		jpySellCast: { type: 'String' },
		jpyBuyTransfer: { type: 'String' },
		jpySellTransfer: { type: 'String' },

		krwBuyCast: { type: 'String' },
		krwSellCast: { type: 'String' },
		krwBuyTransfer: { type: 'String' },
		krwSellTransfer: { type: 'String' },

		nzdBuyCast: { type: 'String' },
		nzdSellCast: { type: 'String' },
		nzdBuyTransfer: { type: 'String' },
		nzdSellTransfer: { type: 'String' },

		sgdBuyCast: { type: 'String' },
		sgdSellCast: { type: 'String' },
		sgdBuyTransfer: { type: 'String' },
		sgdSellTransfer: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const AbBank = mongoose.model('AbBank', abBankSchema);
module.exports = AbBank;
