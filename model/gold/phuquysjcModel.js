const mongoose = require('mongoose');

const phuQuySjcSchema = mongoose.Schema(
	{
		name: { type: 'String', default: 'Phú Quý SJC' },
		location: { type: 'String', default: 'Hà Nội' },
		timeUpdate: { type: 'String' },
		description: {
			type: 'String',
			default:
				'Tập đoàn Phú Quý được thành lập từ năm 2003 đến nay đã hơn một thập kỷ. Với phương châm kinh doanh trọng chữ tín, luôn đảm bảo tối đa lợi ích của khách hàng, tập đoàn Phú Quý đã nhanh chóng có chỗ đứng vững chắc trên thị trường. Lĩnh vực hoạt động kinh doanh chính của tập đoàn là sản xuất và phân phối sản phẩm Vàng bạc, trang sức, kim cương. Không những tập trung chủ đạo vào các lĩnh vực kinh doanh phân phối và bán lẻ Vàng miếng, vàng 9999, Phú Quý còn chú trọng đầu tư và phát triển các sản phẩm Trang sức, Kim cương, nhẫn cưới, luôn cập nhật các xu hướng mới nhất, mẫu mã sản phẩm đa dạng và phong phú. Đặc biệt, Phú Quý không ngừng đầu tư trang thiết bị và công nghệ hiện đại để cho ra đời các sản phẩm với thiết kế độc đáo, tinh xảo, chất lượng đạt tiêu chuẩn quốc tế, đáp ứng tối đa nhu cầu ngày càng cao của khách hàng. Các sản phẩm thiết kế độc quyền của Phú Quý như nhẫn tròn trơn vàng 999.9, bộ Lộc 12 Con Giáp, không những được khách hàng lựa chọn và tin dùng trong nhiều năm qua, mà còn thể hiện một bước tiến mới trong việc khẳng định thương hiệu uy tín.',
		},
		sjcBuy: { type: 'String' },
		sjnBuy: { type: 'String' },
		npqBuy: { type: 'String' },
		cngBuy: { type: 'String' },
		vang24kBuy: { type: 'String' },
		vang999Buy: { type: 'String' },
		vang099Buy: { type: 'String' },
		v99Buy: { type: 'String' },
		v999Buy: { type: 'String' },
		v9999Buy: { type: 'String' },

		sjcSell: { type: 'String' },
		sjnSell: { type: 'String' },
		npqSell: { type: 'String' },
		cngSell: { type: 'String' },
		vang24kSell: { type: 'String' },
		vang999Sell: { type: 'String' },
		vang099Sell: { type: 'String' },
		v99Sell: { type: 'String' },
		v999Sell: { type: 'String' },
		v9999Sell: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const PhuQuySjc = mongoose.model('PhuQuySjc', phuQuySjcSchema);
module.exports = PhuQuySjc;
