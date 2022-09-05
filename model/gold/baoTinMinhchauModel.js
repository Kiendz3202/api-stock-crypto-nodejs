const mongoose = require('mongoose')

const baoTinMinhChauSchema = mongoose.Schema(
    {
        name: { type: "String", default: "Bảo Tín Minh Châu" },
        location: { type: "String", default: "Hà Nội" },
        timeUpdate: { type: "String" },
        description: { type: "String", default: "Bảo Tín Minh Châu là một trong những công ty uy tín hàng đầu trong lĩnh vực kinh doanh và chế tác vàng bạc đá quý tại Việt Nam. Với hơn 30 năm phát triển, Bảo Tín Minh Châu đã có 3 cơ sở kinh doanh tại Hà Nội và trên 100 đại lý, điểm kinh doanh trên toàn quốc với hai loại sản phẩm chính là Vàng rồng Thăng Long và Vàng trang sức chất lượng cao. Tương ứng với 2 loại sản phẩm trên chúng tôi có 10 nhãn hàng. Đó là: Trang sức kim cương - Diamond the one, Trang sức thời trang cá tính - S Jewelry, Ngọc trai - Umi pearl, Đá ngọc quý - Heritage, Trang sức thời trang phong cách - Elle Cara Design, Nhẫn cầu hôn, nhẫn cưới - Eros Design, Trang sức vàng ta - Hoàng kim bảo, Ngọc cẩm thạch - Vạn niên ngọc, Kim cương tự nhiên phong cách - Forever One và Vàng rồng Thăng Long." },
        vangRongThangLong: {
            vangMiengVRTLBuy: { type: "String", default: "" },
            vangMiengVRTLSell: { type: "String", default: "" },
            nhanTronTronBuy: { type: "String", default: "" },
            nhanTronTronSell: { type: "String", default: "" }
        },
        quaMungVang: {
            quaMungBanViVangBuy: { type: "String", default: "" },
            quaMungBanViVangSell: { type: "String", default: "" }
        },
        vangSjc: {
            vangMiengSjcBuy: { type: "String", default: "" },
            vangMiengSjcSell: { type: "String", default: "" }
        },
        vangBTMC: {
            trangSucBangVangRongThangLong9999Buy: { type: "String", default: "" },
            trangSucBangVangRongThangLong9999Sell: { type: "String", default: "" },
            trangSucBangVangRongThangLong999Buy: { type: "String", default: "" },
            trangSucBangVangRongThangLong999Sell: { type: "String", default: "" },
        },
        vangHTBT: {
            vangHTBTBuy: { type: "String", default: "" },
            vangHTBTSell: { type: "String", default: "" }
        },
        vangThiTruong: {
            vangNguyenLieuBuy: { type: "String", default: "" },
            vangNguyenLieuSell: { type: "String", default: "" }
        }
    },
    {
        timestamps: true
    }
)

const BaoTinMinhChau = mongoose.model('BaoTinMinhChau', baoTinMinhChauSchema)
module.exports = BaoTinMinhChau