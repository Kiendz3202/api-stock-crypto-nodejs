const mongoose = require('mongoose');

const vibInterestRateSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			default: 'Ngân hàng Thương mại Cổ phần Quốc tế Việt Nam',
		},
		symbol: { type: 'String', default: 'VIB' },
		timeUpdate: { type: 'String' },

		under1monthfrom10tounder300: { type: 'String' },
		month1from10tounder300: { type: 'String' },
		month2from10tounder300: { type: 'String' },
		month345from10tounder300: { type: 'String' },
		month6from10tounder300: { type: 'String' },
		month7from10tounder300: { type: 'String' },
		month8from10tounder300: { type: 'String' },
		month9from10tounder300: { type: 'String' },
		month10from10tounder300: { type: 'String' },
		month11from10tounder300: { type: 'String' },
		month1213from10tounder300: { type: 'String' },
		month15from10tounder300: { type: 'String' },
		month18from10tounder300: { type: 'String' },
		month24from10tounder300: { type: 'String' },
		month36from10tounder300: { type: 'String' },

		under1monthfrom300tounder3000: { type: 'String' },
		month1from300tounder3000: { type: 'String' },
		month2from300tounder3000: { type: 'String' },
		month345from300tounder3000: { type: 'String' },
		month6from300tounder3000: { type: 'String' },
		month7from300tounder3000: { type: 'String' },
		month8from300tounder3000: { type: 'String' },
		month9from300tounder3000: { type: 'String' },
		month10from300tounder3000: { type: 'String' },
		month11from300tounder3000: { type: 'String' },
		month1213from300tounder3000: { type: 'String' },
		month15from300tounder3000: { type: 'String' },
		month18from300tounder3000: { type: 'String' },
		month24from300tounder3000: { type: 'String' },
		month36from300tounder3000: { type: 'String' },

		under1monthupper3000: { type: 'String' },
		month1upper3000: { type: 'String' },
		month2upper3000: { type: 'String' },
		month345upper3000: { type: 'String' },
		month6upper3000: { type: 'String' },
		month7upper3000: { type: 'String' },
		month8upper3000: { type: 'String' },
		month9upper3000: { type: 'String' },
		month10upper3000: { type: 'String' },
		month11upper3000: { type: 'String' },
		month1213upper3000: { type: 'String' },
		month15upper3000: { type: 'String' },
		month18upper3000: { type: 'String' },
		month24upper3000: { type: 'String' },
		month36upper3000: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const VibInterestRate = mongoose.model(
	'VibInterestRate',
	vibInterestRateSchema
);
module.exports = VibInterestRate;
