class ShopService {
  constructor(
    service_name,
    shop_id,
    short_description,
    service_description,
    service_img_url,
    service_type,
    price_quotation,
    duration,
    num_of_star = 0
  ) {
    this.serviceName = service_name;
    this.shopId = shop_id;
    this.shortDescription = short_description;
    this.serviceDescription = service_description;
    this.serviceImgUrl = service_img_url;
    this.serviceType = service_type;
    this.priceQuotation = price_quotation;
    this.duration = duration;
    this.numOfStar = num_of_star;
  }
}

class VoteForService {
  constructor(
    service_id,
    user_Voting_id,
    num_of_star = 1,
    content = "",
    create_at = new Date(),
    modified_at = null
  ) {
    this.serviceId = service_id;
    this.userVotingId = user_Voting_id;
    this.numOfStar = num_of_star;
    this.content = content;
    this.createAt = create_at;
    this.modifiedAt = modified_at;
  }
}

module.exports = { ShopService, VoteForService };

/*
    ten_dich_vu,
    ma_cua_hang,
    mo_ta_ngan,
    mo_ta_dich_vu,
    anh_dich_vu,
    the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu,
*/
