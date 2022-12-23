### Brief API doc

-   Endpoints:

    -   Pre-endpoint: **baseURL = "http://66.42.58.72/api/v1"**

    -   Sign up:
        _POST baseURL/register_

    -   Login:
        _POST baseURL/login_

    -   Logout:
        _DELETE baseURL/logout_

    -   Create new refresh token:
        _POST baseURL/refresh-token_

    -   Get coins per page with pagination:
        _GET baseURL/coin/markets?per_page=25&page=1(xem lại cách trình bày)_

    -   Get coin detail:
        _GET baseURL/coin/detail/:nameId_

    -   Get chart coin detail:
        _GET baseURL/coin/chart/:nameId_

    -   Get exchange rate of agribank:
        _GET baseURL/exchangeRate/agribank_

    -   Get exchange rate of bidv:
        _GET baseURL/exchangeRate/bidv_

    -   Get exchange rate of mbbank:
        _GET baseURL/exchangeRate/mbbank_

    -   Get exchange rate of techcombank:
        _GET baseURL/exchangeRate/techcombank_

    -   Get exchange rate of vietcombank:
        _GET baseURL/exchangeRate/vietcombank_

    -   Get exchange rate of vietinbank:
        _GET baseURL/exchangeRate/vietinbank_

    -   Get interest rate of agribank:
        _GET baseURL/interestRate/agribank_

    -   Get interest rate of bidv:
        _GET baseURL/interestRate/bidv_

    -   Get interest rate of mbbank:
        _GET baseURL/interestRate/mbbank_

    -   Get interest rate of scb:
        _GET baseURL/interestRate/scb_

    -   Get interest rate of vib:
        _GET baseURL/interestRate/vib_

    -   Get interest rate of vietcombank:
        _GET baseURL/interestRate/vietcombank_

    -   Get interest rate of vietinbank:
        _GET baseURL/interestRate/vietinbank_

    -   Get price of sjc gold:
        _GET baseURL/gold/sjc_

    -   Get chart of sjc gold:
        _GET baseURL/gold/chart/sjc_

    -   Get price of gold bảo tín minh châu:
        _GET baseURL/gold/baotinminhchau_

    -   Get price of gold doji:
        _GET baseURL/gold/doji_

    -   Get price of gold pnj:
        _GET baseURL/gold/pnj_

    -   Get price of gold phú quý sjc:
        _GET baseURL/gold/phuquysjc_

    -   Get price of gold mi hồng:
        _GET baseURL/gold/mihong_

    -   Get price of petrolimex:
        _GET baseURL/petrol/petrolimex_

    -   Get stocks per page with pagination HNX30:
        _GET baseURL/stock/hnx30?per_page=25&page=1(xem lại cách trình bày)_

    -   Get stock detail HNX30:
        _GET baseURL/stock/hnx30/:symbol_

    -   Get chart stock detail HNX30:
        _GET baseURL/stock/hnx30/chart/:symbol_

    -   Get detail company info HNX30:
        _GET baseURL/stock/hnx30/company-info/:symbol(sửa lại controller)_

    -   Get stocks per page with pagination HNX:
        _GET baseURL/stock/hnx?per_page=25&page=1(xem lại cách trình bày)_

    -   Get stock detail HNX:
        _GET baseURL/stock/hnx/:symbol_

    -   Get chart stock detail HNX:
        _GET baseURL/stock/hnx/chart/:symbol_

    -   Get detail company info HNX:
        _GET baseURL/stock/hnx/company-info/:symbol(sửa lại controller)_

    -   Get stocks per page with pagination VN30:
        _GET baseURL/stock/vn30?per_page=25&page=1(xem lại cách trình bày)_

    -   Get stock detail VN30:
        _GET baseURL/stock/vn30/:symbol_

    -   Get chart stock detail VN30:
        _GET baseURL/stock/vn30/chart/:symbol_

    -   Get detail company info VN30:
        _GET baseURL/stock/vn30/company-info/:symbol(sửa lại controller)_

    -   Get stocks per page with pagination HOSE:
        _GET baseURL/stock/hose?per_page=25&page=1(xem lại cách trình bày)_

    -   Get stock detail HOSE:
        _GET baseURL/stock/hose/:symbol_

    -   Get chart stock detail HOSE:
        _GET baseURL/stock/hose/chart/:symbol_

    -   Get detail company info HOSE:
        _GET baseURL/stock/hose/company-info/:symbol(sửa lại controller)_

    -   Get stocks per page with pagination UPCOM:
        _GET baseURL/stock/upcom?per_page=25&page=1(xem lại cách trình bày)_

    -   Get stock detail UPCOM:
        _GET baseURL/stock/upcom/:symbol_

    -   Get chart stock detail UPCOM:
        _GET baseURL/stock/upcom/chart/:symbol_

    -   Get detail company info UPCOM:
        _GET baseURL/stock/upcom/company-info/:symbol(sửa lại controller)_

-   Content-Type: application/json

-   Authenication: Bear-Token

-   Common Error Code Table For Bad Request:

    -   500 - Internal Server Error
    -   400 - Bad request
    -   401 - Unauthorized
    -   403 - Forbiden
    -   404 - Not Found
    -   408 - Request timeout
    -   409 - conflict
    -   429 - Too many requests
    -   502 - bad gateway

    -   **Response bad request**

        ```
        {
            status: 'fail',
            code: int,
            message: "string",
        }

        ```

-   Detail for endpoint:

    -   **Signup**:

        -   POST baseURL/register
        -   Request Payload:

            ```
            {
                "username": "string", // required
                "pasword": "string",  // required
            }
            ```

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": {
                        "_id": "string",
                        "email": "string",
                    }
                }
                ```

            -   Fail:

                -   Status code: 409 - Email is already registered

    -   **Login**:

        -   POST baseURL/login
        -   Request payload:

            ```
            {
                "email": "string", //required
                "password": "string", //required
            }
            ```

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": {
                        "accessToken": "string",
                        "refreshtoken": "string",
                        "user": {
                            "_id": "string",
                            "email": "string"
                        }
                    }
                }
                ```

            -   Fail:
                -   Status code: 401, 404.

    -   **Logout(hoàn thành sau)**:

    -   **Create new refresh token**:

        -   POST baseURL/refresh-token
        -   Request payload:

            ```
            {
                "refreshtoken": "string"
            }
            ```

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": {
                        "accessToken": "string",
                        "refreshtoken": "string",
                    }
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get coins per page with pagination**:

        -   GET baseURL/coin/markets
        -   Query Params:
            -   per_page=:number with number is the number coins per page //required
            -   page=:number with number is the pagination of page // required
            -   Ex: baseURL/coin/markets?per_page=25&page=1
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": {
                        "coinList": [list of coin],
                        "pages": "int"
                    }
                }
                ```

            -   Fail:

                -   Status code: 400, 404

    -   **Get coin detail**:

        -   GET baseURL/coin/detail/:nameId
        -   Params: nameId is the nameId field of coin
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [object] // array has only one object which is coin info
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get chart coin detail**:

        -   GET baseURL/coin/chart/:nameId
        -   Params: nameId is the nameId field of coin
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "_id": "string",
                        "nameId": "string",
                        "symbol": "string",
                        "price": [number],
                        't': [number] //time
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get exchange rate of bank**:

        -   There are 6 banks(agribank, bidv, mbbank, techcombank, vietcombank, vietinbank)
        -   GET baseURL/exchangeRate/:bankname
        -   Ex: baseURL/exchangeRate/agribank
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "symbol": "Agribank",
                        "audBuyCast": "15490", //giá aud ngân hàng mua vào bằng tiền mặt
                        "audBuyTransfer": "15552", //giá aud ngân hàng mua vào bằng chuyển khoản
                        "audSell": "16141", //giá aud ngân hàng bán ra
                        "cadBuyCast": "17023",
                        "cadBuyTransfer": "17091",
                        "cadSell": "17499",
                        "chfBuyCast": "24986",
                        "chfBuyTransfer": "25086",
                        "chfSell": "25799",
                        "eurBuyCast": "24679",
                        "eurBuyTransfer": "24698",
                        "eurSell": "25780",
                        "gbpBuyCast": "28264",
                        "gbpBuyTransfer": "28435",
                        "gbpSell": "29131",
                        "hkdBuyCast": "2973",
                        "hkdBuyTransfer": "2985",
                        "hkdSell": "3079",
                        "jpyBuyCast": "169,01",
                        "jpyBuyTransfer": "169,19",
                        "jpySell": "176,11",
                        "krwBuyCast": "0",
                        "krwBuyTransfer": "1724",
                        "krwSell": "1883",
                        "name": "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam",
                        "nzdBuyCast": "0",
                        "nzdBuyTransfer": "14751",
                        "nzdSell": "15259",
                        "sgdBuyCast": "17111",
                        "sgdBuyTransfer": "17180",
                        "sgdSell": "17592",
                        "timeUpdate": "1671259478",
                        "usdBuyCast": "23420",
                        "usdBuyTransfer": "23440",
                        "usdSell": "23720"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get interest rate of agribank**:

        -   GET baseURL/interestRate/agribank
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "symbol": "Agribank",
                        "khongkyhanBusiness": "0.5", //lãi xuất ko kỳ hạn cho doanh nghiệp
                        "khongkyhanPersonal": "0.5", //lãi xuất ko kỳ hạn cho cá nhân
                        "month10Business": "5.8", // 10 tháng cho doanh nghiệp
                        "month10Personal": "6.1", // 10 tháng cho cá nhân
                        "month11Business": "5.8",
                        "month11Personal": "6.1",
                        "month12Business": "6.2",
                        "month12Personal": "7.4",
                        "month13Business": "6.2",
                        "month13Personal": "7.4",
                        "month15Business": "6.2",
                        "month15Personal": "7.4",
                        "month18Business": "6.2",
                        "month18Personal": "7.4",
                        "month1Business": "4.6",
                        "month1Personal": "4.9",
                        "month24Business": "6.2",
                        "month24Personal": "7.4",
                        "month2Business": "4.6",
                        "month2Personal": "4.9",
                        "month3Business": "5.1",
                        "month3Personal": "5.4",
                        "month4Business": "5.1",
                        "month4Personal": "5.4",
                        "month5Business": "5.1",
                        "month5Personal": "5.4",
                        "month6Business": "5.8",
                        "month6Personal": "6.1",
                        "month7Business": "5.8",
                        "month7Personal": "6.1",
                        "month8Business": "5.8",
                        "month8Personal": "6.1",
                        "month9Business": "5.8",
                        "month9Personal": "6.1",
                        "name": "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam",
                        "timeUpdate": "1671260534"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get interest rate of vietinbank**:

        -   GET baseURL/interestRate/vietinbank
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "symbol": "Vietinbank",
                        "from10to11month": "6.00", // từ tháng 10 đến dưới tháng 11 cho khách hàng cá nhân
                        "from10to11monthBusiness": "5.70", // từ tháng 10 đến dưới tháng 11 cho khách hàng doanh nghiệp
                        "from11to12month": "6.00",
                        "from11to12monthBusiness": "5.70",
                        "from12to18month": "7.40",
                        "from12to18monthBusiness": "6.20",
                        "from18to24month": "7.40",
                        "from18to24monthBusiness": "6.20",
                        "from1to2month": "4.90",
                        "from1to2monthBusiness": "4.60",
                        "from24to36month": "7.40",
                        "from24to36monthBusiness": "6.20",
                        "from2to3month": "4.90",
                        "from2to3monthBusiness": "4.60",
                        "from3to4month": "5.40",
                        "from3to4monthBusiness": "5.10",
                        "from4to5month": "5.40",
                        "from4to5monthBusiness": "5.10",
                        "from5to6month": "5.40",
                        "from5to6monthBusiness": "5.10",
                        "from6to7month": "6.00",
                        "from6to7monthBusiness": "5.70",
                        "from7to8month": "6.00",
                        "from7to8monthBusiness": "5.70",
                        "from8to9month": "6.00",
                        "from8to9monthBusiness": "5.70",
                        "from9to10month": "6.00",
                        "from9to10monthBusiness": "5.70",
                        "khongkyhan": "0.10",
                        "khongkyhanBusiness": "0.20",
                        "month12": "7.40",
                        "month12Business": "6.20",
                        "month36": "7.40",
                        "month36Business": "6.20",
                        "name": "Ngân hàng Thương mại cổ phần Công Thương Việt Nam",
                        "timeUpdate": "1671260524",
                        "under1month": "0.20", // dưới 1 tháng cho cá nhân
                        "under1monthBusiness": "0.20",
                        "upper36month": "7.40", // trên 36 tháng cho cá nhân
                        "upper36monthBusiness": "6.20"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get interest rate of vietcombank**:

        -   GET baseURL/interestRate/vietcombank
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "symbol": "Vietcombank",
                        "month1": "4.90",
                        "month12": "7.40",
                        "month2": "4.90",
                        "month24": "7.40",
                        "month3": "5.40",
                        "month36": "7.40",
                        "month48": "7.40",
                        "month6": "6",
                        "month60": "7.40",
                        "month9": "6",
                        "name": "Ngân hàng thương mại cổ phần Ngoại thương Việt Nam",
                        "timeUpdate": "1671260514"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get interest rate of bidv**:

        -   GET baseURL/interestRate/bidv
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "symbol": "Bidv",
                        "khongkyhan": "0.1",
                        "month1": "4.9",
                        "month12": "7.4",
                        "month13": "7.4",
                        "month15": "7.4",
                        "month18": "7.4",
                        "month2": "4.9",
                        "month24": "7.4",
                        "month3": "5.4",
                        "month36": "7.4",
                        "month5": "5.4",
                        "month6": "6.0",
                        "month9": "6.1",
                        "name": "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam",
                        "timeUpdate": "1671260544"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get interest rate of scb, mbbank, vib**:

        -   GET baseURL/interestRate/bidv
        -   GET baseURL/interestRate/mbbank
        -   GET baseURL/interestRate/vib
        -   Response field similar to others
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "symbol": "Bidv",
                        "khongkyhan": "0.1",
                        "month1": "4.9",
                        "month12": "7.4",
                        "month13": "7.4",
                        "month15": "7.4",
                        "month18": "7.4",
                        "month2": "4.9",
                        "month24": "7.4",
                        "month3": "5.4",
                        "month36": "7.4",
                        "month5": "5.4",
                        "month6": "6.0",
                        "month9": "6.1",
                        "name": "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam",
                        "timeUpdate": "1671260544"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get price of sjc gold**:

        -   page is crawled : https://webtygia.com/gia-vang-sjc.html

        -   GET baseURL/gold/sjc
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "name": "SJC",
                        "nhansjc99_991chi2chi5chiBuy": "52900000",
                        "nhansjc99_991chi2chi5chiSell": "53900000",
                        "nhansjc99_99_0_5chiBuy": "52900000",
                        "nhansjc99_99_0_5chiSell": "54000000",
                        "nutrang41_7percentBuy": " 20462000",
                        "nutrang41_7percentSell": "22462000",
                        "nutrang58_3percentBuy": "29344000",
                        "nutrang58_3percentSell": "31344000",
                        "nutrang75percentBuy": "38279000",
                        "nutrang75percentSell": "40279000",
                        "nutrang99_99percentBuy": "52700000",
                        "nutrang99_99percentSell": "53500000",
                        "nutrang99percentBuy": "51670000",
                        "nutrang99percentSell": "52970000",
                        "sjc1l10lBacLieuBuy": "66200000",
                        "sjc1l10lBacLieuSell": "67020000",
                        "sjc1l10lBienHoaBuy": "66200000",
                        "sjc1l10lBienHoaSell": "67000000",
                        "sjc1l10lBinhPhuocBuy": "66180000",
                        "sjc1l10lBinhPhuocSell": "67020000",
                        "sjc1l10lBuy": "66200000",
                        "sjc1l10lCaMauBuy": "66200000",
                        "sjc1l10lCaMauSell": "67020000",
                        "sjc1l10lDaNangBuy": "66200000",
                        "sjc1l10lDaNangSell": "67020000",
                        "sjc1l10lHaLongBuy": "66180000",
                        "sjc1l10lHaLongSell": "67020000",
                        "sjc1l10lHaNoiSell": "67020000",
                        "sjc1l10lHueBuy": "66170000",
                        "sjc1l10lHueSell": "67030000",
                        "sjc1l10lLongXuyenBuy": "66220000",
                        "sjc1l10lLongXuyenSell": "67050000",
                        "sjc1l10lPhanRangBuy": "66180000",
                        "sjc1l10lPhanRangSell": "66180000",
                        "sjc1l10lQuangNamBuy": "66180000",
                        "sjc1l10lQuangNamSell": "67020000",
                        "sjc1l10lQuangNgaiBuy": "66200000",
                        "sjc1l10lQuangNgaiSell": "67000000",
                        "sjc1l10lQuyNhonBuy": "66180000",
                        "sjc1l10lQuyNhonSell": "67020000",
                        "sjc1l10lSell": "66200000",
                        "timeUpdate": "1671260507"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get chart of sjc gold**:

        -   GET baseURL/gold/chart/sjc
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "name": "SJC",
                        "t":[number], //time
                        "buy": [number],
                        "sell": [number]
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get price of gold bảo tín minh châu**:

        -   page is crawled : https://webtygia.com/gia-vang-bao-tin-minh-chau.html

        -   GET baseURL/gold/baotinminhchau
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "vangRongThangLong": {
                        "nhanTronTronBuy": "52810000",
                        "nhanTronTronSell": "53660000",
                        "vangMiengVRTLBuy": "52810000",
                        "vangMiengVRTLSell": "53660000"
                    },
                    "quaMungVang": {
                        "quaMungBanViVangBuy": "52810000",
                        "quaMungBanViVangSell": "53660000"
                    },
                    "vangSjc": {
                        "vangMiengSjcBuy": "66120000",
                        "vangMiengSjcSell": "66930000"
                    },
                    "vangBTMC": {
                        "trangSucBangVangRongThangLong9999Buy": "52450000",
                        "trangSucBangVangRongThangLong9999Sell": "53450000",
                        "trangSucBangVangRongThangLong999Buy": "52350000",
                        "trangSucBangVangRongThangLong999Sell": "53350000"
                    },
                    "vangHTBT": {
                        "vangHTBTBuy": "52350000",
                        "vangHTBTSell": "0"
                    },
                    "vangThiTruong": {
                        "vangNguyenLieuBuy": "52100000",
                        "vangNguyenLieuSell": "0"
                    },
                    "name": "Bảo Tín Minh Châu",
                    "description": "string",
                    "location": "Hà Nội",
                    "timeUpdate": "1671259635"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get price of gold doji**:

        -   page is crawled : https://doji.vn/bang-gia-vang/

        -   GET baseURL/gold/doji
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [{
                        "name": "DOJI",
                        "AVPLDNBuy": "66000000",
                        "AVPLDNSell": "66950000",
                        "AVPLHCMBuy": "66100000",
                        "AVPLHCMSell": "67000000",
                        "AVPLHNBuy": "66000000",
                        "AVPLHNSell": "66900000",
                        "KNTKTTKimGiapDNBuy": "66000000",
                        "KNTKTTKimGiapDNSell": "66900000",
                        "KNTKTTKimGiapHCMBuy": "66000000",
                        "KNTKTTKimGiapHCMSell": "66900000",
                        "KTTKimGiapHNBuy": "66000000",
                        "KTTKimGiapHNSell": "66900000",
                        "nhanHTVDNBuy": "52700000",
                        "nhanHTVDNSell": "53550000",
                        "nhanHTVHCMBuy": "52700000",
                        "nhanHTVHCMSell": "53550000",
                        "nhanHTVHNBuy": "52700000",
                        "nhanHTVHNSell": "53550000",
                        "nuTrang10kHNBuy": "21750000",
                        "nuTrang10kHNSell": "22940000",
                        "nuTrang14kHNBuy": "29750000",
                        "nuTrang14kHNSell": "38460000",
                        "nuTrang18kHNBuy": "38750000",
                        "nuTrang18kHNSell": "52800000",
                        "nuTrang58_3DNBuy": "29750000",
                        "nuTrang58_3DNSell": "38460000",
                        "nuTrang68DNBuy": "35250000",
                        "nuTrang68DNSell": "45120000",
                        "nuTrang75DNBuy": "38750000",
                        "nuTrang75DNSell": "52800000",
                        "nuTrang75HCMBuy": "38710000",
                        "nuTrang75HCMSell": "40010000",
                        "nuTrang9999DNBuy": "52150000",
                        "nuTrang9999DNSell": "53250000",
                        "nuTrang9999HCMBuy": "52000000",
                        "nuTrang9999HCMSell": "53150000",
                        "nuTrang9999HNBuy": "52150000",
                        "nuTrang9999HNSell": "53250000",
                        "nuTrang999HCMBuy": "51900000",
                        "nuTrang999HCMSell": "53050000",
                        "nuTrang999HNBuy": "52050000",
                        "nuTrang999HNSell": "53150000",
                        "nuTrang99HCMBuy": "51350000",
                        "nuTrang99HCMSell": "52800000",
                        "nuTrang99HNBuy": "51350000",
                        "nuTrang99HNSell": "52800000",
                        "phiSjcHNBuy": "52370000",
                        "phiSjcHNSell": "52670000",
                        "sjcDNBuy": "66000000",
                        "sjcDNSell": "66950000",
                        "sjcHCMBuy": "66100000",
                        "sjcHCMSell": "67000000",
                        "sjcHNBuy": "66000000",
                        "sjcHNSell": "66900000",
                        "timeUpdate": "1671260480"
                    }]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get price of gold pnj**:

        -   page is crawled : https://www.pnj.com.vn/blog/gia-vang/

        -   GET baseURL/gold/pnj
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [
                        {
                        "location": "Hồ Chí Minh",
                        "name": "PNJ",
                        "nhantronpnjBuy": "53000000",
                        "nhantronpnjSell": "54000000",
                        "timeUpdate": "1671260490",
                        "vang24kBuy": "52500000",
                        "vang24kSell": "53300000",
                        "vang416Buy": "20920000",
                        "vang416Sell": "22320000",
                        "vang585Buy": "29930000",
                        "vang585Sell": "31330000",
                        "vang650Buy": "33400000",
                        "vang650Sell": "34800000",
                        "vang680Buy": "34990000",
                        "vang680Sell": "36390000",
                        "vang750Buy": "38730000",
                        "vang750Sell": "40130000",
                        "vang916Buy": "48420000",
                        "vang916Sell": "48920000",
                        "vangkimbaoBuy": "53000000",
                        "vangkimbaoSell": "54000000",
                        "vangmiengpnjBuy": "53000000",
                        "vangmiengpnjSell": "54100000",
                        "vangmiengsjcBuy": "53000000",
                        "vangmiengsjcSell": "54100000",
                        "vangphucloctaiBuy": "53000000",
                        "vangphucloctaiSell": "54100000"
                        },
                        {
                        "location": "Cần Thơ",
                        "name": "PNJ",
                        "nhantronpnjBuy": "53000000",
                        "nhantronpnjSell": "54000000",
                        "timeUpdate": "1671260493",
                        "vang24kBuy": "52500000",
                        "vang24kSell": "53300000",
                        "vang416Buy": "20920000",
                        "vang416Sell": "22320000",
                        "vang585Buy": "29930000",
                        "vang585Sell": "31330000",
                        "vang650Buy": "33400000",
                        "vang650Sell": "34800000",
                        "vang680Buy": "34990000",
                        "vang680Sell": "36390000",
                        "vang750Buy": "38730000",
                        "vang750Sell": "40130000",
                        "vang916Buy": "48420000",
                        "vang916Sell": "48920000",
                        "vangkimbaoBuy": "53000000",
                        "vangkimbaoSell": "54000000",
                        "vangmiengpnjBuy": "53000000",
                        "vangmiengpnjSell": "54100000",
                        "vangmiengsjcBuy": "53000000",
                        "vangmiengsjcSell": "54100000",
                        "vangphucloctaiBuy": "53000000",
                        "vangphucloctaiSell": "54100000"
                        },
                        {
                        "location": "Hà Nội",
                        "name": "PNJ",
                        "nhantronpnjBuy": "53000000",
                        "nhantronpnjSell": "54000000",
                        "timeUpdate": "1671260496",
                        "vang24kBuy": "52500000",
                        "vang24kSell": "53300000",
                        "vang416Buy": "20920000",
                        "vang416Sell": "22320000",
                        "vang585Buy": "29930000",
                        "vang585Sell": "31330000",
                        "vang650Buy": "33400000",
                        "vang650Sell": "34800000",
                        "vang680Buy": "34990000",
                        "vang680Sell": "36390000",
                        "vang750Buy": "38730000",
                        "vang750Sell": "40130000",
                        "vang916Buy": "48420000",
                        "vang916Sell": "48920000",
                        "vangkimbaoBuy": "53000000",
                        "vangkimbaoSell": "54000000",
                        "vangmiengpnjBuy": "53000000",
                        "vangmiengpnjSell": "54100000",
                        "vangmiengsjcBuy": "53000000",
                        "vangmiengsjcSell": "54100000",
                        "vangphucloctaiBuy": "53000000",
                        "vangphucloctaiSell": "54100000"
                        },
                        {
                        "location": "Đà Nẵng",
                        "name": "PNJ",
                        "nhantronpnjBuy": "53000000",
                        "nhantronpnjSell": "54000000",
                        "timeUpdate": "1671260499",
                        "vang24kBuy": "52500000",
                        "vang24kSell": "53300000",
                        "vang416Buy": "20920000",
                        "vang416Sell": "22320000",
                        "vang585Buy": "29930000",
                        "vang585Sell": "31330000",
                        "vang650Buy": "33400000",
                        "vang650Sell": "34800000",
                        "vang680Buy": "34990000",
                        "vang680Sell": "36390000",
                        "vang750Buy": "38730000",
                        "vang750Sell": "40130000",
                        "vang916Buy": "48420000",
                        "vang916Sell": "48920000",
                        "vangkimbaoBuy": "53000000",
                        "vangkimbaoSell": "54000000",
                        "vangmiengpnjBuy": "53000000",
                        "vangmiengpnjSell": "54100000",
                        "vangmiengsjcBuy": "53000000",
                        "vangmiengsjcSell": "54100000",
                        "vangphucloctaiBuy": "53000000",
                        "vangphucloctaiSell": "54100000"
                        },
                        {
                        "location": "Tây Nguyên",
                        "name": "PNJ",
                        "nhantronpnjBuy": "53000000",
                        "nhantronpnjSell": "54000000",
                        "timeUpdate": "1671260502",
                        "vang24kBuy": "52500000",
                        "vang24kSell": "53300000",
                        "vang416Buy": "20920000",
                        "vang416Sell": "22320000",
                        "vang585Buy": "29930000",
                        "vang585Sell": "31330000",
                        "vang650Buy": "33400000",
                        "vang650Sell": "34800000",
                        "vang680Buy": "34990000",
                        "vang680Sell": "36390000",
                        "vang750Buy": "38730000",
                        "vang750Sell": "40130000",
                        "vang916Buy": "48420000",
                        "vang916Sell": "48920000",
                        "vangkimbaoBuy": "53000000",
                        "vangkimbaoSell": "54000000",
                        "vangmiengpnjBuy": "53000000",
                        "vangmiengpnjSell": "54100000",
                        "vangmiengsjcBuy": "53000000",
                        "vangmiengsjcSell": "54100000",
                        "vangphucloctaiBuy": "53000000",
                        "vangphucloctaiSell": "54100000"
                        },
                        {
                        "location": "Đông Nam Bộ",
                        "name": "PNJ",
                        "nhantronpnjBuy": "53000000",
                        "nhantronpnjSell": "54000000",
                        "timeUpdate": "1671260505",
                        "vang24kBuy": "52500000",
                        "vang24kSell": "53300000",
                        "vang416Buy": "20920000",
                        "vang416Sell": "22320000",
                        "vang585Buy": "29930000",
                        "vang585Sell": "31330000",
                        "vang650Buy": "33400000",
                        "vang650Sell": "34800000",
                        "vang680Buy": "34990000",
                        "vang680Sell": "36390000",
                        "vang750Buy": "38730000",
                        "vang750Sell": "40130000",
                        "vang916Buy": "48420000",
                        "vang916Sell": "48920000",
                        "vangkimbaoBuy": "53000000",
                        "vangkimbaoSell": "54000000",
                        "vangmiengpnjBuy": "53000000",
                        "vangmiengpnjSell": "54100000",
                        "vangmiengsjcBuy": "53000000",
                        "vangmiengsjcSell": "54100000",
                        "vangphucloctaiBuy": "53000000",
                        "vangphucloctaiSell": "54100000"
                        }
                    ]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get price of gold phú quý sjc**:

        -   page is crawled : https://webtygia.com/gia-vang-phu-quy.html

        -   GET baseURL/gold/phuquysjc
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [
                        {
                            "name": "Phú Quý SJC",
                            "cngBuy": "53000000",
                            "cngSell": "53800000",
                            "description": "string",
                            "location": "Hà Nội",
                            "npqBuy": "52800000",
                            "npqSell": "53650000",
                            "sjcBuy": "66100000",
                            "sjcSell": "66950000",
                            "sjnBuy": "65650000",
                            "sjnSell": "66900000",
                            "timeUpdate": "1671260485",
                            "v9999Buy": "52100000",
                            "v9999Sell": "53450000",
                            "v999Buy": "52000000",
                            "v999Sell": "53350000",
                            "v99Buy": "51450000",
                            "v99Sell": "52800000",
                            "vang099Buy": "51925500",
                            "vang099Sell": "52915500",
                            "vang24kBuy": "52450000",
                            "vang24kSell": "53450000",
                            "vang999Buy": "52350000",
                            "vang999Sell": "53350000"
                        }
                    ]
                }
                ```

            -   Fail:

                -   Status code: 404

    -   **Get price of gold mi hồng**:

        -   page is crawled : https://webtygia.com/gia-vang-mi-hong.html

        -   GET baseURL/gold/mihong
        -   Request payload: None

        -   Responses:

            -   OK:

                -   Status Code: 200
                -   Payload:

                ```
                {
                    "status": "ok",
                    "data": [
                        {
                           "name": "Mi Hồng",
                            "location": "Hồ Chí Minh",
                            "sjcBuy": "66300000",
                            "sjcSell": "67000000",
                            "timeUpdate": "1671259640",
                            "vang610Buy": "31800000",
                            "vang610Sell": "33500000",
                            "vang680Buy": "32800000",
                            "vang680Sell": "34500000",
                            "vang750Buy": "37600000",
                            "vang750Sell": "39600000",
                            "vang950Buy": "49900000",
                            "vang950Sell": "0",
                            "vang980Buy": "51800000",
                            "vang980Sell": "52800000",
                            "vang985Buy": "52100000",
                            "vang985Sell": "53100000",
                            "vang999Buy": "53100000",
                            "vang999Sell": " 53900000"
                        }
                    ]
                }
                ```

            -   Fail:

                -   Status code: 404
