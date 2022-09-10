const mongoose = require('mongoose')

const sjcSchema = mongoose.Schema(
    {
        name: { type: "String", default: "SJC" },
        timeUpdate: { type: "String" },
        sjc1l10lBuy: { type: "String" },
        sjc5cBuy: { type: "String" },
        sjc2c1c5phanBuy: { type: "String" },
        nhansjc99_991chi2chi5chiBuy: { type: "String" },
        nhansjc99_99_0_5chiBuy: { type: "String" },
        nutrang99_99percentBuy: { type: "String" },
        nutrang99percentBuy: { type: "String" },
        nutrang75percentBuy: { type: "String" },
        nutrang58_3percentBuy: { type: "String" },
        nutrang41_7percentBuy: { type: "String" },

        sjc1l10lSell: { type: "String" },
        sjc5cSell: { type: "String" },
        sjc2c1c5phanSell: { type: "String" },
        nhansjc99_991chi2chi5chiSell: { type: "String" },
        nhansjc99_99_0_5chiSell: { type: "String" },
        nutrang99_99percentSell: { type: "String" },
        nutrang99percentSell: { type: "String" },
        nutrang75percentSell: { type: "String" },
        nutrang58_3percentSell: { type: "String" },
        nutrang41_7percentSell: { type: "String" },

        sjc1l10lHanoiBuy: { type: "String" },
        sjc1l10lHaNoiSell: { type: "String" },

        sjc1l10lDaNangBuy: { type: "String" },
        sjc1l10lDaNangSell: { type: "String" },

        sjc1l10lNhatrangBuy: { type: "String" },
        sjc1l10lNhatrangSell: { type: "String" },

        sjc1l10lCaMauBuy: { type: "String" },
        sjc1l10lCaMauSell: { type: "String" },

        sjc1l10lHueBuy: { type: "String" },
        sjc1l10lHueSell: { type: "String" },

        sjc1l10lBinhPhuocBuy: { type: "String" },
        sjc1l10lBinhPhuocSell: { type: "String" },

        sjc1l10lBienHoaBuy: { type: "String" },
        sjc1l10lBienHoaSell: { type: "String" },

        sjc1l10lMientayBuy: { type: "String" },
        sjc1l10lMientaySell: { type: "String" },

        sjc1l10lQuangNgaiBuy: { type: "String" },
        sjc1l10lQuangNgaiSell: { type: "String" },

        sjc1l10lLongXuyenBuy: { type: "String" },
        sjc1l10lLongXuyenSell: { type: "String" },

        sjc1l10lBacLieuBuy: { type: "String" },
        sjc1l10lBacLieuSell: { type: "String" },

        sjc1l10lQuyNhonBuy: { type: "String" },
        sjc1l10lQuyNhonSell: { type: "String" },

        sjc1l10lPhanRangBuy: { type: "String" },
        sjc1l10lPhanRangSell: { type: "String" },

        sjc1l10lHaLongBuy: { type: "String" },
        sjc1l10lHaLongSell: { type: "String" },

        sjc1l10lQuangNamBuy: { type: "String" },
        sjc1l10lQuangNamSell: { type: "String" },
    },
    {
        timestamps: true
    }
)

const Sjc = mongoose.model('Sjc', sjcSchema)

module.exports = Sjc