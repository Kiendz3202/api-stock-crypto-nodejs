const mongoose = require('mongoose');

const petrolimexSchema = mongoose.Schema(
	{
		name: { type: 'String', default: 'Petrolimex' },
		description: {
			type: 'String',
			default:
				'Tập đoàn Xăng dầu Việt Nam (tên viết tắt là Petrolimex) hiện nay được hình thành từ việc cổ phần hóa và cấu trúc lại Tổng công ty Xăng dầu Việt Nam. Lĩnh vực kinh doanh chính của Petrolimex là xuất nhập khẩu và kinh doanh xăng dầu, lọc - hóa dầu, đầu tư vốn vào các doanh nghiệp khác để kinh doanh các ngành nghề mà Petrolimex đang kinh doanh và các ngành nghề kinh doanh khác theo quy định của pháp luật.',
		},
		timeUpdate: { type: 'String' },
		ron95v_1: { type: 'String' },
		ron95v_2: { type: 'String' },
		ron95III_1: { type: 'String' },
		ron95III_2: { type: 'String' },
		ron92II_1: { type: 'String' },
		ron92II_2: { type: 'String' },
		do0001SV_1: { type: 'String' },
		do0001SV_2: { type: 'String' },
		do005SII_1: { type: 'String' },
		do005SII_2: { type: 'String' },
		dauhoa_1: { type: 'String' },
		dauhoa_2: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const Petrolimex = mongoose.model('Petrolimex', petrolimexSchema);
module.exports = Petrolimex;
