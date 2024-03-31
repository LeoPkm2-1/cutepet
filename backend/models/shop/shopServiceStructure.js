class ShopService {
  constructor(
    service_name,
    shop_id,
    service_description,
    service_img_url,
    service_type,
    price_quotation,
    duration
  ) {
    this.serviceName = service_name;
    this.shopId = shop_id;
    this.serviceDescription = service_description;
    this.serviceImgUrl = service_img_url;
    this.serviceType = service_type;
    this.priceQuotation = price_quotation;
    this.duration = duration;
  }
}

module.exports = { ShopService };

/*
    ten_dich_vu,
    ma_cua_hang,
    mo_ta_dich_vu,
    anh_dich_vu,
    the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu,
*/
