const mongoose = require('mongoose')

const dojiSchema = mongoose.Schema(
    {
        name: { type: "String", default: "DOJI" },
        // location: { type: "String" },

        sjcHNBuy: { type: "String" },
        sjcHNSell: { type: "String" },
        AVPLHNBuy: { type: "String" },
        AVPLHNSell: { type: "String" },
        nhanHTVHNBuy: { type: "String" },
        nhanHTVHNSell: { type: "String" },
        KTTKimGiapHNBuy: { type: "String" },
        KTTKimGiapHNSell: { type: "String" },
        phiSjcHNBuy: { type: "String" },
        phiSjcHNSell: { type: "String" },
        nuTrang9999HNBuy: { type: "String" },
        nuTrang9999HNSell: { type: "String" },
        nuTrang999HNBuy: { type: "String" },
        nuTrang999HNSell: { type: "String" },
        nuTrang99HNBuy: { type: "String" },
        nuTrang99HNSell: { type: "String" },
        nuTrang18kHNBuy: { type: "String" },
        nuTrang18kHNSell: { type: "String" },
        nuTrang14kHNBuy: { type: "String" },
        nuTrang14kHNSell: { type: "String" },
        nuTrang10kHNBuy: { type: "String" },
        nuTrang10kHNSell: { type: "String" },

        sjcHCMBuy: { type: "String" },
        sjcHCMSell: { type: "String" },
        AVPLHCMBuy: { type: "String" },
        AVPLHCMSell: { type: "String" },
        KNTKTTKimGiapHCMBuy: { type: "String" },
        KNTKTTKimGiapHCMSell: { type: "String" },
        nhanHTVHCMBuy: { type: "String" },
        nhanHTVHCMSell: { type: "String" },
        nuTrang9999HCMBuy: { type: "String" },
        nuTrang9999HCMSell: { type: "String" },
        nuTrang999HCMBuy: { type: "String" },
        nuTrang999HCMSell: { type: "String" },
        nuTrang99HCMBuy: { type: "String" },
        nuTrang99HCMSell: { type: "String" },
        nuTrang75HCMBuy: { type: "String" },
        nuTrang75HCMSell: { type: "String" },

        sjcDNBuy: { type: "String" },
        sjcDNSell: { type: "String" },
        AVPLDNBuy: { type: "String" },
        AVPLDNSell: { type: "String" },
        KNTKTTKimGiapDNBuy: { type: "String" },
        KNTKTTKimGiapDNSell: { type: "String" },
        nhanHTVDNBuy: { type: "String" },
        nhanHTVDNSell: { type: "String" },
        nuTrang9999DNBuy: { type: "String" },
        nuTrang9999DNSell: { type: "String" },
        nuTrang75DNBuy: { type: "String" },
        nuTrang75DNSell: { type: "String" },
        nuTrang68DNBuy: { type: "String" },
        nuTrang68DNSell: { type: "String" },
        nuTrang58_3DNBuy: { type: "String" },
        nuTrang58_3DNSell: { type: "String" },
    },
    {
        timestamps: true
    }
)

const Doji = mongoose.model('Doji', dojiSchema)
module.exports = Doji